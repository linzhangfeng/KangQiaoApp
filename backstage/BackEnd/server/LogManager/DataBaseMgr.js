var m_db = require('../../util/db');

//查询所有操作日记
exports.find_log_operator = function(object, success, failure) {
    var sql = 'SELECT * FROM Sys_OperateLog';
    m_db.query(sql, success, failure);
}

//新增操作日记
exports.add_log_operator = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var sql = 'INSERT INTO Sys_OperateLog';
        sql = sql + m_db.packageInSertSql(objectArr[i]);
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//删除操作日记
exports.delete_log_operator = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var object = object[i];
        var sql = 'DELETE FROM Sys_OperateLog WHERE OL_ID=' + object["OL_ID"];
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}

//查找佣金日记
exports.find_log_commission = function(object, success, failure) {
    var sql = 'SELECT clog.SC_ID,clog.UI_ID,clog.UO_ID,clog.UC_ID,clog.SC_Old_Money,clog.SC_New_Money,clog.SC_Type,';
    sql += ' clog.CreateTime,clog.UpdateTime ,';
    sql += ' account.UA_Name userName ';
    sql += ' FROM Sys_CommissionLog clog';
    sql += ' Left JOIN User_Info userInfo ON userInfo.UI_ID = clog.UI_ID  ';
    sql += ' Left JOIN User_Account account ON userInfo.UA_ID = account.UA_ID  ';


    let w_sql_arr = [];
    if (object['UA_Name']) {
        var temp_sql = ' account.UA_Name = ' + object['UA_Name'];
        w_sql_arr.push(temp_sql);
    }


    if (object['UO_ID']) {
        var temp_sql = ' clog.UO_ID = ' + object['UO_ID'];
        w_sql_arr.push(temp_sql);
    }

    if (object['CreateTime']) {
        var temp_sql = 'date_format([clog.CreateTime],"%Y-%m-%d") = to_days(' + object['CreateTime'] + ') ';
        w_sql_arr.push(temp_sql);
    }

    sql += m_db.packageWhereSqlByArr(w_sql_arr);

    sql += ' ORDER BY clog.CreateTime DESC ';
    sql += ' LIMIT ' + object['startRow'] + ',' + object['pageSize'];

    m_db.query(sql, function(data) {
        var resultData = {};
        resultData['list'] = data;
        m_db.queryCount(function(count) {
            resultData['count'] = count;
            if (success) success(resultData);
        }, failure)
    }, failure);
}

//新增佣金日记
exports.add_log_commission = function(objectArr, success, failure) {
    var sqls = [];
    for (var i = 0; i < objectArr.length; i++) {
        var sql = 'INSERT INTO Sys_CommissionLog';
        sql = sql + m_db.packageInSertSql(objectArr[i]);
        sqls.push(sql);
    }
    m_db.execute(sqls, success, failure);
}