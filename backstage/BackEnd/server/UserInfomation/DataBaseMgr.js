var m_db = require('../../util/db');
var Utils = require('../../util/Utils');
//查询所有订单信息
exports.find_order_details = function(object, success, failure) {
    var sql = 'SELECT User_OrderDetails.UO_ID,User_OrderDetails.UO_Money,User_OrderDetails.CreateTime,User_OrderDetails.UpdateTime,User_Info.UI_Name ';
    sql += 'FROM User_OrderDetails,User_Info ';
    sql += 'where User_Info.UI_ID = User_OrderDetails.UI_ID and User_OrderDetails.UO_State = 0 ';
    sql += 'ORDER BY User_OrderDetails.CreateTime DESC ';
    sql += 'LIMIT ' + object['startRow'] + ',' + object['pageSize'];
    if (object['UO_ID'] || object['UI_Name']) {

        if (object['UI_Name']) {
            var UI_Name_sql = ' and User_Info.UI_Name = ' + object['UI_Name'];
            sql += UI_Name_sql;
        }

        if (object['UO_ID']) {
            var UI_ID_sql = ' and User_OrderDetails.UO_ID = ' + object['UO_ID'];
            sql += UI_ID_sql;
        }
    }
    m_db.query(sql, success, failure);
}

//查询订单条数
exports.find_order_details_count = function(object, success, failure) {
    var sql = 'SELECT count(*) ';
    sql += 'FROM User_OrderDetails,User_Info ';
    sql += 'where User_Info.UI_ID = User_OrderDetails.UI_ID and User_OrderDetails.UO_State = 0 ';
    m_db.query(sql, success, failure);
}

exports.find_user_info = function(objectArr, success, failure) {
    var sql = 'SELECT * FROM User_Info where ';
    sql += m_db.packageWhereSql(objectArr);
    m_db.query(sql, success, failure);
}

//新增订单信息
exports.add_order_details = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        let object = objectArr[i];
        var sql = 'INSERT INTO User_OrderDetails';

        if (object['UI_Name']) {
            var UI_ID = '(SELECT UI_ID FROM User_Info where UI_Name=' + object['UI_Name'] + ')';
            object['UI_ID'] = UI_ID;
            object['UI_Name'] = null;
        }
        sql += m_db.packageInSertSql(objectArr[i]);
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//编辑订单信息,删除订单信息
exports.update_order_details = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = objectArr[i];
        var temp_object = Utils.copyObject(object);
        temp_object['UO_ID'] = null;
        var sql = 'UPDATE User_OrderDetails SET ';
        sql = sql + m_db.packageUpdateSql(temp_object);
        sql = sql + ' WHERE UO_ID=' + object["UO_ID"];
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
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