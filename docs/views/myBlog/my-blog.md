---
title: '如何搭建本博客'
date: 2020-04-22
tags:
 - blog    
categories: 
 - 博客相关
---


::: tip
在文章预览时显示，高亮
:::

> 在文章预览时显示，为浅色字体

<!-- more -->

## 项目简介

本项目由[vuepress](https://vuepress.vuejs.org/zh/) 驱动，使用主题来源[vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)

## 使用方法

### 构建并运行项目

```bash
// 克隆此项目
git clone https://github.com/zzXiongFan/my-blog.git
// 进入项目并安装相关依赖
cd my-blog
yarn install  // vuepress推荐使用yarn,，若您习惯使用npm，可以使用命令：npm install
// 运行项目
yarn run dev // npm run dev
```

### 自定义设置

主要设置方法参考[vuepress官方文档](https://vuepress.vuejs.org/zh/guide/)和[vuepress-theme-reco主题说明文档](https://vuepress-theme-reco.recoluan.com/views/1.x/)，此处简单介绍。

- 项目通过```./docs/.vuepress/```内的文件进行配置，```config.js```文件为配置总入口

  ```javascript
  const themeConfig = require('./config/theme')
  
  module.exports = {
   // 网站标题  
    title: "zzxiongfan的前端开发博客",
      // 网站描述，涉及SEO，同时会在主页进行显示
    description: 'Stay Hungry. Stay Foolish',
      // 打包生成的文件夹目录
    dest: 'public',
    head: [
       // 设置网页图标，图片默认路径为 ./docs/.vuepress/public，以此为根路径，进行相对路径的寻址
      ['link', { rel: 'icon', href: '/zzxiongfan.png' }],
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
     // vuepress使用的主题，本项目使用vuepress-theme-reco
    theme: 'reco',
    themeConfig,
    markdown: {
      lineNumbers: true
    },
    plugins: ['@vuepress/medium-zoom', 'flowchart'] 
  }  
  ```

- ```./docs/.vuepress/config/```文件夹内进行页面导航栏，侧边栏和底部显示内容，均有详细注释，可自行配置

### 编写文档

将自己的文档编写在```./docs/views/```目录下，使用Markdown格式，具体参考以下模板。

```markdown
---
# vuepress会自动提取---之间的内容，生成静态页面
title: '文档标题'
date: 2020-04-22 # 文档编写时间，会自动主页排序并生成时间轴
tags:  # 当前文档的标签，会在侧边栏及导航栏进行显示，支持搜索功能
 - tag1
 - tag2
categories: # 当前文档的分类，会在侧边栏及导航栏进行显示，支持搜索功能
 - category1
 - category2
---
::: tip
中间内容会在文摘摘要中高亮显示
::::

> 此段内容会在文章摘要中以浅色字体展示

more以前的内容会在主页文章摘要中显示
<!-- more -->
文档正文，使用Markdown标准的段落格式，vuepress会自动提取段落生成侧边导航栏和锚点
```

按照以上格式进行文档编写，vuepress会自动提取关键字，生成类别和标签索引，插入页面。

### 构建和部署

此处展示实例为使用Github pages进行个人博客页面的部署，Github pages会将本用户中[username].github.io仓库的静态资源发布在对应域名[username].github.io的网页里，所以部署的目的就是：生成博客的静态资源，提送至本人的[username].github.io仓库。

#### 生成博客的静态资源

```bash
// 构建网站
cd my-blog
yarn build // npm run build
```

#### 上传资源至远程仓库

构建的资源位于```./public/```下，将此文件夹的全部内容推送至远程仓库[username].github.io

更新博文时，只需要重新构建，并推送即可。

