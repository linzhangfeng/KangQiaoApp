var m_db = require('../../util/db');
var Utils = require('../../util/Utils');
//查询所有订单信息
exports.find_order_details = function(object, success, failure) {
    var sql = 'SELECT User_OrderDetails.UO_ID,User_OrderDetails.UO_Money,User_OrderDetails.CreateTime,User_OrderDetails.UpdateTime,User_Info.UI_Name ';
    sql += 'FROM User_OrderDetails,User_Info ';
    sql += 'where User_Info.UI_ID = User_OrderDetails.UI_ID and User_OrderDetails.UO_State = 0 ';
    if (object['UO_ID'] || object['UI_Name'] || object['CreateTime']) {

        if (object['UI_Name']) {
            var temp_sql = ' and User_Info.UI_Name = ' + object['UI_Name'];
            sql += temp_sql;
        }

        if (object['UO_ID']) {
            var temp_sql = ' and User_OrderDetails.UO_ID = ' + object['UO_ID'];
            sql += temp_sql;
        }

        if (object['CreateTime']) {
            var temp_sql = ' and date_format([CreateTime],"%Y-%m-%d") = to_days(' + object['CreateTime'] + ') ';
            sql += temp_sql;
        }
    }
    sql += ' ORDER BY User_OrderDetails.CreateTime DESC ';
    sql += ' LIMIT ' + object['startRow'] + ',' + object['pageSize'];
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


//查询用户信息
exports.find_user_info = function(object, success, failure) {
    var sql = 'SELECT child.UI_Gold,child.UI_ID,User_Account.UA_Name,child.UI_Phone,child.CreateTime,child.UpdateTime,child.UI_Name,parent.UI_Name AS Parent_Name ';
    sql += 'FROM User_Account,User_Info child Left JOIN User_Info parent ON parent.UI_ID = child.UI_ParentID ';
    sql += 'where User_Account.UA_ID = child.UA_ID and child.UI_State = 0 ';
    if (object['UI_ID'] || object['UI_Name'] || object['UI_Phone'] || object['UA_Name'] || object['CreateTime']) {
        if (object['UI_Name']) {
            var temp_sql = ' and child.UI_Name = ' + object['UI_Name'];
            sql += temp_sql;
        }

        if (object['UI_Phone']) {
            var temp_sql = ' and child.UI_Phone = ' + object['UI_Phone'];
            sql += temp_sql;
        }

        if (object['UI_ID']) {
            var temp_sql = ' and child.UI_ID = ' + object['UI_ID'];
            sql += temp_sql;
        }

        if (object['UA_Name']) {
            var temp_sql = ' and User_Account.UA_Name = ' + object['UA_Name'];
            sql += temp_sql;
        }


        if (object['CreateTime']) {
            var temp_sql = ' and date_format([child.CreateTime],"%Y-%m-%d") = to_days(' + object['CreateTime'] + ') ';
            sql += temp_sql;
        }
    }
    sql += ' ORDER BY child.CreateTime DESC ';
    sql += 'LIMIT ' + object['startRow'] + ',' + object['pageSize'];
    m_db.query(sql, success, failure);
}

exports.update_user_info = function(objectArr, success, failure) {
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

//查询用户数量
exports.find_user_count = function(object, success, failure) {
    var sql = 'SELECT count(*) ';
    sql += 'FROM User_Account,User_Info ';
    sql += 'where User_Account.UA_ID = User_Info.UA_ID and User_Info.UI_State = 0 ';
    m_db.query(sql, success, failure);
}