const themeConfig = require('./config/theme')

module.exports = {
  title: "zzxiongfan的前端开发博客",
  description: 'Stay Hungry. Stay Foolish',
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/zzxiongfan.png' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom', 'flowchart'] 
}  