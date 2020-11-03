const express = require("express");
const router = express.Router();

const fs = require("fs");

// 统一实例化方法
function createObject(classDef){
    return new classDef()
}


fs.readdir("./controller/Admin/",function(err,files){
 
    // 遍历所有controller文件
    for(let i = 0;i < files.length;i ++){
        let ControllerClass = createObject(require("../controller/Admin/" + files[i]));

        // 读取函数名称
        let functionName = ControllerClass.RouterAmdfunctionName;
        for(let j = 0;j < functionName.length;j++){
            switch (functionName[j][0]){
                case "get":
                    router.get(functionName[j][1],ControllerClass[functionName[j][2]]);
                    break;
                case "post":
                    router.post(functionName[j][1],ControllerClass[functionName[j][2]]);
                    break;
                case "use":
                    if(functionName[j][1]){ //null
                        router.use(functionName[j][1],ControllerClass[functionName[j][2]]);
                    }else{
                        router.use(ControllerClass[functionName[j][2]]);
                    }
                    break;
            }
        }
    }

})




// const adminController = require("../controller/Admin/adminController");

// const categoryController = require("../controller/Admin/categoryController");


// router.get("/",adminController.index);

// router.get("/list",adminController.list)

// router.get("/xq",adminController.xq)

// router.get("/category",categoryController.index);

module.exports = router;