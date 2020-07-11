var m_db = require('../../util/db');

//查询所有订单信息
exports.find_order_details = function(object, success, failure) {
    var sqls = [];
    var sql = 'SELECT * FROM User_OrderDetails';
    sqls.push(sql);
    m_db.query(sqls, success, failure);
}

//新增订单信息
exports.add_order_details = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var sql = 'INSERT INTO User_OrderDetails';
        sql = sql + m_db.packageInSertSql(object[i]);
        sqls.push(sql);
    }
    m_db.query(sqls, success, failure);
}

//编辑订单信息
exports.update_order_details = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = object[i];
        var sql = 'INSERT INTO User_OrderDetails';
        sql = sql + m_db.packageUpdateSql(object[i]);
        sql = sql + ' WHERE DO_ID=' + object["DO_ID"];
        sqls.push(sql);
    }
    m_db.query(sqls, success, failure);
}

//删除订单信息
exports.delete_order_details = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = object[i];
        var sql = 'DELETE FROM User_OrderDetails WHERE DO_ID=' + object["DO_ID"];
        sqls.push(sql);
    }
    m_db.query(sqls, success, failure);
}

//数据库的所有接口只支持增删改查操作，不进行任何逻辑判读 find add update delate
exports.find_GameGategory = function(object, callback) {
    var sql = 'SELECT * FROM Sys_DicType';
    m_db.query(sql, function(rows, fields) {
        callback(rows);
    });
}

//删除 只通过ID删除
exports.delate_GameGategory = function(object, callback) {
    var DT_ID = object["DT_ID"];
    var sql = 'DELETE FROM Sys_DicType WHERE DT_ID=' + DT_ID;
    m_db.query(sql, function(rows, fields) {
        callback(rows);
    });
}

exports.update_GameGategory = function(object, callback) {
    var DT_ID = object["DT_ID"];
    var sql = "UPDATE Sys_DicType SET ";
    for (var key in object) {
        if (object[key]) {
            sql += (key + "=" + object[key] + ",");
        }
    }
    sql = sql.substring(0, sql.lastIndexOf(','));
    sql = sql + ' WHERE DT_ID=' + DT_ID;
    m_db.query(sql, function(rows, fields) {
        callback(rows);
    });
}

exports.add_GameGategory = function(object, callback) {
    var DT_ID = generateId();
    object["DT_ID"] = DT_ID;
    var sql = 'INSERT INTO Sys_DicType';
    var keyStr = '(';
    var valueStr = '(';

    for (var key in object) {
        if (object[key]) {
            keyStr += key + ",";
            valueStr += object[key] + ",";
        }
    }
    keyStr = keyStr.substring(0, keyStr.lastIndexOf(','));
    valueStr = valueStr.substring(0, valueStr.lastIndexOf(','));

    sql = sql + keyStr + ') VALUES' + valueStr + ')';
    m_db.query(sql, function(rows, fields) {
        callback(rows);
    });
}