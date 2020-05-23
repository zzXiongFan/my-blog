---
title: 'git commit规范及自动化工具'
date: 2020-04-23
tags:
 - git
categories: 
 - 开发规范
---

> 简单介绍了[Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)，并说明了自动commit工具Commitizen的使用方法

## 规范的意义

git commit 是大家在使用git的时候一定会使用的功能，对应本次提交的记录，**一个好的程序员需要重视每一条记录**，因而，本文简单介绍目前最常用的[Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)，并简单介绍自动化生成commit 的工具。

## git commit 格式

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

```
<type> (<scope>): <subject>     // header
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的（也是最常用的），Body 和 Footer 可以省略。

### Header

#### type

type说明commit的类别，只允许使用以下标示。

- feat: 新特性(feature)
- fix: 修改bug
- docs: 项目文档变动
- style: 项目**代码风格**变化，不是css的变化
- refactor: 代码重构（项目功能不变，常用的情景是对功能的实现进行重写）
- test: 增加测试内容
- chore: 描述构建过程或者辅助工具的变动

#### scope

scope说明commit的影响范围，比如：route, component, utils, build...

#### subject

subject是本次commit的内容简要描述，一定要简明扼要，默认不超过50个字符，建议遵循以下约定。

- 以动词开头，使用第一人称现在时
- 第一个字母小写
- 结尾不加句号

### Body

Body 用于对当前commit的详细描述，无过多规范

### Footer

常用于关闭Issue

```
Closes #222
```

## 自动工具Commitizen

emmm严格来讲，我不是很推崇使用自动化工具，**会使开发者更关注工具而非标准本身**，我对于自动化工具的态度是：在开发者对规范有了一定程度的了解的基础上，使用工具提升开发效率（~~*虽然优化git commit的提交并不能带来多少效率的提升*~~）

还是介绍一下目前主流的被认为比较优雅的自动化工具Commitizen。

```bash
# 安装，建议使用全局安装
# 主要作用是安装git-cz以及commitizen
npm install -g commitizen
# 在git项目里，运行下面的命令，使其支持Angular 的 Commit message 格式
# 由于commitizen是基于node的，所以运行此命令必须保证当前目录下存在package.json文件，否则会报错
# 安装cz-conventional-changelog作为commitizen的适配器
commitizen init cz-conventional-changelog --save --save-exact
# 使用git cz 代替git commit，按提示操作即可
git cz
```

以上方法有一个挺大的**弊端**，查看项目的package.json，在运行commitizen会有以下内容

```json
"devDependencies": {
    "cz-conventional-changelog": "^3.1.0"
  },
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
```

分别对应运行需要的依赖及配置，直接写入package.json，这意味着会将上面两段内容上传至仓库（*~~这样大家都知道你在偷懒了，不符合开发者应该直接使用命令行的基本操作~~*）

那你可以这样做

```bash
# 全局安装commitizen及其适配器
npm install -g commitizen cz-conventional-changelog
# 设置默认配置环境(ubuntu下)
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
# 使用
git cz
```

这样可以在大家都不知道的情况下偷懒了，不偷懒是不可能的。

## 总结

开发者需要对开发过程中提到的任何一个标准敏感，git commit就是其中之一。

## 参考文章

- 阮一峰： [Commit message 和 Change log 编写指南](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- 掘金社区：[优雅的提交你的 Git Commit Message](https://juejin.im/post/5afc5242f265da0b7f44bee4)

