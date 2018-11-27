---
title: Machine Learning Notes
date_created: 2016-02-16 00:00:00
author: Jeffrey Xiao
path: /blog/machine-learning-notes
tags:
  - Programming
  - Machine Learning
---

## Introduction

My ongoing notes for machine learning.

## Definitions

$$
\begin{aligned}
  \theta      &= \text{weights/parameters}            \\
  x           &= \text{features}                      \\
  J(\theta)   &= \text{cost function}                 \\
  h_\theta(x) &= \text{predicted value of features}   \\
  n           &= \text{size of weights}               \\
  m           &= \text{size of training set}          \\
  \alpha      &= \text{learning rate}                 \\
  \lambda     &= \text{constant for regularization}   \\
\end{aligned}
$$

## Linear Regression

$$
\begin{aligned}
  h_\theta(x)     &= \theta^Tx                                                                         \\\\
  J(\theta)       &= \frac{1}{2m}\sum\limits_{i=1}^m(h_\theta(x^{(i)}) - y^{(i)})^2                    \\\\
  \theta          &= \theta - \alpha\frac{1}{m}\sum\limits_{i=1}^m(h_\theta(x^{(i)}) - y^{(i)})x^{(i)} \\\\
  \theta          &= (X^TX)^{-1}X^Ty                                                                   \\\\
  J(\theta)_{reg} &= \frac{\lambda}{2m}\sum\limits_{j=1}^n\theta_j^2                                   \\\\
  \theta_{reg}    &= \frac{\lambda}{m}\theta                                                           \\\\
\end{aligned}
$$

## Logistic Regression

$$
\begin{aligned}
  h_\theta(x)     &= g(\theta^Tx) \text{ where } g(z) = \frac{1}{1 + e^{-z}}                                          \\\\
  J(\theta)       &= -\frac{1}{2m}\sum\limits_{i=1}^m(y^{(i)}log(h_\theta(x^{(i)})+(1-y^{(i)})log(1-h_\theta(x^{(i)}))\\\\
  \theta          &= \theta - \alpha\frac{1}{m}\sum\limits_{i=1}^m(h_\theta(x^{(i)}) - y^{(i)})x^{(i)}                \\\\
  J(\theta)_{reg} &= \frac{\lambda}{2m}\sum\limits_{j=1}^n\theta_j^2                                                  \\\\
  \theta_{reg}    &= \frac{\lambda}{m}\theta                                                                          \\\\
\end{aligned}
$$

## Neural Networks

## Support Vector Machines

## Kernels

## K-means Clustering

## Recommender Systems
