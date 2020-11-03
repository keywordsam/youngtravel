const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const sd = require("silly-datetime");
const app = express();

const ejs = require('ejs');
app.engine('html',ejs.__express);//静态文件后缀名设置
app.set('view engine','html');
app.locals.sd = sd;//预加加载方法

// 引入静态文件
app.use(express.static("./public"));
app.use("/uploads",express.static("./uploads"));

// post配置
app.use(bodyParser.urlencoded({ limit:"50mb", extended: true }))
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// session配置
app.use(session({
  secret:"iloveyou",//验证
  resave:false,
  saveUninitialized:false
}))

// 第一模块
app.use('/',require("./routers/Main"))
// app.use(express.static("./"))
// 第二模块
app.use('/admin',require("./routers/Admin"))
// 第三模块
app.use('/api',require("./routers/Api"))


mongoose.connect("mongodb://127.0.0.1:27017/stock",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
// mongoose.connect("mongodb://118.89.37.46:27017/stock",{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
  if(err){
    throw Error(err)
    console.log("数据库连接失败")
  }else{
    app.listen(3011, '127.0.0.1', () => {
      console.log('请访问：http://127.0.0.1:3011');
    });
  }
})
