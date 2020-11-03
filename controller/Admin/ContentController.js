const adminController = require("./adminController");
const Category = require("../../models/Category");
const Content = require("../../models/Content");
const Upload = require("../../function/upload");
const fs = require("fs");


class contentController extends adminController{
        constructor(){
            super();
            this.RouterAmdfunctionName = [
                // 请求类型,路由,方法名称,描述
                ["get","/content","index","内容功能"],
                ["get","/content/add","add","添加功能"],
                ["post","/content/add","add","添加功能"],
                ["post","/content/upload","upload","上传图片"],
                ["post","/content/uploaddel","uploaddel","删除图片"],
                ["get","/content/edit","edit","修改功能"],
                ["post","/content/edit","edit","修改功能"],
                ["get","/content/del","del","删除功能"],
                ["use","/content/:error","error","公共部分"],
            ]
        }

        index(req,res){
            let page = req.query.page || 0;
            let limit = 20;
            Content.find()  //查询数据
                .limit(limit)  //获取数据条数
                .skip(page*limit) //游标,获取数据位置
                .sort({_id:-1}) //排序(1:升序,-1:降序)
                .populate("category") //填充_id指定数据库数据
                .populate("userid")
                .then((data)=>{
                req.session.result = data;
                return  Category.find({isShow:true});
            }).then((data)=>{
                req.session.category = data;
                return Content.find().countDocuments(); //获取数据总长度
            }).then((data)=>{
                req.session.pageNum = Math.ceil(data / limit);
                res.render("admin/content",req.session)
            })
        }
        
        // add(req,res){
            
        //     res.render("admin/contentAdd",req.session);
        // }
        // addPost(req,res){
        //     Content.insertMany(req.body,function(err,result){
        //         if(err){
        //             res.render("admin/error",{err:"操作失败",url:"/admin/content",date:3000})
        //             return;
        //         }
        //         res.redirect("/admin/content");
        //     })
        // }

        add(req,res){
            if(req.method == "POST"){
                Content.insertMany(req.body,function(err,result){
                    if(err){
                        res.render("admin/error",{err:"操作失败",url:"/admin/content",date:3000})
                        return;
                    }
                    res.redirect("/admin/content");
                })
            }else{
                res.render("admin/contentAdd",req.session);
            }
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

        uploaddel(req,res){
            fs.unlink(__dirname + "/../../" + req.body.url,function(err){
                if(err){
                    res.send("0");
                    return;
                }
                res.send("1");
            })
        }
        edit(req,res){
            
            Content.updateOneAmdFindOne(
                req.method,  //判断路由类型
                Object.keys(req.query).length==1 ? req.query : req.body,  //请求数据
                function(err,result){
                    if(err){
                        res.render("admin/error",{err:"操作失败",url:"/admin/content",date:3000})
                        return;
                    }
                    if(req.method == "POST"){
                        res.redirect("/admin/content");
                    }else{
                        req.session.result = result;
                        res.render("admin/contentEdit",req.session);
                    }
                })
           
        }
        del(req,res){
            if(!req.query._id){
                res.render("admin/error",{err:"操作失败",url:"/admin/content",date:3000})
                return;
            }
            Content.deleteOne({_id:req.query._id},function(err,result){
                res.redirect("/admin/content");
            })
        }

        error(req,res){
            res.render("admin/error",{err:"操作失败",url:"/admin/content",date:3000})
        }
}

module.exports = contentController;