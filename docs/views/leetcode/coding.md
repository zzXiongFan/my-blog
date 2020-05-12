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

## [56 合并区间](https://leetcode-cn.com/problems/merge-intervals/)

### 题目描述

[链接](https://leetcode-cn.com/problems/merge-intervals/)

### 我的解法

1. 简单循环

   ```latex
   var res;
   for i in input:
   	for j in res:
   		判断i和j的交区间
   ```

   这个算法有个问题，输入是乱序的，新的区间进来以后，和某一个合并，可能合并后的数组还能和其他数组进行合并，导致出现内部的循环遍历，算法复杂且效率不高。

2. 排序解法

   这是一个**排序题！**

   ```latex
   1. 根据左边界的大小进行升序排列，取决于排序算法
   2. 遍历新数组，只和res中的最新一个进行合并，可以保证合并不重复，复杂度为o(n)
   ```

   解法ac代码

   ```js
   /**
    * @param {number[][]} intervals
    * @return {number[][]}
    */
   var merge = function(intervals) {
       if (intervals.length == 0 || intervals.length == 1) {
           return intervals;
       }
       intervals.sort((a, b) => {
           return a[0] - b[0];
       });
       // console.log(intervals);
       // 采用原地算法，避免使用空间
       for (var i=1; i<intervals.length;) {
           // 判断当前与前一个区间的右边界
           if (intervals[i][0] > intervals[i-1][1]) {
               i++;
               continue;
           } else 
           // 区间需要合并
           if (intervals[i][1] < intervals[i-1][1]) {
               // 删除当前区间，索引不变动
               intervals.splice(i ,1);
               continue;
           } else {
               // 合并
               intervals[i-1][1] = intervals[i][1];
               intervals.splice(i ,1);
               continue;
           }
       }
       return intervals;
   };
   ```

   执行结果： 用时大概在95ms，超过50%左右，内存70%以上；

   耗时分析：排序耗时

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