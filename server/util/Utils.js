//单独处理聊天数据
var md5 = require('md5-node');
exports.copyObject = function (obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

exports.toSqlString = function (str) {
    var sqlStr = "'" + str + "'";
    return sqlStr;
}

//判断验证码是否过期
exports.isValidVerificationCode = function (createTime) {
    var curTimestamp = new Date().getTime();
    var createTimestamp = new Date(createTime).getTime();
    if (curTimestamp - createTimestamp < 300000) {
        return false;
    } else {
        return true;
    }
}

//创建一个验证码
exports.createVerificationCode = function () {
    var charactors = "1234567890";
    var value = '', i;
    for (var j = 1; j <= 4; j++) {
        i = parseInt(10 * Math.random());
        value = value + charactors.charAt(i);
    }
    return value;
}

//创建一个token
exports.createTokens = function(leng){
    leng = leng==undefined?32:leng	//如果没设置token长度自动为32位
    //预设随机字符串
    let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789'
    let token = ''
    //以长度单位进行循环
    for(let i=0;i<leng;++i){
        token+=chars.charAt(Math.floor(Math.random()*chars.length))
    }
    return md5(token)	///返回之前使用md5加密一下
}
