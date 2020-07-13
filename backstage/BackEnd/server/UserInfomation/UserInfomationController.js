var m_resultData = require('../../util/ResultDataUtils');
var m_httpUtils = require('../../util/HttpUtils');
var fs = require('fs');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
var m_db = require('./DataBaseMgr');

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
            m_db.find_user_data(sql_obj, function(userDataArr) {
                var sendData = null;
                var userData = userDataArr[0];
                if (userData && userData['SA_Password'] == recvData['password']) {
                    res_data['token'] = userData['SA_Token'];
                    sendData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                } else {
                    sendData = m_resultData.create(ErrorCodeConfig.ErrorCode.UsernameError, res_data);
                }
                m_httpUtils.post_response(res, sendData, tag);
            }, function() {
                sendData = m_resultData.create(ErrorCodeConfig.ErrorCode.FindUserInfoError, res_data);
                m_httpUtils.post_response(res, sendData, tag);
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