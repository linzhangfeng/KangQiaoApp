var m_db = require('../../util/db');
var Utils = require('../../util/Utils');

//获得订单列表
exports.find_commission_list = function(object, success, failure) {
    var sql = 'SELECT commission.CreateTime,commission.UC_ID,commission.UC_Type,commission.UC_Commission,commission.UC_CostMoeny,commission.UL_Ratio,'
    sql += ' account.UA_Name userName '
    sql += ' FROM User_Commission commission '
    sql += ' LEFT JOIN User_OrderDetails orderInfo ON orderInfo.UO_ID = commission.UO_ID ';
    sql += ' LEFT JOIN User_Info user_info ON orderInfo.UI_ID = user_info.UI_ID ';
    sql += ' LEFT JOIN User_Account account ON account.UA_ID = user_info.UA_ID ';
    sql += ' WHERE commission.UI_ID = ' + object["UI_ID"] + ' ';
    m_db.query(sql, success, failure);
};


//计算订单总消费额
exports.find_order_sum_cost = function(object, success, failure) {
    var sql = ' select sum(a.UC_Commission) all_totle_commission '
    sql += ' FROM ( '
    sql += 'SELECT commission.UC_ID,commission.UC_Type,commission.UC_Commission,commission.UC_CostMoeny,commission.UL_Ratio,'
    sql += ' account.UA_Name userName '
    sql += ' FROM User_Commission commission '
    sql += ' LEFT JOIN User_OrderDetails orderInfo ON orderInfo.UO_ID = commission.UO_ID ';
    sql += ' LEFT JOIN User_Info user_info ON user_info.UI_ID = commission.UI_ID ';
    sql += ' LEFT JOIN User_Account account ON account.UA_ID = user_info.UA_ID ';
    sql += ' WHERE commission.UI_ID = ' + object["UI_ID"] + ' ';
    sql += ' ) a'
    m_db.query(sql, success, failure);
}