const Controller = require("../Controller");
const Content = require("../../models/Content");

class ApiController  extends Controller{
    constructor(){
        super();//必须初始化父类参数
        this.RouterAmdfunctionName = [
            // 请求类型,路由,方法名称,描述
            ["get","/","index","Api首页"],
            ["get","/content","content","内容api"],
        ]
    }

    index(req,res){
        res.send("第三模块 API模块123132 ")
    }

    content(req,res){
        Content.find().then((result)=>{
            res.json({code:200,message:"数据接收成功",result})
        })
    }

   
}


module.exports = ApiController;