---
title: CCC 2016 Analysis
date_created: 2016-02-17 00:00:00
author: Jeffrey Xiao
path: /blog/ccc-2016-analysis
tags:
  - Programming
  - Competition
---

## Introduction

I recently wrote the CCC Senior Division. I just wanted to share my analysis for each problem.

## S1: Ragaman

First let us consider the number of matched characters in string one and string two. If there are
characters in string two that cannot be matched with characters in string one, it cannot be an
anagram. We don't have to consider the number of wildcards because we can just match it with the
unmatched characters in string one. Therefore, just keep a count of the characters in string one
subtracted by the characters in string two. If there are more characters of one individual letter in
string two than string one, it cannot be an anagram.

Time complexity: $O(N)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCC_2016_S1.java)

## S2: Tandem Bicycle

For both problems, sort the speeds from Dmojistan and Pegland in increasing order. If you want the
minimum total speed, always pair the fastest from Dmojistan with the fastest from Pegland, the
second fastest from Dmojistan with the second fastest from Pegland, and so on. If you want the
maximum total speed, always pair the slowest from Dmojistan with the fastest from Pegland, the
second slowest from Dmojistan with the second fastest from Pegland, and so on. It can be
mathematically proven that this will always yield the maximum/minimum total speed.

Time complexity: $O(N\ log\ N)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCC_2016_S2.java)

## S3: Phonomenal Reviews

Let us observe that any subset of vertices induces a subtree on the original tree and that we have
to visit every vertex in the induced subtree to visit all the Pho restaurants. Next, let us consider
an easier problem where we have to return to our starting position. The total distance travelled
will be the number of edges in the subtree multiplied by two. Finally because we don't have to
return to our original position, we want to subtract the longest distance in the tree. Thus our
final answer will be the number of edges in the subtree multiplied by two subtracted by the longest
path distance in the subtree.

Time complexity: $O(N)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCC_2016_S3.java)

## S4: Combining Riceballs

$$
\text{Let dp}[l][r] =
\begin{cases}
  \text{true if } [l, r] \text{ can be combined}\\
  \text{false otherwise}
\end{cases}
$$

If we loop through all possible values of $[l, r]$ where $1 <= l <= r <= N$ and take the max of the
rice ball sums where $\text{dp}[l][r] = \text{true}$, we can obtain our answer.

In order to compute $\text{dp}[l][r]$, we have to consider a couple of cases:

$$
\text{If } r = l, \text{ then dp}[l][r] = \text{true}
$$

$$
\text{If } r - l <= 2, \text{ then dp}[l][r] =
\begin{cases}
  \text{true if dp}[l][l] = \text{dp}[r][r]\\
  \text{false otherwise}
\end{cases}
$$

$$
\text{If } r - l > 2, \text{ then dp}[l][r] =
\begin{cases}
  \text{true if dp}[l][i] = \text{dp}[j][r] \text{ where } l <= i < j <= r\\
  \text{false otherwise}
\end{cases}
$$

For the last case, looping through $i$ and $j$ uses two for loops bringing the total time complexity
to $O(N^4)$, but you can reduce that to $O(N^3)$ using maps or the two pointer method by making the
observation that each prefix/suffix is monotonically increasing.

Time complexity: $O(N^3)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCC_2016_S4.java)

## S5: Circle of Life

Let us make a couple of observations first:

1. This set of rules of 1D cellular automaton is called
   [Rule 90](https://en.wikipedia.org/wiki/Rule_90).

It has a property of addictivity meaning that if two initial states are combined by computing the
exclusive or of each of their states, then their subsequence configurations will be combined in the
same way. For example, the second generation of `01010` can be computed by the XOR of the second
generation of `01000` and `00010`

2. A simulation of `000...0001000...000` yields the
   [Sierpinski's Triangle](https://en.wikipedia.org/wiki/Sierpinski_triangle)
3. The $2^i\text{th}$ row of the Sierpinski triangle has exactly two ones.

Using these three observations, we can compute the $2^i\text{th}$ row of any generation in $O(N)$
time. By decomposing $T$ into a set of powers of two, we can obtain a time complexity of
$O(N\ log\ T)$.

Time complexity: $O(N\ log\ T)$

[Link to Code](https://github.com/jeffrey-xiao/Competitive-Programming/blob/master/src/contest/ccc/CCC_2016_S5.java)
