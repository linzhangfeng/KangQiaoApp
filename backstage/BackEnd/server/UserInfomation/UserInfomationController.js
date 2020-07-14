var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var m_httpUtils = require('../../util/HttpUtils');
var fs = require('fs');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
var m_db = require('./DataBaseMgr');
var CodeConfig = require('../../util/CommonConfig');

//活用用户列表
exports.getUserList = function(req, res) {
    var tagName = "getUserList";
    if (req.url == '/getUserList') {
        m_httpUtils.post_receive(req, function(data, tag) {
            m_httpUtils.post_response(res, data, tag);
        }, tagName);

    }
}

//获取订单列表
exports.getOrderDetailList = function(req, res) {
    // var tagName = "getOrderDetailList";
    // if (req.url == '/getOrderDetailList') {
    //     m_httpUtils.post_receive(req, function(data, tag) {
    //         m_httpUtils.post_response(res, data, tag);
    //     }, tagName);
    // }
    if (req.url == '/getOrderDetailList') {
        var tagName = "getOrderDetailList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['userName']) sql_obj['UI_Name'] = Utils.toSqlString(recvData['userName']);
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];
            m_db.find_order_details(sql_obj, function(data) {
                res_data = data;
                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            }, function() {
                packageData = m_resultData.create(CodeConfig.ErrorCode.FindOrderDetailsError, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });

        }, tagName);
    }
}

//订单修改
exports.updateOrderDetail = function(req, res) {
    var tagName = "updateOrderDetail";
    if (req.url == '/updateOrderDetail') {
        m_httpUtils.post_receive(req, function(data, tag) {
            m_httpUtils.post_response(res, data, tag);
        }, tagName);
    }
}

//订单新增
exports.addOrderDetail = function(req, res) {
    var tagName = "addOrderDetail";
    if (req.url == '/addOrderDetail') {
        m_httpUtils.post_receive(req, function(data, tag) {
            m_httpUtils.post_response(res, data, tag);
        }, tagName);
    }
}