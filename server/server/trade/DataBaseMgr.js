var m_db = require('../../util/db');
var Utils = require('../../util/Utils');

//获得订单列表
exports.find_order_list = function(object, success, failure) {
    var sql = 'SELECT   order_list.CreateTime,order_list.UO_ID,order_list.UI_ID,order_list.UO_Number,product.PL_Name,product.PL_Price,'
    sql += ' product.PL_Price*order_list.UO_Number sum_money,account.UA_Name userName '
    sql += ' FROM User_OrderDetails order_list '
    sql += ' LEFT JOIN Product_List product ON product.PL_ID = order_list.PL_ID ';
    sql += ' LEFT JOIN User_Info user_info ON user_info.UI_ID = order_list.UI_ID ';
    sql += ' LEFT JOIN User_Account account ON account.UA_ID = user_info.UA_ID ';
    sql += ' WHERE order_list.UI_ID = ' + object["UI_ID"] + ' ';
    m_db.query(sql, success, failure);
};


//计算订单总消费额
exports.find_order_sum_cost = function(object, success, failure) {
    var sql = ' select sum(a.sum_money) all_totle_money '
    sql += ' FROM ( '
    sql += ' SELECT  order_list.UO_ID,order_list.UI_ID,order_list.UO_Number,product.PL_Name,product.PL_Price,'
    sql += ' product.PL_Price*order_list.UO_Number sum_money,account.UA_Name userName '
    sql += ' FROM User_OrderDetails order_list '
    sql += ' LEFT JOIN Product_List product ON product.PL_ID = order_list.PL_ID ';
    sql += ' LEFT JOIN User_Info user_info ON user_info.UI_ID = order_list.UI_ID ';
    sql += ' LEFT JOIN User_Account account ON account.UA_ID = user_info.UA_ID ';
    sql += ' WHERE order_list.UI_ID = ' + object["UI_ID"] + ' ';
    sql += ' ) a'
    m_db.query(sql, success, failure);
}