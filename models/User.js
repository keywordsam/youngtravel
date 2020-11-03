const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    username:{
        type:String,
        validate: {  //验证
            validator: function(v) {
              return /^[A-z]{2,18}$/gi.test(v);
            },
            message: '用户名密码不正确'
          },
          required: [true, '用户名不能为空'] //必填
    },
    password:{
        type:String,
        validate: {  //验证
            validator: function(v) {
              return /^[A-z0-9]\w{31}$/.test(v);
            },
            message: '用户名密码不正确'
          },
          required: [true, '用户名不能为空'] //必填
    },
    isAdmin:{
        type:Boolean,
        default:false //默认不是管理员,true才是管理员
    }
})

module.exports = mongoose.model("User",userSchema);