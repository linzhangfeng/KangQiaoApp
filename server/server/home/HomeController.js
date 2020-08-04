var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var ErrorCodeConfig = require('../../util/CommonConfig');
var m_db = require('./DataBaseMgr');
var fs = require('fs');
var m_httpUtils = require('../../util/HttpUtils');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
const { userInfo } = require('os');

//添加推介人
exports.addParentUser = function(req, res) {
    if (req.url == '/addParentUser') {
        var tagName = "addParentUser";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            var sql_obj = {};
            var res_data = {};
            var packageData = null;

            if (recvData['userId'] && recvData['userId'] != 0) sql_obj["UI_ID"] = recvData['userId'];
            if (recvData['parentUserId'] && recvData['parentUserId'] != 0) sql_obj["UI_ParentID"] = recvData['parentUserId'];

            m_db.find_parent_user_info(sql_obj, function(parent_user) {
                if (parent_user.length > 0) {
                    if (parent_user[0]["UI_ParentID"] != 0) {
                        packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.ParentHasAdd, res_data);
                        m_httpUtils.post_response(res, packageData, tag);
                        return;
                    }
                    //获取上级用户信息
                    m_db.update_parent_user_info([sql_obj], function(data) {
                        res_data["parent_user"] = parent_user[0];
                        packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                        m_httpUtils.post_response(res, packageData, tag);
                    });
                } else {
                    packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.ParentUserNotExist, res_data);
                    m_httpUtils.post_response(res, packageData, tag);
                }
            });
        }, tagName);
    }
}