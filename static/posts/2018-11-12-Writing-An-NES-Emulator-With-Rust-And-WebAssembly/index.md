---
title: Writing an NES Emulator with Rust and WebAssembly
date_created: 2018-11-12 00:00:00
author: Jeffrey Xiao
path: /blog/writing-an-nes-emulator-with-rust-and-webassembly
tags:
 - emulation
 - programming
 - rust
 - webassembly
---

## Introduction

Over the past month, I tried my hand at emulating the Nintendo Entertainment System and I wanted to
share my personal experience creating `neso-rs` and some pieces of advice to those wanting to make
their own. My final goal was to compile the project to WebAssembly so that the emulator can be run
on the web, so I will also share my thoughts on the WebAssembly ecosystem. You can find the web
frontend to `neso-rs` [here](https://jeffreyxiao.me/neso-web).

## CPU

Implementing the CPU is definitely the first task to complete when building an NES emulator from
scratch. The CPU is a MOS 6502 CPU with the BCD mode stripped off. For me, the CPU was the easiest,
but least interesting component of the NES. The MOS 6502 is well documented and a transistor
level emulator even exists, so it was fairly easy to implement the addressing modes, and
instructions. There are some quirks to the CPU (page crossing behavior, `JMP` bug), but these are
also all well documented. I did not make a subcycle accurate CPU, but there are a variety of ways to
do so: generating a finite state machine, using co-routines, or using a queue of tasks that each
take one cycle.

## Cartridge and NROM

To actually get started on testing, it is necessary to implement Mapper 0 (NROM) and logic for
parsing cartridges. Overall, mapper 0 and handling iNES cartridges were straight forward, and I
did not have much trouble in this step. After I had the same logs as Nintendulator for `nestest`, I
moved on to the next component.

## PPU

The PPU is a big step in difficulty from the CPU for a beginner in emulator development like me. It
took several days to understand how the different components of the PPU worked together. I found
this series of articles to be _extremely_ useful to get started on the PPU. TODO: Add link to
articles. Here are the general steps I took to get a decently working PPU:

1. Implement memory mapping and PPU registers.
2. Render pattern tables at the end of each frame.
3. Render nametables at the end of each frame.
4. Implement the background rendering pipeline.
5. Implement the sprite evaluation and fetching pipeline.

## Recipe for Success

### 1. Have Patience

Making an NES emulator was significantly different from most of my previous projects. It is safe to
say that I have never been as frustrated with a side project as I was when tackling the PPU. For my
previous side projects, I felt that I made steady progress every time I worked on them, but with the
PPU, there were countless times when I felt that I've hit a wall and could not progress. You could
have a mostly working implementation with a couple small bugs that make the game unrecognizable.

![Donkey Kong Rendering Attempt](images/donkey-kong-rendering-attempt.png "My first attempt at
rendering the title screen of Donkey Kong in grayscale.")

Many of these bugs are subtle and could require hours of debugging and digging into. The majority of
my time spent on the PPU was tracing the rendering pipeline to squash bugs. In particular, I spent
an embarrassing amount of time fixing an issue with my PPU when I started to test with Super Mario
Bros.

![Super Mario Bros Rendering Bug](images/super-mario-bros-rendering-bug.png "Super Mario Bros
Rendering Bug")

As you can see, the very last line of the status bar is shifted to the left. I first compared the
CPU logs between my emulator and [Nintendulator](https://www.qmtpro.com/~nes/nintendulator/) to see
if perhaps I was doing incorrect writes to any PPU register, in particular the `PPUSCROLL` and
`PPUADDR` registers. Nothing seemed suspicious enough to warrant further investigation. I noticed
that when I moved Mario, this line would shift as well, which led me to believe that my scrolling
logic was wrong. When I logged the coarse X scroll values at the start of each scanline, I noticed
that the first 30 scanlines had a different value than the later scanlines. Note that scanline 30
was precisely the last line of the status bar. I was making a write to `PPUSCROLL` in the middle of
scanline 30, which caused the rest of the scanline to shift leftwards. Interesting... If I were to
make that write in the middle of scanline 31, the status bar and the background would render
correctly. At this point, I was convinced that I had a timing issue and by comparing the
Nintendulor's logs, there was approximately 400 PPU clocks between when I wrote to `PPUSCROLL` and
when Nintendulator did.

After a bit more debugging, I finally found the root cause of the issue. To fully understand what
was happening, it is important to grasp _how_ Super Mario Bros was able to scroll the background,
but keep the status bar in the same place. This effect is done through changing the scroll
mid-frame. The status bar scanlines always started with a X scroll value of 0, while the background
scanlines were affected by where Mario is. This can simply be done by writing to `PPUSCROLL` after
the status bar scanlines were rendered. The way the game knew when the status bar scanlines were
rendered was through the [sprite-0 hit](https://wiki.nesdev.com/w/index.php?title=Sprite-0_hit). The
bottom of the coin was actually a sprite, and then when the last status bar scanline was rendered,
it would cause a sprite-0 hit, signalling to the CPU that it was time to render the background. Now
the reason why the last scanline of the status bar was shifted was because I was drawing the sprites
one pixel too high! Duh? Obviously, right? By drawing the coin sprite one pixel too high, the
sprite-0 hit was being triggered one scanline earlier, which caused the scroll value to change one
scanline too early!

These were the steps I had to take to resolve just _one_ bug from the countless that I encountered.
Making an emulator definitely requires an exorbitant amount of patience to slowly pick apart the
system and debug these kind of issues. But, I believe that going through this ordeal is how you
best learn about a low level system like the NES.

### 2. Write Automated Tests

It's clear that debugging small bugs takes a large portion of your development time and probably
leads to a lot of hair pulling and frustration. What can we do to mitigate this? Write automated
tests! The kind folks at the [NESDEV forums](https://forums.nesdev.com/) have written various test
ROMs for all parts of the NES. A comprehensive list can be found
[here](https://wiki.nesdev.com/w/index.php/Emulator_tests).

As soon as I had a reasonably functioning CPU, I started working on integrating these test ROMs to
prevent regressions from happening and to squash bugs early in the development process. The majority
of my tests fall under one of two categories: text tests, and graphical tests.

Most of blargg's test ROMs output the status of the test to `$6000` and the output of the test to
`$6004`, so it suffices to see if you passed the test if `Passed` exists as a substring at `$6004`
when the test finishes.

```rust
// Run until test status is running by polling $6000.
let mut addr = 0x6000;
let mut byte = nes.cpu.read_byte(addr);
while byte != 0x80 {
    nes.step_frame();
    byte = nes.cpu.read_byte(addr);
}

// Run until test status is finished by polling $6000.
byte = nes.cpu.read_byte(addr);
while byte == 0x80 {
    nes.step_frame();
    byte = nes.cpu.read_byte(addr);
}

// Read output at $6004.
let mut output = Vec::new();
addr = 0x6004;
byte = nes.cpu.read_byte(addr);
while byte != '\0' as u8 {
    output.push(byte);
    addr += 1;
    byte = nes.cpu.read_byte(addr);
}

assert!(String::from_utf8_lossy(&output).contains("Passed"));
```

As soon as you have a functional PPU, you can also start writing graphical tests. As the name
implies, graphical tests output the result of the test to the screen, making it a bit more
complicated than text tests. The way I approached these tests was to figure out the number of frames
to run the test before it finished, and then to compute the hash of the test after it had finished.
Then, I could integrate the number of frames and the hash into a macro that checked if it had the
same hash.

```rust
// Compare hash of screen after a specified frames for graphical output tests.
macro_rules! graphical_tests {
    ($($test_name:ident: ($path:expr, $frames:expr, $hash:expr)$(,)*)*) => {
        $(
            #[test]
            fn $test_name() {
                use std::collections::hash_map::DefaultHasher;
                use std::fs;
                use std::hash::Hasher;
                use Nes;

                let buffer = fs::read($path)
                  .expect("Expected test rom to exist.");
                let mut nes = Nes::new();
                nes.load_rom(&buffer);

                for _ in 0..$frames {
                    nes.step_frame();
                }

                let mut hasher = DefaultHasher::new();

                for val in nes.ppu.buffer.iter() {
                    hasher.write_u8(*val);
                }

                assert_eq!(hasher.finish(), $hash);
            }
        )*
    }
}
```

More sophisticated automated tests can be written with actual games. If you poll for controller
input at the beginning of each frame, it is feasible to play through an actual game and record when
certain buttons are pressed and released. By feeding this record of button presses and releases back
into the emulator, you can deterministically replay games and see if the output at each frame has
changed or not.

### 3. Implement Debugging Infrastructure

Another way to help track down nasty bugs is to develop debugging infrastructure for your emulator.
For the CPU, a disassembler that prints the program counter, the opcode, the addressing mode, the
current cycle the CPU is on, the CPU registers, the addressing mode, and the relevant operand can
assist in verifying if your CPU implementation is correct. In fact, one of the best early tests for
your CPU is to do a line-by-line comparison with the execution log of Nintendulator. A caveat for
the disassembler is that if you are printing out the relevant operand of the opcode, you must be
careful not to affect the state of any component. Reads to some memory locations can actually change
the state of a component. For example, reading `PPUSTATUS` will clear the flag that indicates if a
v blank has started. Every memory read function should have a complementary memory peek function to
avoid any mutations in state.

For the PPU, implementing debug views for the palette, nametables, and pattern tables was extremely
useful for me. I was able to fix issues related to mirroring and scrolling by examining the contents
of the nametables, and figure out if I was doing CHR ROM banking correctly by checking if the
expected sprite and background data showed up in the pattern tables.

![Super Mario Bros Debug Views](images/super-mario-bros-debug-views.png "Super Mario Bros
Debug Views")

TODO: better image.

Implementing these debug views also require a solid understand of how the pattern tables,
nametables, attribute tables, and palettes work together, which makes it great warm up for actually
implementing the PPU rendering pipeline.
