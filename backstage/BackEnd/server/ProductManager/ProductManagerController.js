var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var m_httpUtils = require('../../util/HttpUtils');
var fs = require('fs');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
var m_db = require('./DataBaseMgr');
var CodeConfig = require('../../util/CommonConfig');

//查询产品列表
exports.getProductList = function(req, res) {
    if (req.url == '/getProductList') {
        var tagName = "getProductList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['productName']) sql_obj['PL_Name'] = Utils.toSqlString(recvData['productName']);
            if (recvData['productId']) sql_obj['PL_ID'] = recvData['productId'];

            Utils.packageLimitPage(sql_obj, recvData);

            m_db.find_product_list(sql_obj, function(productList) {
                res_data = productList;
                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            })
        }, tagName);
    }
}

//添加新产品
exports.addProduct = function(req, res) {
    if (req.url == '/addProduct') {
        var tagName = "addProduct";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;

            sql_obj["CreateTime"] = 'NOW()';
            sql_obj["UpdateTime"] = 'NOW()';

            if (recvData['productName']) sql_obj['PL_Name'] = Utils.toSqlString(recvData['productName']);
            if (recvData['productPrice']) sql_obj['PL_Price'] = recvData['productPrice'] * 100;
            if (recvData['twoRatio']) sql_obj['PL_Ratio_Two'] = recvData['twoRatio'];
            if (recvData['oneRatio']) sql_obj['PL_Ratio_One'] = recvData['oneRatio'];

            //判断该产品是否已经添加
            m_db.find_product(sql_obj, function(productData) {
                if (productData.length == 0) {
                    m_db.add_product([sql_obj], function(data) {
                        packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                        m_httpUtils.post_response(res, packageData, tag);

                    }, function() {
                        packageData = m_resultData.create(CodeConfig.ErrorCode.AddProductError, res_data);
                        m_httpUtils.post_response(res, packageData, tag);
                    });
                } else {
                    packageData = m_resultData.create(CodeConfig.ErrorCode.AddProductError, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }
            });

        }, tagName);
    }
}

//修改产品信息
exports.editProduct = function(req, res) {
    if (req.url == '/editProduct') {
        var tagName = "editProduct";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            sql_obj["UpdateTime"] = 'NOW()';

            if (recvData['productName']) sql_obj['PL_Name'] = Utils.toSqlString(recvData['productName']);
            if (recvData['productPrice']) sql_obj['PL_Price'] = recvData['productPrice'] * 100;
            if (recvData['twoRatio']) sql_obj['PL_Ratio_Two'] = recvData['twoRatio'];
            if (recvData['oneRatio']) sql_obj['PL_Ratio_One'] = recvData['oneRatio'];
            if (recvData['productId']) sql_obj['PL_ID'] = recvData['productId'];
            //查询该用户是否存在
            m_db.update_product([sql_obj], function(data) {
                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);

            }, function() {
                packageData = m_resultData.create(CodeConfig.ErrorCode.UpdateProductError, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });
        }, tagName);
    }
}

//移除产品功能
exports.removeProduct = function(req, res) {
    if (req.url == '/removeProduct') {
        var tagName = "removeProduct";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            sql_obj["UpdateTime"] = 'NOW()';
            if (recvData['productId']) sql_obj['PL_ID'] = recvData['productId'];
            sql_obj['PL_State'] = 1;
            //查询该用户是否存在
            m_db.update_product([sql_obj], function(data) {
                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            }, function() {
                packageData = m_resultData.create(CodeConfig.ErrorCode.DeleteProductError, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });
        }, tagName);
    }
}