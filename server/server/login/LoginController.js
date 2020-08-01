var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var ErrorCodeConfig = require('../../util/CommonConfig');
var m_db = require('./DataBaseMgr');
var fs = require('fs');
var m_httpUtils = require('../../util/HttpUtils');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
const { userInfo } = require('os');


//获取用户信息
exports.getUserInfo = function(req, res){
    if (req.url == '/getUserInfo') {
        var tagName = "getUserInfo";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            sql_obj["UI_Token"] =  Utils.toSqlString(recvData['token']);
            //获取用户信息
            m_db.find_user_info_data(sql_obj,function(userInfoData){
                if(userInfoData.length > 0){
                    res_data["userdata"]= userInfoData[0];
                    packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }else{
                    //用户不存在
                    packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.UserInfoNotFound, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }
            });

        }, tagName);
    }
}

//登陆请求
exports.userLogin = function(req, res) {
    if (req.url == '/userLogin') {
        var tagName = "userLogin";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            sql_obj["UA_Name"] =  Utils.toSqlString(recvData['username']);
            //获取用户信息
            m_db.find_login_user_data(sql_obj,function(loginData){
                if(loginData.length > 0){
                    //验证密码
                     if(loginData[0]["UA_Password"] == recvData['password']){
                        //生成一个新的token
                        var token = Utils.createTokens();
                        var token_sql = {};
                        token_sql["UI_Token"] = Utils.toSqlString(token);
                        token_sql["UI_ID"] = loginData[0]["UI_ID"];
                        m_db.update_user_token([token_sql],function(){
                            //返回给用户
                            res_data["token"] = token;
                            packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                            m_httpUtils.post_response(res, packageData, tag);
                        })
                     }else{
                        //密码错误
                        packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.PasswordError, res_data);
                        m_httpUtils.post_response(res, packageData, tag);
                     }
                }else{
                    //用户不存在
                    packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.UserInfoNotFound, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }
            });

        }, tagName);
    }
}

//用户注册
exports.userRegister = function(req, res) {
    if (req.url == '/userRegister') {
        var tagName = "userRegister";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            //1 检测验证码是否过期
            sql_obj['UV_Phone'] = Utils.toSqlString(recvData['phone']);
            m_db.find_verification_code(sql_obj, function(codeData) {
                if (codeData.length > 0 && Utils.isValidVerificationCode(codeData[0]["UpdateTime"])) {
                    //2 检测手机号码是否已经注册
                    sql_obj["UI_Phone"] = Utils.toSqlString(recvData['phone']);
                    sql_obj["UA_Name"] = Utils.toSqlString(recvData['username']);
                    m_db.find_user_info_data(sql_obj, function(userInfoData) {
                        if (userInfoData.length == 0) {
                            m_db.find_user_account_data(sql_obj, function(accountData) {
                                if (accountData.length == 0) {
                                    //4 开始添加用户
                                    var account_sql_obj = {};
                                    account_sql_obj["UA_Password"] = Utils.toSqlString(recvData["password"]);
                                    account_sql_obj["UA_Name"] = Utils.toSqlString(recvData["username"]);
                                    account_sql_obj['CreateTime'] = 'NOW()';
                                    account_sql_obj['UpdateTime'] = 'NOW()';
                                    m_db.add_user_account([account_sql_obj], function(addAccountData) {
                                        //5 生成用户信息
                                        var user_sql_obj = {};
                                        user_sql_obj['UA_ID'] = addAccountData.insertId;
                                        user_sql_obj['UI_Phone'] = Utils.toSqlString(recvData['phone']);
                                        user_sql_obj['UI_NickName'] = Utils.toSqlString(recvData['phone']);
                                        user_sql_obj['CreateTime'] = 'NOW()';
                                        user_sql_obj['UpdateTime'] = 'NOW()';
                                        m_db.add_user_info([user_sql_obj], function(addUserInfo) {
                                            //用户注册成功
                                            packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                                            m_httpUtils.post_response(res, packageData, tag);
                                        });
                                    })
                                } else {
                                    //3 检测用户名是否已注册
                                    packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.UserNameHasExist, res_data);
                                    m_httpUtils.post_response(res, packageData, tag);
                                }
                            })
                        } else {
                            //手机号已经被注册
                            packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.PhoneHasExist, res_data);
                            m_httpUtils.post_response(res, packageData, tag);
                        }
                    });
                } else {
                    //验证码已过期
                    packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.VerificationOverDue, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }
            });
        }, tagName);
    }
}

//获取验证码
exports.getVerifitionCode = function(req, res) {

    if (req.url == '/getVerifitionCode') {
        var tagName = "getVerifitionCode";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            var packageData = null;
            sql_obj['UV_Phone'] = Utils.toSqlString(recvData['phone']);
            m_db.find_verification_code(sql_obj, function(codeData) {
                if (codeData.length == 0) {
                    var code = Utils.createVerificationCode();
                    sql_obj['UV_Code'] = Utils.toSqlString(code);
                    sql_obj["CreateTime"] = 'NOW()';
                    sql_obj["UpdateTime"] = 'NOW()';
                    m_db.add_verification_code([sql_obj], function() {
                        res_data["UV_Code"] = code
                        packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                        m_httpUtils.get_response(res, packageData, tag);
                    })
                } else {
                    // 判断验证码是否过期
                    if (Utils.isValidVerificationCode(codeData[0]["UpdateTime"])) {
                        var code = Utils.createVerificationCode();
                        sql_obj['UV_Code'] = Utils.toSqlString(code);
                        sql_obj['UV_ID'] = codeData[0]["UV_ID"];
                        sql_obj["UpdateTime"] = 'NOW()';
                        m_db.update_verification_code([sql_obj], function() {
                            res_data["UV_Code"] = code
                            packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                            m_httpUtils.get_response(res, packageData, tag);
                        })
                    } else {
                        res_data["UV_Code"] = codeData[0]["UV_Code"];
                        packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                        m_httpUtils.get_response(res, packageData, tag);
                    }
                }
            }, function() {
                sendData = m_resultData.create(ErrorCodeConfig.ErrorCode.FindUserInfoError, res_data);
                m_httpUtils.post_response(res, sendData, tag);
            });

        }, tagName);
    }


    if (true) {
        //生成一个新的验证码

        //存入数据库

        //把验证码返回给客户端
    } else {
        //把验证码返回给客户客户端
    }

}

exports.user_info = function(req, res) {
    //获取管理员用户ID
    var sql_obj = {};
    var res_data = {};
    var packageData = null;
    var tagName = "manager_info";
    m_httpUtils.get_receive(req, function(recvData, tag) {
        sql_obj['SA_Token'] = Utils.toSqlString(recvData['token']);

        // var userData = userDataArr[0];
        res_data['roles'] = ['admin', 'editor'];
        res_data['introduction'] = 'introduction';
        res_data['name'] = 'name';
        res_data['avatar'] = 'avatar';
        packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
        m_httpUtils.get_response(res, packageData, tag);
    }, tagName);
}