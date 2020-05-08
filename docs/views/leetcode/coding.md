---
title: 'leetcode刷题笔记'
date: 2020-05-08
tags:
 - coding
categories: 
 - leetcode
---

>记录leetcode刷题的思路及学习笔记

<!-- more -->

## [221 最大正方形](https://leetcode-cn.com/problems/maximal-square/)

### 题目描述

见[链接](https://leetcode-cn.com/problems/maximal-square/)

### 我的解法

1. 简单遍历解法

   伪代码：

   ```latex
   r, c 
   for r
   	for c
   		if item == 1
   		判断正方形
   		记录最大值
   	end
   end
   返回最大值
   ```

   ac代码

   ```javascript
   /**
    * @param {character[][]} matrix
    * @return {number}
    */
   
   var maximalSquare = function(matrix) {
       if (matrix.length == 0) {
           return 0;
       }
       var r = matrix.length;
       var c = matrix[0].length;
       // 从当前索引招到最大正方形
       function findSquare(i, j) {
           var radia = 1; // 记录当前判断的边长
           while( (i+radia <r) && (j+radia<c)) {
               // 数组未越界
               // 判断右侧列
               var index = i;
               for (; index <= i+radia; index++) {
                   if( matrix[index][j+radia] != 1 ) {
                       // console.log(i, j, radia);
                       return radia*radia;
                   }
               }
               for(index=j; index<=j+radia;index++) {
                   if (matrix[i+radia][index] != 1) {
                       // console.log(i, j, radia);
                       return radia*radia;
                   }
               }
               radia++;
           }
           // console.log(i, j, radia);
           return radia*radia;
       }
       // 循环
       var res = 0;
       for (var i=0; i<r;i++) {
           for (var j=0; j<c;j++) {
               if (matrix[i][j] == 1) {
                   res = Math.max(res, findSquare(i, j));
               }
           }
       }
       return res;
   };
   ```

   代码执行结果：时间约在50% 内存100%

   执行效率分析：

   时间复杂度：约为o(n^4) --> 采用两轮循环，算法很复杂

   - 使用加法代替判断，计算复杂度没有改变，时间略微缩短（但平均时间不稳定）

2. 最优解法

   动态规划，当前坐标的最大正方形为左，左上，上三者的最小值+1

   查看解题[链接](https://leetcode-cn.com/problems/maximal-square/solution/li-jie-san-zhe-qu-zui-xiao-1-by-lzhlyle/)