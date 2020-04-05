---
title: Divide and Conquer Optimization
date_created: 2015-12-14 00:00:00
author: Jeffrey Xiao
path: /blog/divide-and-conquer-optimization
tags:
  - Dynamic Programming
  - Programming
---

## Introduction

This optimization for dynamic programming solutions uses the concept of divide and conquer. It is
only applicable for the following recurrence:

$$
\text{dp}[i][j] = \min_{k < j}\{dp[i-1][k] + \text{C}[k][j]\}
$$

$$
\text{min}[i][j] \leq \text{min}[i][j+1]
$$

$$
\text{min}[i][j] \text{ is the smallest k that gives the optimal answer}
$$

This optimization reduces the time complexity from $O(KN^2)$ to $O(KN log \ N)$

## Example Problem: Codeforces Round 190: Div. 1E

There are $N$ people at an amusement park who are in a queue for a ride. Each pair of people has a
measured level of unfamiliarity. The people will be divided into $K$ non-empty contiguous groups.
Each division has a total unfamiliarity value which is the sum of the levels of unfamiliarity
between any pair of people for each group.

Determine the minimal possible total unfamiliarity value.

## Sample Input

```
8 3
0 1 1 1 1 1 1 1
1 0 1 1 1 1 1 1
1 1 0 1 1 1 1 1
1 1 1 0 1 1 1 1
1 1 1 1 0 1 1 1
1 1 1 1 1 0 1 1
1 1 1 1 1 1 0 1
1 1 1 1 1 1 1 0
```

## Sample Output

```
7
```

## Sample Explanation

One optimal division is $\{1, 2, 3\} | \{4, 5, 6\} | \{7, 8\}$ which sum to $7$

## Analysis

First let us notice the $O(KN^2)$ solution:

```java
for (int i = 0; i <= n; i++)
  for (int j = 0; j <= k; j++)
    dp[i][j] = 1 << 30;

dp[0][0] = 0;

for (int i = 1; i <= k; i++)
  for (int j = 1; j <= n; j++)
    for (int k = 1; k <= j; k++)
      dp[j][i] = Math.min(dp[j][i], dp[k-1][i-1] + cost(k, j));
```

For each iteration of $j$, we are looping from $1$ to $j$, but if we use the observation that
$\text{minK}[j][i] \leq \text{minK}[j+1][i]$, we can reduce that left and right bounds for each
iteration.

Let us define function $\text{compute}(g, i, j, l, r)$ that computes $\text{dp}[i...j][g]$ knowing
that $l \leq k \leq r$

We first call the function with the following parameters: $\text{compute}(g, 1, n, 1, n)$. This step
will take $O(N)$ time. For each call, if we compute the value of $\text{dp}[g][{i+j\over 2}]$, we
can essentially divide the function into two:

$$
\text{compute}\left(g, i, {i+j\over 2} - 1, l, k\right)
$$

$$
\text{compute}\left(g, {i+j\over 2} + 1, j, k, r\right)
$$

At each depth of recursion, there are only $2N$ computations to be done. The total depth of
recursion will be $log\ N$. Thus, for each value of $g$, the running time is $O(Nlog\ N)$. We then
call the function for all values of $g$, so the final running time is $O(KNlog\ N)$

## Code

```java
import java.util.*;
import java.io.*;

public class main {

  static BufferedReader br;
  static PrintWriter out;
  static StringTokenizer st;

  static int n, k;
  static int[][] a;
  static int[][] dp;

  public static void main(String[] args) throws IOException {
    br = new BufferedReader(new InputStreamReader(System.in));
    out = new PrintWriter(new OutputStreamWriter(System.out));

    n = readInt();
    k = readInt();

    a = new int[n + 1][n + 1];
    dp = new int[n + 1][k + 1];

    for (int i = 1; i <= n; i++)
      for (int j = 1; j <= n; j++)
        a[i][j] = readInt() + a[i - 1][j] + a[i][j - 1] - a[i - 1][j - 1];

    for (int i = 0; i <= n; i++)
      for (int j = 0; j <= k; j++)
        dp[i][j] = 1 << 30;

    dp[0][0] = 0;

    for (int i = 1; i <= k; i++)
      compute(i, 1, n, 1, n);

    out.println(dp[n][k] / 2);
    out.close();
  }

  static void compute(int g, int i, int j, int l, int r) {
    if (i > j)
      return;
    int mid = (i + j) / 2;
    int bestIndex = l;
    for (int k = l; k <= Math.min(r, mid); k++) {
      int val = dp[k - 1][g - 1] +
                (a[mid][mid] - a[mid][k - 1] - a[k - 1][mid] + a[k - 1][k - 1]);
      if (val < dp[mid][g]) {
        dp[mid][g] = val;
        bestIndex = k;
      }
    }
    compute(g, i, mid - 1, l, bestIndex);
    compute(g, mid + 1, j, bestIndex, r);
  }

  static String next() throws IOException {
    while (st == null || !st.hasMoreTokens())
      st = new StringTokenizer(br.readLine().trim());
    return st.nextToken();
  }

  static int readInt() throws IOException {
    return Integer.parseInt(next());
  }
}
```

_This post is a part of a series of three posts on dynamic programming optimizations:_

1. [Convex Hull Trick](/blog/convex-hull-trick)
2. [Knuth's Optimization](/blog/knuths-optimization)
3. [Divide and Conquer Optimization](/blog/divide-and-conquer-optimization)
