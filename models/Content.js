const mongoose = require("mongoose");

let ContentSchema = mongoose.Schema({
    // 分类id
    category:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        //引入:数据库名称
        ref:"Category"
    },
    // 用户id
    userid:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        //引入:数据库名称
        ref:"User"
    },
    // 标题
    title:{
        type:String,
        default:""
    },
    // 地址
    address:{
        type:String,
        default:""
    },
    // 收藏
    iscollect:{
        type:Boolean
    },
    // 简介
    description:{
        type:String,
        default:""
    },
    // 内容
    content:{
        type:String,
        default:""
    },
    // 缩略图
    thumbnail:{
        type:String,
        default:""
    },
    // 多图
    imgs:{
        type:Array
    },
    // 添加时间
    addTime:{
        type:Date,
        default:Date.now()
    },

})

ContentSchema.statics.updateOneAmdFindOne = function(method,data,callback){
    let {_id,...input} = data;
    if(method == "POST"){
        this.model("Content").updateOne({_id},input,callback)   
    }else{
        this.model("Content").findOne({_id},callback)
    }
}



module.exports = mongoose.model("Content",ContentSchema);