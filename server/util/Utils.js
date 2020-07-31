//单独处理聊天数据

exports.copyObject = function(obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

exports.toSqlString = function(str) {
    var sqlStr = "'" + str + "'";
    return sqlStr;
}