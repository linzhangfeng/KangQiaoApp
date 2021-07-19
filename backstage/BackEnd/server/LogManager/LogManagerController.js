var m_resultData = require('../../util/ResultDataUtils');
var m_db = require('./DataBaseMgr');
var Utils = require('../../util/Utils');
var fs = require('fs');
var m_httpUtils = require('../../util/HttpUtils');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
var CodeConfig = require('../../util/CommonConfig');

//查看操作日记
exports.getLogOperatorList = function(req, res) {
    if (req.url == '/getLogOperatorList') {
        var tagName = "getLogOperatorList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['userName']) sql_obj['UA_Name'] = Utils.toSqlString(recvData['userName']);
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];
            if (recvData['userId']) sql_obj['UI_ID'] = recvData['userId'];
            if (recvData['commissionType']) sql_obj['SC_Type'] = recvData['commissionType'];

            Utils.packageLimitPage(sql_obj, recvData);
            m_db.find_commission_list(sql_obj, function(data) {
                res_data = data;
                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            }, function() {
                packageData = m_resultData.create(CodeConfig.ErrorCode.CommonError, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });

        }, tagName);
    }
}


//查看佣金日记
exports.getLogCommissionList = function(req, res) {
    if (req.url == '/getLogCommissionList') {
        var tagName = "getLogCommissionList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['userName']) sql_obj['UA_Name'] = Utils.toSqlString(recvData['userName']);
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];
            if (recvData['userId']) sql_obj['UI_ID'] = recvData['userId'];
            if (recvData['commissionType']) sql_obj['SC_Type'] = recvData['commissionType'];

            Utils.packageLimitPage(sql_obj, recvData);
            m_db.find_log_commission(sql_obj, function(data) {
                res_data = data;
                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            }, function() {
                packageData = m_resultData.create(CodeConfig.ErrorCode.CommonError, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });

        }, tagName);
    }
}