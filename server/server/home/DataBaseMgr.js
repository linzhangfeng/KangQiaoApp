var m_db = require('../../util/db');
var Utils = require('../../util/Utils');

exports.update_parent_user_info = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = objectArr[i];
        var temp_object = Utils.copyObject(object);
        temp_object['UI_ID'] = null;
        var sql = 'UPDATE User_Info SET ';
        sql = sql + m_db.packageUpdateSql(temp_object);
        sql = sql + ' WHERE UI_ID=' + object["UI_ID"];
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

exports.find_parent_user_info = function(object, success, failure) {
    var sql = 'SELECT User_Info.UI_ParentID,User_Info.UI_ID,User_Info.UI_NickName,User_Account.UA_Name '
    sql += ' FROM User_Info,User_Account '
    sql += ' WHERE User_Info.UA_ID = User_Account.UA_ID ';
    if (object["UI_ID"]) {
        sql += ' and User_Info.UI_ID=' + object["UI_ID"];
    }
    m_db.query(sql, success, failure);
}