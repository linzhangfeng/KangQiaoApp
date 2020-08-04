var m_resultData = require('../../util/ResultDataUtils');
var Utils = require('../../util/Utils');
var ErrorCodeConfig = require('../../util/CommonConfig');
var m_db = require('./DataBaseMgr');
var fs = require('fs');
var m_httpUtils = require('../../util/HttpUtils');
var fd = require("formidable"); //载入 formidable
var compressing = require('compressing');
const { userInfo } = require('os');

//获取团队用户数据
exports.getTeamData = function(req, res) {
    if (req.url == '/getTeamData') {
        var tagName = "getTeamData";
        m_httpUtils.post_receive(req, function(recvData, tag) {
            var sql_obj = {};
            var res_data = {};
            var packageData = null;

            if (recvData['userId'] && recvData['userId'] != 0) sql_obj["UI_ID"] = Utils.toSqlString(recvData['userId']);
            //获取团队信息
            m_db.find_user_team_data(sql_obj, function(teamData) {
                res_data["list"] = teamData;
                packageData = m_resultData.create(ErrorCodeConfig.ErrorCode.Success, res_data);
                m_httpUtils.post_response(res, packageData, tag);
            });

        }, tagName);
    }
};