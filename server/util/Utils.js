//单独处理聊天数据

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
