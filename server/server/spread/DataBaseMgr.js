var m_db = require('../../util/db');
var Utils = require('../../util/Utils');

//查询用户信息数据
exports.find_user_team_data = function(object, success, failure) {
    var sql = 'SELECT SQL_CALC_FOUND_ROWS user.UI_ID, user.UI_NickName,account.UA_Name AS UserName,IFNULL(chc.count,0) childCount, '
    sql += ' sum_order.sum_user_money sum_money,sum_team.sum_team_money team_money '
    sql += ' FROM User_Info user '
    sql += ' LEFT JOIN ( ';
    sql += ' SELECT UI_ParentID, count( 1 ) count ';
    sql += ' FROM User_Info ';
    sql += ' WHERE UI_ParentID IN ( SELECT UI_ID FROM User_Info d WHERE UI_ParentID = ' + object["UI_ID"] + ' )  ';
    sql += ' GROUP BY UI_ParentID) chc ON user.UI_ID = chc.UI_ParentID ';
    sql += ' LEFT JOIN User_Account account ON account.UA_ID = user.UA_ID ';

    sql += ' LEFT JOIN ( ';
    sql += ' SELECT User_Info.UI_ID, sum( User_OrderDetails.UO_Money ) sum_user_money ';
    sql += ' FROM User_Info,User_OrderDetails  ';
    sql += ' WHERE User_OrderDetails.UI_ID = User_Info.UI_ID  ';
    sql += ' GROUP BY User_Info.UI_ID ';
    sql += ' ) sum_order ON sum_order.UI_ID = user.UI_ID ';

    sql += ' LEFT JOIN ( ';
    sql += ' SELECT UI_ParentID, sum( UO_Money ) sum_team_money ';
    sql += ' FROM User_Info,User_OrderDetails  ';
    sql += ' WHERE UI_ParentID IN ( SELECT UI_ID FROM User_Info d WHERE UI_ParentID = ' + object["UI_ID"] + ' ) and User_OrderDetails.UI_ID = User_Info.UI_ID  ';
    sql += ' GROUP BY UI_ParentID ';
    sql += ' ) sum_team ON sum_team.UI_ParentID = user.UI_ID ';

    sql += ' where user.UI_ParentID = ' + object["UI_ID"] + ' ';
    m_db.query(sql, function(data) {
        var resultData = {};
        resultData['list'] = data;
        m_db.queryCount(function(count) {
            resultData['oneCount'] = count;
            if (success) success(resultData);
        }, failure)
    }, failure);
}

//获取二级总数人
exports.find_two_user_count = function(object, success, failure) {
    var sql = ' select sum(temp.count) twoCount from (SELECT UI_ParentID, count( 1 ) count ';
    sql += ' FROM User_Info ';
    sql += ' WHERE UI_ParentID IN ( SELECT UI_ID FROM User_Info d WHERE UI_ParentID = ' + object["UI_ID"] + ' )  ';
    sql += ' GROUP BY UI_ParentID) temp ';
    m_db.query(sql, success, failure);
}