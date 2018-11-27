---
title: ECOO Round 1 Analysis
date_created: 2016-04-08 00:00:00
author: Jeffrey Xiao
path: /blog/ecoo-round-1-analysis
tags:
  - Programming
  - Competition
---

## Introduction

The first round of the provincial ECOO competition happened on Wednesday. You can access the
problems [here](files/ECOO-Round-1-Problems.pdf).

## Problem 1: Pass or Fail

This problem simply asks whether the weighted average of a student's test, assignment, project, and
quiz scores are above or equal to 50%.

A student passes the course if the following inequality holds true:

$$
W_T \times T + W_A \times A + W_P \times P + W_Q \times Q >= 50\%
$$

Time complexity: $O(N)$

## Problem 2: Spindie

### Solution 1

First notice that the number of integers on the spinner is very large ($1 <= N <= 5000$), but the
actual range of values each integer can take on is very small ($1 <= S_i <= 100$). Additionally, the
number of occurrences of each value does not matter. Thus we can have three loops that iterate
through all possible values and check the following four cases to see if a value is possible:

$$
\begin{aligned}
  &1.\ (A \times B) \times C 	\\
  &2.\ (A + B) \times C		    \\
  &3.\ (A \times B) + C		    \\
  &4.\ (A + B) + C			      \\
\end{aligned}
$$

Time complexity: $O(S^3)$

### Solution 2

Generate pairs of spinner values and store it in a map. Then work backwards from the target values
and check if it exists in the map.

Time complexity: $O(N^2 + TN)$

## Problem 3: Railway Sort

Make the observation that any value $X$ cannot be moved until $X + 1$ is before $X + 2$ in order to
have the minimal amount of movements. Then iterate starting from $N$ and only move value $X$ if it
occurs after $X + 1$.

Time complexity: $O(N^2)$, or $O(N)$ if you are smart about the implementation.

## Problem 4: Kayenne

Store the houses in a set to check if your current position is already occupied by a house. Then you
can just brute force and check all possible values that is in the radius. My team checked all $X$
and $Y$ where $C_x - 50 <= X <= C_x + 50$ and $C_y - 50 <= Y <= C_y + 50$. Then we checked if point
$(X, Y)$ was in the radius or on a house. Finally, we inserted all the houses in a priority queue
and determined if it was democratic or republican.
