var m_db = require('../../util/db');
var Utils = require('../../util/Utils');
//查询所有订单信息
exports.find_order_details = function(object, success, failure) {
    var sql = 'SELECT User_OrderDetails.UO_ID,User_OrderDetails.UO_Money,User_OrderDetails.CreateTime,User_OrderDetails.UpdateTime,User_Info.UI_NickName ';
    sql += 'FROM User_OrderDetails,User_Info ';
    sql += 'where User_Info.UI_ID = User_OrderDetails.UI_ID and User_OrderDetails.UO_State = 0 ';
    if (object['UO_ID'] || object['UI_NickName'] || object['CreateTime']) {

        if (object['UI_NickName']) {
            var temp_sql = ' and User_Info.UI_NickName = ' + object['UI_NickName'];
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

        if (object['UI_NickName']) {
            var UI_ID = '(SELECT UI_ID FROM User_Info where UI_NickName=' + object['UI_NickName'] + ')';
            object['UI_ID'] = UI_ID;
            object['UI_NickName'] = null;
        }
        if (object['PL_Name']) {
            var UI_ID = '(SELECT PL_ID FROM Product_List where PL_Name=' + object['PL_Name'] + ')';
            object['PL_ID'] = UI_ID;
            object['UI_NickName'] = null;
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

//添加订单佣金
exports.add_commission_order = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        let object = objectArr[i];
        var sql1 = 'INSERT INTO User_Commission';
        sql1 += m_db.packageInSertSql(objectArr[i]);

        var sql2 = 'UPDATE User_Info SET ';
        sql2 += ' UI_Gold = UI_Gold+' + object['UC_Commission'];
        sql2 += ' WHERE UI_ID=' + object["UI_ID"];

        sqls.push(sql2);
    }
    m_db.execute(sqls, success, failure);
}

//更新用户佣金
exports.update_user_commission = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = objectArr[i];
        var temp_object = Utils.copyObject(object);
        temp_object['UO_ID'] = null;
        var sql = 'UPDATE User_Info SET ';
        sql += ' UI_Gold = UI_Gold+' + temp_object['UC_Commission'];
        sql += ' WHERE UI_ID=' + object["UI_ID"];
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//获取用户上两级信息
exports.find_parent_user = function(objectr, success, failure) {
    var sql = ' SELECT userInfo.UI_ParentID parentId,pUserInfo.UI_ParentID pparentId ';
    sql += ' FROM User_Info userInfo ';
    sql += ' LEFT JOIN User_Info pUserInfo ON pUserInfo.UI_ID = userInfo.UI_ParentID ';
    sql += ' where userInfo.UI_ID = ' + objectr["UI_ID"];
    m_db.query(sql, success, failure);
}

//获取商品信息
exports.find_product = function(objectr, success, failure) {
    var sql = 'SELECT * ';
    sql += ' FROM Product_List ';
    sql += ' where PL_Name = ' + objectr["PL_Name"];
    m_db.query(sql, success, failure);
}