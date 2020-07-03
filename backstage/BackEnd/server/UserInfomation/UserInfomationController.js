var m_resultData = require('../../util/result_data');
var m_db = require('../../util/db');
var fs = require('fs');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');


//活用用户列表
exports.getUserList = function(req, res) {
    if (req.url == '/hotupdateCheck') {
        var obj = "";
        req.on('data', function(data) { //数据较大，分多次接收
            obj += data;
        })

        req.on("end", function() { //接收完成后的操作
            console.log("接收到客户端数据：" + obj);
            let json = JSON.parse(obj);
            let data = {};
            data["update"] = false;
            if (json.version != "1.0.19") {
                data["update"] = true;
            }
            data["wgtUrl"] = "http://119.23.221.227/hotupdate/qianghongbao/__UNI__B4E8852.wgt";
            console.log("返回到客户端数据：" + JSON.stringify(data));
            res.end(JSON.stringify(data));
        })
    }
}

//获取订单列表
exports.getOrderDetailList = function(req, res) {
    if (req.url == '/hotupdateCheck') {
        var obj = "";
        req.on('data', function(data1) { //数据较大，分多次接收
            obj += data1;
        })

        req.on("end", function() { //接收完成后的操作
            console.log("接收到客户端数据：" + obj);
            let json = JSON.parse(obj);
            let data = {};
            data["update"] = false;
            if (json.version != "1.0.19") {
                data["update"] = true;
            }
            data["wgtUrl"] = "http://119.23.221.227/hotupdate/qianghongbao/__UNI__B4E8852.wgt";
            console.log("返回到客户端数据：" + JSON.stringify(data));
            res.end(JSON.stringify(data));
        })
    }
}