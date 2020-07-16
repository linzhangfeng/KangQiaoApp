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
    if (req.url == '/getOrderDetailList') {
        var tagName = "getOrderDetailList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['userName']) sql_obj['UI_Name'] = Utils.toSqlString(recvData['userName']);
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];

            sql_obj['pageSize'] = 20;
            sql_obj['page'] = 1;
            if (recvData['limit']) sql_obj['pageSize'] = recvData['limit'];
            if (recvData['page']) sql_obj['page'] = recvData['page'];
            sql_obj['startRow'] = (sql_obj['page'] - 1) * sql_obj['pageSize'];
            m_db.find_order_details_count(sql_obj, function(countData) {
                var totalCount = countData[0]['count(*)'];
                m_db.find_order_details(sql_obj, function(data) {
                    res_data['list'] = data;
                    res_data['totalCount'] = totalCount;
                    packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }, function() {
                    packageData = m_resultData.create(CodeConfig.ErrorCode.FindOrderDetailsError, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                });
            })
        }, tagName);
    }
}

//订单修改
exports.updateOrderDetail = function(req, res) {
    var tagName = "updateOrderDetail";
    if (req.url == '/updateOrderDetail') {
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['money']) sql_obj['UO_Money'] = recvData['money'];
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];
            sql_obj['UpdateTime'] = 'NOW()';
            m_db.update_order_details([sql_obj], function(data) {
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

//订单新增
exports.addOrderDetail = function(req, res) {
    if (req.url == '/addOrderDetail') {
        var tagName = "addOrderDetail";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['userName']) sql_obj['UI_Name'] = Utils.toSqlString(recvData['userName']);

            //查询该用户是否存在
            m_db.find_user_info(sql_obj, function(data) {
                if (recvData['money']) sql_obj['UO_Money'] = recvData['money'];
                sql_obj["CreateTime"] = 'NOW()';
                sql_obj["UpdateTime"] = 'NOW()';
                if (data.length != 0) {
                    //添加订单数据
                    m_db.add_order_details([sql_obj], function(data) {
                        res_data = data;
                        packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                        m_httpUtils.post_response(res, packageData, tag);
                    }, function() {
                        packageData = m_resultData.create(CodeConfig.ErrorCode.FindOrderDetailsError, res_data);
                        m_httpUtils.post_response(res, packageData, tag);
                    });
                } else {
                    res_data['error'] = recvData['userName'] + "不存在";
                    packageData = m_resultData.create(CodeConfig.ErrorCode.UserInfoNotFound, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }
            }, function() {
                packageData = m_resultData.create(CodeConfig.ErrorCode.UpdateDetailsError, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });
        }, tagName);
    }
}

//删除订单
exports.deleteOrderDetail = function(req, res) {
    if (req.url == '/deleteOrderDetail') {
        var tagName = "deleteOrderDetail";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];
            sql_obj['UpdateTime'] = 'NOW()';
            sql_obj['UO_State'] = 1;
            m_db.update_order_details([sql_obj], function(data) {
                res_data = data;
                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            }, function() {
                packageData = m_resultData.create(CodeConfig.ErrorCode.UpdateDetailsError, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });
        }, tagName);
    }
}