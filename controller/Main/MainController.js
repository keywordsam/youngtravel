const Controller = require("../controller");
const Category = require("../../models/Category");
const Content = require("../../models/Content");
const User = require("../../models/User");
const { md5 } = require("../../function/md5");
const Upload = require("../../function/upload");
const fs = require("fs");


class MainController extends Controller {
  constructor() {
    super(); //必须初始化父类参数
    this.RouterAmdfunctionName = [
      // 请求类型,路由,方法名称,描述
      ["use", null, "indexbase", "首页"],
      ["get", "/", "index", "首页"],
      ["get", "/details", "details", "详情页"],
      ["post", "/register", "register", "注册"],
      ["post", "/login", "login", "登录"],
      ["get", "/clear", "clear", "退出登录"],
      ["get", "/addcontent", "addcontent", "发表文章"],
      ["post", "/addcontent", "addcontentPost", "发表文章"],
      ["post", "/upload", "upload", "上传图片"],

    ];
  }

  indexbase(req, res, next) {
    if (!("login" in req.session)) {
      req.session.login = false;
    }
    next();
  }

  index(req, res) {
    let category = req.query.category ? { category: req.query.category } : {};
    Category.find()
      .populate("userid")
      .then((data) => {
        req.session.category = data;
        return Content.find(category);
      })
      .then((data) => {
        req.session.result = data;
        res.render("main/index", req.session);
      });
  }

  details(req, res) {
    let _id = req.query.id;
    Category.find()
      .then((data) => {
        req.session.category = data;
        return Content.findOne({ _id });
      })
      .then((data) => {
        req.session.result = data;
        res.render("main/details", req.session);
      });
  }

  register(req, res) {
    let { username, password, password2 } = req.body;
    if (
      username == "" ||
      password != password2 ||
      username.length < 2 ||
      password.length < 6
    ) {
      res.render("admin/error", {
        err: "请输入正确用户名密码",
        url: "/",
        date: 3000,
      });
      return;
    }
    password = md5(password);
    User.findOne({ username }, (err, result) => {
      if (err || result) {
        res.render("admin/error", {
          err: "请输入正确用户名密码",
          url: "/",
          date: 3000,
        });
        return;
      }

      User.create({ username, password });

      res.render("admin/error", { err: "注册成功", url: "/", date: 3000 });
    });
  }

  login(req, res) {
    let { username, password } = req.body;
    password = md5(password);

    User.findOne({ username }, (err, result) => {
      if (err) {
        res.render("admin/error", {
          err: "请输入正确用户名密码",
          url: "/",
          date: 3000,
        });
        return;
      }
      if (result != null && result.password == password) {
        req.session.username = username;
        req.session.UserId = result._id;
        req.session.login = true; //登录成功
        res.redirect("/");
      }
    });
  }
  clear(req, res) {
    req.session.login = false;
    res.redirect("/");
  }

  addcontent(req, res) {
    res.render("main/addcontent", req.session);
  }

  addcontentPost(req, res) {
    let data = req.body;
    data.userid = req.session.UserId;

    Content.insertMany(data, (err, result) => {
      if (err) {
        res.render("admin/error", {
          err: "请输入正确用户名密码",
          url: "/",
          date: 3000,
        });
        return;
      }

      res.redirect("/");
    });
  }
  upload(req,res){
    Upload.init(req,function(err,fields){
        if(err){
            res.json({code:201}); //失败
        }else{
            res.json(fields);
        }
    })
}
}

module.exports = MainController;
