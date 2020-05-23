---
title: 'ubuntu 用户列表，创建及删除用户'
date: 2020-05-04
tags:
 - ubuntu
categories: 
 - 操作系统
---

> 本文介绍ubuntu用户操作相关的内容，主要包括查看用户列表，创建及删除用户
>
> 主要针对ubuntu中带有用户文件夹：/home文件夹下的用户进行管理

<!-- more -->

## 获取用户列表

要操作当前用户，必须获取当前用户的列表，网上提供了很多花里胡哨的办法，涉及用户组操作，但是在web开发者使用中，只会用到普通用户和超级用户，超级用户直接使用```sudo```或者切换到```sudo su```进行操作，普通用户列表如何获取？ 本文提供以下两个方法：

### 通过/home下文件夹进行识别

直接上bash

```bash
# 直接获取文件夹目录
ls /home
# 本地存在admin 和 devuser两个用户，执行命令以后，会有以下结果
> devuser lost+found admin
# 其中lost+found自己忽略掉就好了，其他就是我们需要的普通用户的用户名
```

这个方法原理简单，普通用户会创建自己的用户文件夹，直接获取/home文件夹树获得用户列表，缺点是有个lost+found比较麻烦，自己忽略掉就好了。

### 读取/etc/passwd文件

同样直接上代码

```bash
# 这是网上能查到的通用的命令
cat /etc/passwd
# 但是输出的结果完全不能看，对结果进行过滤
cat /etc/passwd |grep /bin/bash
# 对于上面的用户情况，输出以下内容，简单明了
> root:x:0:0:root:/root:/bin/bash
> admin:x:1000:1000:xiongfan,,,:/home/admin:/bin/bash
> devuser:x:1001:1001:,,,:/home/devuser:/bin/bash
```

网上盛传的对原指令的优化为```cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more```同样能看到用户列表，但是要有很多其他用户组的信息，采用我的方法看起来更简单。

这个方法原理也很简单，执行一个简单的管道操作，对用户调用的bash进行过滤。

## 创建用户

```bash
# 创建用户，[uesrname]为你想创建的新用户的名字
sudo adduser [username]
# 按照提示设置密码及信息即可
# 给目标用户赋予root权限: 修改/etc/sudoers文件，文件内有注释，按照注释添加就可以

# 举个例子
sudo adduser dev # 创建dev用户
sudo echo 'dev ALL=(ALL) ALL' >> /etc/sudoers # 将授权语句写入文件，使用vim操作也可以，没区别
```

## 删除用户

先上命令

```bash
# 删除用户，[uesrname]为你想删除新用户的名字
sudo userdel -r [username]
# 举个例子
sudo userdel -r dev
```

简单介绍

```bash
# userdel语法
userdel(选项)(参数)
# 选项
-f：# 强制删除用户，即使用户当前已登录；
-r：# 删除用户的同时，删除与用户相关的所有文件。
# 参数
用户名
```

## TODO

后续增加用户组及权限相关的内容。