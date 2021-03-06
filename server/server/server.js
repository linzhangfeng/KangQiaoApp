var express = require('express');
var g_dictionaryCtl = require('./controller/DictionaryController');
var g_upLoadCtl = require('./controller/UpLoadController');
var g_logManager = require('./LogManager/LogManagerController');
var g_login = require('./login/LoginController');
var g_spread = require('./spread/SpreadController');
var g_home = require('./home/HomeController');
var g_trade = require('./trade/TradeController');
var g_commission = require('./Commission/CommissionController');
var app = express();

var m_config = null;
exports.start = function name(config) {
    m_config = config;
    app.listen(m_config.CLIENT_PORT);
    console.log("client service is listening on port " + m_config.CLIENT_PORT);
}
app.all("*", function(req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type,Access-Token,x-token,charset,x-ijt,X-PkgName,X-App,X-Channel,X-Device,fromType");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200); //让options尝试请求快速结束
    else
        next();
});
app.get('/getDicType', g_dictionaryCtl.getDicType);
app.get('/operatorDicType', g_dictionaryCtl.operatorDicType);

app.post('/hotupdateUpLoad', g_upLoadCtl.hotupdateUpLoad);
app.post('/hotupdateCheck', g_upLoadCtl.hotupdateCheck);

//login begin
app.post('/getVerifitionCode', g_login.getVerifitionCode);
app.post('/userRegister', g_login.userRegister);
app.post('/userLogin', g_login.userLogin);
app.post('/getUserInfo', g_login.getUserInfo);
app.post('/userLogout', g_login.userLogout);

//login end

//spread begin
app.post('/getTeamData', g_spread.getTeamData);
//spread end

//home begin
app.post('/addParentUser', g_home.addParentUser);
//home end

//trade begin
app.post('/getOrderList', g_trade.getOrderList);
//trade end

//commission begin
app.post('/getCommissionList', g_commission.getCommissionList);
//commission end

//logmanager begin
app.post('/getLogOperatorList', g_logManager.getLogOperatorList);
//logmanager end