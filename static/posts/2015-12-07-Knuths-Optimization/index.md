---
title: Knuth's Optimization
date_created: 2015-12-07 00:00:00
author: Jeffrey Xiao
path: /blog/knuths-optimization
tags:
  - Dynamic Programming
  - Programming
---

## Introduction

**Knuth's Optimization** in dynamic programming specifically applies for optimal tree problems. It
is only applicable for the following recurrence:

$$
\text{dp}[i][j] = \min_{i < k < j}\{\text{dp}[i][k] + \text{dp}[k][j] + \text{C}[i][j]\}
$$

$$
\text{min}[i][j-1] \leq \text{min}[i][j] \leq \text{min}[i+1][j]
$$

$$
\text{min}[i][j] \text{ is the smallest k that gives the optimal answer}
$$

This optimization reduces the time complexity from $O(N^3)$ to $O(N^2)$

## Analysis

Let us examine $S$, the number of iterations that occur when we loop from $\text{min}[i][j-1]$ to
$\text{min}[i+1][j]$ instead of from $i$ to $j$.

Let $l$ represent the length of the current segment.

$$
\begin{aligned}
  S &= \sum_{i = 1}^{n - l + 1} (\text{min}[i+1][i+l-1] - \text{min}[i][i+l-2] + 1) \\
    &= \text{min}[n-l+2][n] - \text{min}[1][l-1] + (n - l + 1)                      \\
\end{aligned}
$$

$\therefore$ the amortized time complexity is $O(1)$.

## Example Problem: ZOJ Breaking Strings

A certain string-processing language allows the programmer to break a string into two pieces. Since
this involves copying the old string, it costs $N$ units of time to break a string of $N$ characters
into two pieces. Suppose a programmer wants to break a string into many pieces. The order in which
the breaks are made can affect the total amount of time used. For example, suppose we wish to break
a $20$ character string after characters $3$, $8$, and $10$. If the breaks are made in left-to-right
order, then the first break cost $20$ units of time, the second break costs $17$ units of time, and
the third breaks costs $12$ units of time, a total of $49$ units of time. If the breaks are made in
right-to-left order, then the first break costs $20$ units of time, the second break costs $10$
units of time, and the third break costs $8$ units of time, a total of $38$ units of time.

Given the length of the string $N$, and $M$ places to break the string at, what is the minimum
amount of time to break the string?

## Code

```cpp
#include <bits/stdc++.h>

using namespace std;

#define SIZE 1005

long long dp[SIZE][SIZE];
int mid[SIZE][SIZE];
int pos[SIZE];
int n, m;

int main() {
  while (scanf("%d%d", &n, &m) != EOF) {
    for (int i = 1; i <= m; i++) {
      scanf("%d", &pos[i]);
    }
    pos[0] = 0;
    pos[m + 1] = n;

    // length of section of cuts to compute
    for (int i = 0; i <= m + 1; i++) {

      // section of cuts to compute: [j, j + i]
      for (int j = 0; j + i <= m + 1; j++) {
        if (i < 2) {
          dp[j][j + i] = 0ll;
          mid[j][j + i] = j;
          continue;
        }
        dp[j][j + i] = 1ll << 60;

        // optimal place to cut
        for (int k = mid[j][i + j - 1]; k <= mid[j + 1][i + j]; k++) {
          long long next = dp[j][k] + dp[k][j + i] + pos[j + i] - pos[j];
          if (next < dp[j][j + i]) {
            dp[j][j + i] = next;
            mid[j][j + i] = k;
          }
        }
      }
    }
    printf("%lld\n", dp[0][m + 1]);
  }
  return 0;
}
```

_This post is a part of a series of three posts on dynamic programming optimizations:_

1. [Convex Hull Trick](/blog/convex-hull-trick)
2. [Knuth's Optimization](/blog/knuths-optimization)
3. [Divide and Conquer Optimization](/blog/divide-and-conquer-optimization)
