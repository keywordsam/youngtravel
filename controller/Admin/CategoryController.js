const adminController = require("./AdminController");
const Category = require("../../models/Category");
class CategoryController extends adminController {
  constructor() {
    super(); //必须初始化父类参数
    this.RouterAmdfunctionName = [
      ["get", "/category", "index", "分类"],
      // ["get", "/category/add", "add", "添加功能"],
      // ["post", "/category/add", "addPost", "添加功能"],
      ["get", "/category/edit", "edit", "修改功能"],
      ["post", "/category/edit", "editPost", "修改功能"],
      ["get", "/category/del", "del", "删除功能"],
    ];
  }
  index(req, res) {
    Category.find({ isShow: true }).then(function (result) {
      req.session.result = result;
      res.render("admin/category", req.session);
    });
  }
 

  edit(req, res) {
    if ("_id" in req.query) {
      Category.findOne({ _id: req.query._id }, (err, result) => {
        req.session.result = result;
        res.render("admin/categoryEdit", req.session);
      });
    } else {
      req.session.result = null;
      res.render("admin/categoryEdit", req.session);
    }
  }
  editPost(req, res) {
    Category.insertManyAmdUpdateOne(req.body, function (err, result) {
      if (err) {
        res.render("admin/error", {
          err: "操作失败",
          url: "/admin/category",
          date: 3000,
        });
        return;
      }
      res.redirect("/admin/category");
    });
  }
  del(req, res) {
    Category.findOne({ _id: req.query._id }, function (err, result) {
      if (err) {
        res.render("admin/error", {
          err: "操作失败",
          url: "/admin/category",
          date: 3000,
        });
        return;
      }
      result.isShow = false;
      result.save(() => {
        res.redirect("/admin/category");
      });
    });
  }
}

module.exports = CategoryController;
