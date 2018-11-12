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
share my very biased and personal experimence creating `neso-rs`. My ultimate goal was to compile
the project to WebAssembly so that the emulator can be run on the web, so I will also share my
thoughts on the WebAssembly ecosystem. You can find the web frontend to `neso-rs`
[here](https://jeffreyxiao.me/neso-web).

## Lessons Learned
