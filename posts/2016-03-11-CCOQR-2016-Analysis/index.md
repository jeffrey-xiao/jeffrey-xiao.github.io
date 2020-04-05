---
title: CCOQR 2016 Analysis
date_created: 2016-03-11 00:00:00
author: Jeffrey Xiao
path: /blog/ccoqr-2016-analysis
tags:
  - Programming
  - Competition
---

## Introduction

The CEMC servers were DDOS'd on the day of the CCC, so they had another contest to decide CCO
invitees. Here is my analysis on the problems:

## P1: Stupendous Bowties

You can only make a bowtie given five points $p_1, p_2, p_3, p_4, p_5$ if they meet the following
four conditions:

$$
p_{1x} = p_{2x} = p_{3x}
$$

$$
p_{4y} = p_{5y} = p_{3x}
$$

$$
p_{4x} < p_{3x} < p_{5x}
$$

$$
p_{1y} < p_{3y} < p_{2y}
$$

In other words, a naive solution would find the points above, below, to the right, and to the left
of point $p$. The number of valid bowties would be
$2*\text{above}*\text{below}*\text{right}*\text{left}$.

To speed the algorithm up, we can put each point $p$ in buckets representing unique x coordinates
and y coordinates. By sorting each bucket, we can then find the number of valid bowties with point
$p$ at the center.

Time complexity: $O(N\ log\ N)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCOQR_2016_P1.java)

## P2: Through A Maze Darkly

Let us denote a position as the next corridor you will enter, walking on the right side of the wall.
Continuously walking along the right side of a wall will yield in a cycle and cause you to return to
your starting position. However, it is possible that you may enter your starting room more than
once.

Because the number of cycles in the graph is proportional to $M$, the number of edges, we can
traverse all possible cycles in the graph and determine the longest cycles for each room.

In order to implement this, you can use a adjacency map where each edge maps to the next clockwise
edge. While traversing each cycle, maintain two arrays that track the first time a room has been
entered and the last time a room has been entered. Using these arrays, you can determine all the
room cycle lengths. The maximum of them will be your answer.

Time complexity: $O(NM)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCOQR_2016_P2.java)

## P3: Data Structure

Visualize the triangle as a right-angled triangle. For example, the input would look like this:

```
0
00
100
0001
00000
010000
```

We can then do a line sweep and calculate the area of the trapezoids to figure out the minimum data
needed. The height of the current column will be
$\text{max}(\text{curr height}, \text{prev height - dist})$. The area between the current column and
previous column will be the sum of the triangle and square.

Time complexity: $O(M\ log \ M)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCOQR_2016_P3.java)
