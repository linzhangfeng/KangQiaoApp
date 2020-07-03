var m_logUtils = require('./LogUtils');
require('./CommonConfig.js');
exports.receive = function(req, res, type) {
    //获取账户名
    //获取操作类型
    //获取操作内容
    if (type == OperatorType.Login) {
        m_logUtils.loginLog();
    } else {
        m_logUtils.operatorLog();
    }
}

exports.response = function(req, res, type) {
    if (type == OperatorType.Login) {
        m_logUtils.loginLog();
    } else {
        m_logUtils.operatorLog();
    }
}

exports.post_receive = function(req, callback, tag) {
    req.on('data', function(data) { //数据较大，分多次接收
        obj += data;
    });

    req.on("end", function() { //接收完成后的操作
        var logStr = tag + "_post_receive：" + obj;
        console.log(logStr);
        m_logUtils.operatorLog(1111, 0, logStr);
        let jsonData = JSON.parse(obj);
        if (callback) callback(jsonData);
    });
}

exports.post_response = function(res, data, tag) {
    res.end(JSON.stringify(data));
    var logStr = tag + "_post_receive：" + obj;
    m_logUtils.operatorLog(1111, 0, logStr);
}