#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build

# 进入生成的文件夹
cd public

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/
# 将USERNAME和PASSWORD替换为你自己的github用户名和密码
git push -f https://USERNAME:PASSWORD@github.com/USERNAME/USERNAME.github.io.git master

cd -