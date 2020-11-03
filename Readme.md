# Node 项目

## 1.项目描述

后台模块主要有三部分，三大模块后台模块(Admin),前台模块(Main),接口模块(Api)

## 2.安装包命令

```shell
  $npm install //安装包package.json所有包安装

  $cnpm install express ejs mongoose express-session body-parser -S //安装包

  $npmn i -g nodemon //自动重启服务器
```

## 3.文件与文件夹介绍

  controller 控制器
  models     模型
  views      视图
    -admin   后台模块
    -main    前台模块
  routers    路由
  function   公共方法
  uploads    文件存放(图片，文件，视频，音频)
    -js/css/img/icon
  node_modules  node模块存放目录
  package.json 项目配置
  app.js      入口文件

## 4.后台模块

    1.Admin 后台
    2.Main  前台
    3.Api   接口

## 5.项目运行

```shell
  $node app.js //项目运行
  $nodemon app.js //自动重启服务器 
```

## 6.数据库运行
```shell
  $mongod --dbpath D:\
  $mongo //连接控制台
```