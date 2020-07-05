var m_resultData = require('../../util/result_data');
var m_db = require('../../util/db');
var m_httpUtils = require('../../util/HttpUtils');
var fs = require('fs');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');


//活用用户列表
exports.getUserList = function(req, res) {
    var tagName = "getUserList";
    if (req.url == '/hotupdateCheck') {
        m_httpUtils.post_receive(req,function(data,tag){
            m_httpUtils.post_response(res,data,tag);
        },tagName);

    }
}

//获取订单列表
exports.getOrderDetailList = function(req, res) {
    var tagName = "getOrderDetailList";
    if (req.url == '/getOrderDetailList') {
        m_httpUtils.post_receive(req,function(data,tag){
            m_httpUtils.post_response(res,data,tag);
        },tagName);
    }
}

//订单修改
exports.updateOrderDetail = function(req, res) {
    var tagName = "updateOrderDetail";
    if (req.url == '/hotupdateCheck') {
        m_httpUtils.post_receive(req,function(data,tag){
            m_httpUtils.post_response(res,data,tag);
        },tagName);
    }
}

//订单新增
exports.addOrderDetail = function(req, res) {
    var tagName = "addOrderDetail";
    if (req.url == '/hotupdateCheck') {
        m_httpUtils.post_receive(req,function(data,tag){
            m_httpUtils.post_response(res,data,tag);
        },tagName);
    }
}