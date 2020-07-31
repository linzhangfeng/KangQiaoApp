var m_db = require('../../util/db');
var Utils = require('../../util/Utils');
//获取手机验证码
exports.find_verification_code = function(object, success, failure) {
    var sql = 'SELECT * FROM User_VerificationCode WHERE UV_Phone=' + object["UV_Phone"];
    m_db.query(sql, success, failure);
}

//添加手机验证码
exports.add_verification_code = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var sql = 'INSERT INTO User_VerificationCode';
        sql = sql + m_db.packageInSertSql(objectArr[i]);
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//更新手机验证码
exports.update_verification_code = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = objectArr[i];
        var temp_object = Utils.copyObject(object);
        temp_object['UV_ID'] = null;
        var sql = 'UPDATE User_VerificationCode SET ';
        sql = sql + m_db.packageUpdateSql(temp_object);
        sql = sql + ' WHERE UV_ID=' + object["UV_ID"];
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//查询用户账户数据
exports.find_user_account_data = function(object, success, failure) {
    var sql = 'SELECT * FROM User_Account WHERE UA_Name=' + object["UA_Name"];
    m_db.query(sql, success, failure);
}

//添加账户
exports.add_user_account = function(object, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var sql = 'INSERT INTO User_Account';
        sql = sql + m_db.packageInSertSql(objectArr[i]);
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//添加用户信息
exports.add_user_info = function(object, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var sql = 'INSERT INTO User_Info';
        sql = sql + m_db.packageInSertSql(objectArr[i]);
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//查询用户信息数据
exports.find_user_info_data = function(object, success, failure) {
    var sql = 'SELECT * FROM User_Info WHERE UI_Phone=' + object["UI_Phone"];
    m_db.query(sql, success, failure);
}

//查询所有操作日记
exports.find_log_operator = function(object, success, failure) {
    var sqls = [];
    var sql = 'SELECT * FROM Sys_OperateLog';
    sqls.push(sql);
    m_db.query(sqls, success, failure);
}

//新增操作日记
exports.add_log_operator = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var sql = 'INSERT INTO Sys_OperateLog';
        sql = sql + m_db.packageInSertSql(object[i]);
        sqls.push(sql);
    }
    m_db.query(sqls, success, failure);
}

//删除操作日记
exports.delete_log_operator = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = object[i];
        var sql = 'DELETE FROM Sys_OperateLog WHERE OL_ID=' + object["OL_ID"];
        sqls.push(sql);
    }
    m_db.query(sqls, success, failure);
}