const Controller = require("../Controller");
const User = require("../../models/User");
const { md5 } = require("../../function/Md5");

class Admincontroller extends Controller {
  constructor() {
    super(); //必须初始化父类参数
    this.RouterAmdfunctionName = [
      ["get", "/login", "login", "登录"],
      ["post", "/login", "loginPost", "登录"],
      ["use", null, "validate", "登录验证"],
      ["get", "/clear", "clear", "退出登錄"],
      ["get", "/", "index", "首页"],
    ];
  }
  login(req, res) {
    res.render("admin/login");
  }

  loginPost(req, res) {
    console.log("获取post数据");
    console.log(req.body);

    let { username, password } = req.body;
    password = md5(password);
    let userdata = new User({ username, password });
    let error = userdata.validateSync(); //数据验证
    if (error) {
      res.render("admin/error", {
        err: "请输入正确用户名密码",
        url: "/admin/login",
        date: 3000,
      });
      return;
    }
    User.findOne({ username }, function (err, result) {
      if (result != null && password == result.password && result.isAdmin) {
        // 添加session参数
        req.session.login = 1; //成功登录
        req.session.username = username;
        res.redirect("/admin/");
      } else {
        res.render("admin/error", {
          err: "请输入正确用户名密码",
          url: "/admin/login",
          date: 3000,
        });
      }
    });

    // let { username, password } = req.body;
    // password = md5(password);
    // console.log(password);
    // User.insertMany({ username, password, isAdmin: true }, (err, doc) => {
    //   console.log(err);
    //   console.log("操作成功");
    // });
  }

  // 登录验证
  validate(req, res, next) {
    // 测试登录
    req.session.login = 1; //成功登录
    req.session.username = "zhangsan";

    if (req.session.login == 1) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  }

  clear(req, res) {
    req.session.login = 0; //退出登录
    req.session.login = "";
    res.redirect("/admin/login");
  }
  index(req, res) {
    res.render("admin/index", req.session);
  }
}

module.exports = Admincontroller;
