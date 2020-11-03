const  md5 = require("md5");

exports.md5  = function(password){
    return md5(md5(password).substr(11,7) + md5(password));
}