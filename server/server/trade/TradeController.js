var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var ErrorCodeConfig = require('../../util/CommonConfig');
var m_db = require('./DataBaseMgr');
var fs = require('fs');
var m_httpUtils = require('../../util/HttpUtils');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
const { userInfo } = require('os');

//获取订单列表
exports.getOrderList = function(req, res) {
    if (req.url == '/getOrderList') {
        var tagName = "getOrderList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            var sql_obj = {};
            var res_data = {};
            var packageData = null;

            //获取团队信息
            if (recvData['userId'] && recvData['userId'] != 0) sql_obj["UI_ID"] = Utils.toSqlString(recvData['userId']);
            m_db.find_order_list(sql_obj, function(orderList) {
                res_data["list"] = orderList;
                m_db.find_order_sum_cost(sql_obj, function(allSumCostData) {
                    if (allSumCostData && allSumCostData.length > 0) res_data["all_totle_money"] = allSumCostData[0]["all_totle_money"];
                    packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                });
            });
        }, tagName);
    }
};