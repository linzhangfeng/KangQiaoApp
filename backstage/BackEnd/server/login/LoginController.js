var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var ErrorCodeConfig = require('../../util/CommonConfig');
var m_db = require('./DataBaseMgr');
var fs = require('fs');
var m_httpUtils = require('../../util/HttpUtils');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');


//查看操作日记
exports.manager_login = function(req, res) {
    if (req.url == '/manager_login') {
        var tagName = "manager_login";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            //验证用户
            var sql_obj = {};
            var res_data = {};
            sql_obj['SA_Account'] = Utils.toSqlString(recvData['username']);
            m_db.find_user_data(sql_obj, function(userDataArr) {
                var sendData = null;
                var userData = userDataArr[0];
                if (userData && userData['SA_Password'] == recvData['password']) {
                    res_data['token'] = userData['SA_Token'];
                    sendData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                } else {
                    sendData = m_resultData.create(ErrorCodeConfig.ErrorCode.UsernameError, res_data);
                }
                m_httpUtils.post_response(res, res_data, tag);
            }, function() {
                sendData = m_resultData.create(ErrorCodeConfig.ErrorCode.FindUserInfoError, res_data);
                m_httpUtils.post_response(res, res_data, tag);
            });

        }, tagName);
    }
}