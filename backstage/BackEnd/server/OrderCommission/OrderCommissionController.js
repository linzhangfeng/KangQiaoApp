var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var m_httpUtils = require('../../util/HttpUtils');
var fs = require('fs');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
var m_db = require('./DataBaseMgr');
var m_logic = require('./Logic');
var m_product_db = require('../ProductManager/DataBaseMgr');
var CodeConfig = require('../../util/CommonConfig');
var m_dbLogUtils = require('../../util/LogUtils');
//获得佣金列表
exports.getCommissionList = function(req, res) {
    if (req.url == '/getCommissionList') {
        var tagName = "getCommissionList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['userName']) sql_obj['UA_Name'] = Utils.toSqlString(recvData['userName']);
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];
            if (recvData['userId']) sql_obj['UI_ID'] = recvData['userId'];
            if (recvData['commissionId']) sql_obj['UO_ID'] = recvData['commissionId'];


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

//获取订单列表
exports.getOrderDetailList = function(req, res) {
    if (req.url == '/getOrderDetailList') {
        var tagName = "getOrderDetailList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['userName']) sql_obj['UA_Name'] = Utils.toSqlString(recvData['userName']);
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];

            Utils.packageLimitPage(sql_obj, recvData);
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
            if (recvData['userName']) sql_obj['UA_Name'] = Utils.toSqlString(recvData['userName']);

            //查询该用户是否存在
            m_db.find_user_info(sql_obj, function(data) {
                if (recvData['productName']) sql_obj['PL_Name'] = Utils.toSqlString(recvData['productName']);
                if (recvData['number']) sql_obj['UO_Number'] = recvData['number'];
                sql_obj["CreateTime"] = 'NOW()';
                sql_obj["UpdateTime"] = 'NOW()';
                if (data.length != 0) {
                    //获取商品信息
                    var product_sql = {};
                    if (recvData['productName']) product_sql['PL_Name'] = Utils.toSqlString(recvData['productName']);
                    m_db.find_product(product_sql, function(product_data) {
                        if (product_data.length != 0) {
                            //添加订单数据
                            var add_order_sql = {};
                            add_order_sql = Utils.copyObject(sql_obj);
                            add_order_sql["UO_Price"] = product_data[0]["PL_Price"];
                            add_order_sql["UO_Money"] = product_data[0]["PL_Price"] * parseInt(recvData['number']);
                            m_db.add_order_details([add_order_sql], function(order_data) {
                                res_data["orderId"] = order_data.insertId;
                                packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                                m_httpUtils.post_response(res, packageData, tag);

                                //获取用户的上两级
                                var parent_user_sql = {};
                                parent_user_sql = Utils.copyObject(sql_obj);
                                m_db.find_parent_user(parent_user_sql, function(parent_userdata) {
                                    if (parent_userdata.length > 0) {
                                        var commissionArr = [];
                                        var commissionMoney = parseInt(recvData['number']) * product_data[0]["PL_Price"];
                                        var public_parent_sql = {};
                                        public_parent_sql["UC_CostMoeny"] = commissionMoney;
                                        public_parent_sql["UO_ID"] = order_data.insertId;
                                        public_parent_sql["CreateTime"] = 'NOW()';
                                        public_parent_sql["UpdateTime"] = 'NOW()';

                                        if (parent_userdata[0].parentId) {
                                            var parent_sql_1 = Utils.copyObject(public_parent_sql);
                                            parent_sql_1["UI_ID"] = parent_userdata[0].parentId;
                                            parent_sql_1["UL_Ratio"] = product_data[0].PL_Ratio_One;
                                            parent_sql_1["UC_Type"] = 1;
                                            parent_sql_1["UC_Commission"] = commissionMoney * product_data[0].PL_Ratio_One / 100;
                                            commissionArr.push(parent_sql_1);
                                        }
                                        if (parent_userdata[0].pparentId) {
                                            var parent_sql_2 = Utils.copyObject(public_parent_sql);
                                            parent_sql_2["UI_ID"] = parent_userdata[0].pparentId;
                                            parent_sql_2["UL_Ratio"] = product_data[0].PL_Ratio_Two;
                                            parent_sql_2["UC_Type"] = 2;
                                            parent_sql_2["UC_Commission"] = commissionMoney * product_data[0].PL_Ratio_Two / 100;
                                            commissionArr.push(parent_sql_2);
                                        }

                                        m_db.add_commission_order(commissionArr, function(addData) {
                                            //把订单日记存入到数据库
                                            console.log("lin=add_commission_order:" + JSON.stringify(addData));
                                            var lineNum = 4;
                                            var commissionLogObjectArr = [];
                                            var tempArr = [
                                                [],
                                                []
                                            ];
                                            for (var i = 0; i < addData.length; i++) {
                                                var obj = addData[i];
                                                tempArr[parseInt(i / lineNum)].push(obj);
                                            }

                                            for (var i = 0; i < tempArr.length; i++) {
                                                if (tempArr[i].length == 0) break;
                                                var commissionLogObject = {};
                                                commissionLogObject["SC_Type"] = 1;
                                                commissionLogObject["UO_ID"] = order_data.insertId;
                                                commissionLogObject["UC_ID"] = tempArr[i][0]["insertId"];
                                                if (i == 0) {
                                                    commissionLogObject["UI_ID"] = parent_userdata[0].parentId;
                                                } else {
                                                    commissionLogObject["UI_ID"] = parent_userdata[0].pparentId;
                                                }
                                                commissionLogObject["SC_Old_Money"] = tempArr[i][1][0]["UI_Gold"];
                                                commissionLogObject["SC_New_Money"] = tempArr[i][3][0]["UI_Gold"];
                                                commissionLogObjectArr.push(commissionLogObject);
                                            }
                                            if (commissionLogObjectArr.length != 0) m_dbLogUtils.commissionLog(commissionLogObjectArr);
                                        });
                                    }
                                });
                            }, function() {
                                packageData = m_resultData.create(CodeConfig.ErrorCode.FindOrderDetailsError, res_data);
                                m_httpUtils.post_response(res, packageData, tag);
                            });
                        } else {
                            packageData = m_resultData.create(CodeConfig.ErrorCode.ProductNotFound, res_data);
                            m_httpUtils.post_response(res, packageData, tag);
                        }
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

//快速添加订单
exports.fastAddOrder = function(req, res) {
    if (req.url == '/fastAddOrder') {
        var tagName = "fastAddOrder";
        var testData = {
            list: [{
                shopName: '肯德基',
                userName: '13666666666',
                sumCost: 40000,
                aliasName: '小乔洗衣粉1*50;小乔牙刷1*50',
                payType: 1,
                product: [{
                        productName: '小乔洗衣粉',
                        price: 100,
                        number: 20,
                        cost: 2000
                    },
                    {
                        productName: '小乔牙刷',
                        price: 100,
                        number: 20,
                        cost: 2000
                    },
                ]
            }, {
                shopName: '麦当劳',
                userName: '13111111111',
                sumCost: 40000,
                aliasName: '小乔洗衣粉1*50;小乔牙刷1*50',
                payType: 1,
                product: [{
                        productName: '小乔洗衣粉',
                        price: 100,
                        number: 20,
                        cost: 2000
                    },
                    {
                        productName: '小乔牙刷',
                        price: 100,
                        number: 20,
                        cost: 2000
                    },
                ]
            }]
        };
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //客户单检测用户是否存在
            var sql_obj = {};
            var res_data = {};
            var packageData = null;

            //获取订单列表
            var order_list = recvData.list;
            //检测列表的用户名

            //检测用户

            //检测商品

            m_product_db.find_product_name_list({}, function(product_list) {
                var resultObj = m_logic.checkProductName(order_list, product_list.list);
                if (resultObj.result) {
                    //添加订单
                    var add_order_sql_obj_arr = [];
                    for (var i = 0; i < order_list.length; i++) {
                        var temp_obj = order_list[i];
                        var add_order_sql_obj = {};
                        add_order_sql_obj["userName"] = Utils.toSqlString(temp_obj.userName);
                        add_order_sql_obj["UO_Money"] = temp_obj.sumCost;
                        add_order_sql_obj["UO_PayType"] = temp_obj.payType;
                        add_order_sql_obj["UO_Name"] = Utils.toSqlString(temp_obj.aliasName);
                        add_order_sql_obj["CreateTime"] = 'NOW()';
                        add_order_sql_obj["UpdateTime"] = 'NOW()';
                        add_order_sql_obj_arr.push(add_order_sql_obj);
                    }

                    m_db.add_order_more(add_order_sql_obj_arr, function(add_order_data_arr) {
                        //添加订单成功
                        for (var i = 0; i < add_order_data_arr.length; i++) {
                            var order_data = add_order_data_arr[i];
                            var orderId = order_data.insertId;
                            //添加商品列表
                            var product_sql_list = [];
                            var product = order_list[i];
                            for (var k = 0; k < product.product.length; k++) {
                                var productObj = product.product[k];
                                var product_sql = {};
                                product_sql["UO_ID"] = orderId;
                                product_sql["PL_Name"] = Utils.toSqlString(productObj.productName);
                                product_sql["OL_Number"] = productObj.number;
                                product_sql["OL_Price"] = productObj.price;
                                product_sql["OL_SumMoney"] = productObj.cost;
                                product_sql_list.push(product_sql);
                            }

                            m_db.add_order_product_list(product_sql_list, function() {

                            });
                            packageData = m_resultData.create(CodeConfig.ErrorCode.Success, res_data);
                            m_httpUtils.post_response(res, packageData, tag);
                        }
                    });
                    //添加订单商品

                    //添加佣金订单

                    //更新上级佣金 



                } else {
                    //产品未配置
                }
            });
        }, tagName);
    }
}

//获取订单的商品列表
exports.getOrderProductList = function(req, res) {
    if (req.url == '/getOrderProductList') {
        var tagName = "getOrderProductList";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            if (recvData['orderId']) sql_obj['UO_ID'] = recvData['orderId'];
            sql_obj['UO_State'] = 1;
            m_db.find_order_product_list(sql_obj, function(data) {
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