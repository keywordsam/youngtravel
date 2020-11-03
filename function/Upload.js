const formidable = require("formidable");
const sd = require("silly-datetime");
const fs = require("fs");
const path = require("path");

exports.init = function(req,callback){

    let form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";//图片路径
    form.parse(req,function(err,fields,files){
        if(err){
            callback(err,null);
            return;
        }
        //判断如果没有图片直接输出数据
        if(!("file" in files)){
            callback(err,fields);
            return;
        }

        // console.log(fields);
        // console.log(files);
        // 图片名称:时间戳+随机数+后缀名
        let tt = sd.format(new Date(),'YYYYMMDDHHmmss');
        let rr = parseInt(Math.random() *89999 + 10000);
        let ext = path.extname(files.file.name);

        // 获取旧路径
        let oldPath = __dirname + "/../" + files.file.path;
        // 获取新路径
        let newPath = __dirname + "/../uploads/" + tt + rr + ext;

        // 修改文件名称
        fs.rename(oldPath,newPath,(err)=>{
            if(err){
                callback(err,null);
                return;
            }
            fields.file = "/uploads/"+tt+rr+ext;
            callback(null,fields);
        })

    })

}