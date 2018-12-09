---
title: Convex Hull Trick
date_created: 2015-11-30 00:00:00
author: Jeffrey Xiao
path: /blog/convex-hull-trick
tags:
  - Dynamic Programming
  - Programming
---

## Introduction

The **Convex Hull Trick** is a technique used to efficiently determine which member of a set of
linear functions attains an extremal value for a given value of the independent variable. It can be
used to optimize dynamic programming problems with certain conditions.

The Convex Hull Trick only works for the following recurrence:

$$
dp[i] = \min_{j < i}\left\{ dp[j] + b[j]*a[i] \right\}
$$

$$
(b[j] \geq b[j+1]) \text{ or } (a[i] \leq a[i+1])
$$

The trick reduces the time complexity from $O(N^2)$ to $O(N)$.

## Example Problem: IOI 2002 Batch Scheduling

There is a sequence of $N$ jobs to be processed on one machine. The jobs are numbered from $1$ to
$N$, so that the sequence is $1, 2, ..., N$. The sequence of jobs must be partitioned into one or
more batches, where each batch consists of consecutive jobs in the sequence. The processing starts
at time $0$. The batches are handled one by one starting from the first batch as follows. If a batch
$b$ contains jobs with smaller numbers than batch $c$, then batch $b$ is handled before batch $c$.
The jobs in a batch are processed successively on the machine. Immediately after all the jobs in a
batch are processed, the machine outputs the results of all the jobs in that batch. The output time
of a job $j$ is the time when the batch containing $j$ finishes.

A setup time $S$ is needed to set up the machine for each batch. For each job $i$, we know its cost
factor $F_i$ and the time $T_i$ required to process it. If a batch contains the jobs
$x, x+1, ..., x+k$, and starts at time $t$, then the output time of every job in that batch is
$t + S + (T_x + T_{x+1} + ... + T_{x+k})$. Note that the machine outputs the results of all jobs in
a batch at the same time. If the output time of job $i$ is $O_i$, its cost is $O_i * F_i$.

The total cost of a partition is the sum of the costs of the all jobs. Find the minimum possible
total cost.

## Analysis

Let us define some variables first:

$$
\begin{aligned}
  dp[i]   &:= \text{minimum cost of partitioning job } i \text{ to } N \\
  sumT[i] &:= \text{total time for processing job } i \text{ to } N    \\
  sumF[i] &:= \text{total cost factor for job } i \text{ to } N        \\
\end{aligned}
$$

With these variables we can define our recurrence:

$$
dp[i] = \min_{j > i}\{dp[j] + (S + sumT[i] - sumT[j]) * sumF[i]\}
$$

Assume that job $j$ is better than job $k$ when determining the best option for job $i$ where
$j >
k$. Then:

$$
\begin{aligned}
  dp[j] + (S + sumT[i] - sumT[j]) * sumF[i] &< dp[k] + (S + sumT[i] - sumT[k]) * sumF[i] \\
  dp[j] - dp[k]                             &< (sumT[j] - sumT[k])*sumF[i]               \\
  {dp[j] - dp[k]} \over {sumT[j] - sumT[k]} &\geq sumF[i]                                   \\
\end{aligned}
$$

Therefore, if we let $f(j, k) = {dp[j] - dp[k] \over sumT[j] - sumT[k]}$, we will have two cases
where we are able to discard an job option:

$$
\text{Case 1: if } f(a, b) > f(b, c) \text{ where } i < c < b < a \text{, then toss out } b
$$

$$
\begin{cases}
  f(a, b) \geq sumF[i] & \text{then } a \text{ is better than } b \\
  f(a, b) < sumF[i] & \text{then } c \text{ is better than } b
\end{cases}
$$

$$
\text{Case 2: if } f(a, b) < sumF[i] \text{ where } i < b < a \text{ then toss out } a
$$

Using the two cases to discard job options, we can maintain a monotonic queue that contains the best
$dp[j]$ to extend our current solution. If we are inserting $dp[i]$ to the back of our monotonic
queue, we can use Case 1 to remove elements from the back of the queue, and Case 2 to remove
elements from the front of the queue. Finally, our answer will be the value at the front of the
queue.

## Code

```cpp
#include <bits/stdc++.h>

using namespace std;

#define SIZE 10005

int N, S;
int T[SIZE], F[SIZE];
int dp[SIZE], sumT[SIZE], sumF[SIZE];

deque<int> q;

inline double f(int k, int i) {
  return ((double)dp[k] - (double)dp[i]) / ((double)sumT[k] - (double)sumT[i]);
}

int main() {
  scanf("%d%d", &N, &S);
  for (int x = 0; x < N; x++)
    scanf("%d%d", &T[x], &F[x]);

  for (int i = N - 1; i >= 0; i--) {
    sumT[i] = sumT[i + 1] + T[i];
    sumF[i] = sumF[i + 1] + F[i];
  }

  q.push_back(N);
  for (int i = N - 1; i >= 0; i--) {
    // Handle Case 2.
    while (q.size() >= 2 && f(q[0], q[1]) < (double)sumF[i]) {
      q.pop_front();
    }

    int j = q.front();
    dp[i] = (dp[j] + (S + sumT[i] - sumT[j]) * sumF[i]);

    // Handle Case 1;
    while (q.size() >= 2 &&
           f(q[q.size() - 2], q[q.size() - 1]) > f(q[q.size() - 1], i)) {
      q.pop_back();
    }

    q.push_back(i);
  }

  printf("%d\n", dp[0]);
  return 0;
}
```

_This post is a part of a series of three posts on dynamic programming optimizations:_

1. [Convex Hull Trick](/blog/convex-hull-trick)
2. [Knuth's Optimization](/blog/knuths-optimization)
3. [Divide and Conquer Optimization](/blog/divide-and-conquer-optimization)
