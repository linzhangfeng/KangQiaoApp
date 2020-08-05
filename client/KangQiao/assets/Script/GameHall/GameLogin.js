// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: GBaseComponent,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setRootNode(this.node);
        this.initUI();
        this.initData();
    },

    initUI: function () {
        cc.log("lin=initUI");
        this.addBtnClick(this.findNode("LoginBtn"));
        let loginLayout = this.findNode("LoginLayout");
        let registerLayout = this.findNode("RegisterLayout");
        GUtils.setNodeVis(loginLayout, false);
        GUtils.setNodeVis(registerLayout, false);

        this.addBtnClick(cc.find("LoginBtn", loginLayout));
        this.addBtnClick(cc.find("ForgetPasswordBtn", loginLayout));
        this.addBtnClick(cc.find("RegisterBtn", loginLayout));

        this.addBtnClick(cc.find("VerificationCodeBtn", registerLayout));
        this.addBtnClick(cc.find("StartRegisterBtn", registerLayout));

        let userData = GModel.getUserLocalStorage();
        let EditPhone = cc.find("LoginLayout/EditPhone", this.node);
        if (userData.username || userData.phone) {
            let username = "";
            if (userData.username != "") username = userData.username;
            if (userData.phone != "") username = userData.phone;
            EditPhone.getComponent(cc.EditBox).string = username
        }
        let EditPassword = cc.find("LoginLayout/EditPassword", this.node);
        if (userData.password) EditPassword.getComponent(cc.EditBox).string = userData.password;

        this.showLogin();
    },

    initData: function () {
        GHttp.apiurl = "http://localhost:7767/";
        GModel.init();
    },
    btnCallback: function (event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
            case 'LoginBtn':
                this.startLogin();
                // this.testHttp();
                // this.toGameHall();
                break;
            case 'ForgetPasswordBtn':
                this.testHttp();
                // this.toGameHall();
                break;
            case 'RegisterBtn':
                this.showRegister();
                this.hideLogin();
                break;
            case 'VerificationCodeBtn':
                this.getVerificationCode();
                break;
            case 'StartRegisterBtn':
                this.startRegister();
                break;
        }
    },

    getVerificationCode() {
        let node = cc.find("RegisterLayout/EditPhone", this.node);
        let phone = node.getComponent(cc.EditBox).string;

        GHttp.sendHttp("getVerifitionCode", {
            phone: phone
        }, function (data) {
            let recv_data = data.data;
            CommonTipMgr.showTip("验证码：" + recv_data["UV_Code"]);
        }, 5000);
    },
    //测试网络接口
    testHttp: function () {

        // CommonTipMgr.showTip("验证码：123456");

        // GHttp.sendHttp("userLogout",{
        //     userId:"871160"
        // },function (data) {
        //     console.log("lin=getVerifitionCode:",JSON.stringify(data));
        // },5000);

        // GHttp.sendHttp("getVerifitionCode",{
        //     phone:"13617313041"
        // },function (data) {
        //     console.log("lin=getVerifitionCode:",JSON.stringify(data));
        // },5000);
        //
        // GHttp.sendHttp("userRegister",{
        //     phone:"13617313041",
        //     verificationCode:"6209",
        //     username:"linzf",
        //     password:"password",
        // },function (data) {
        //     console.log("lin=getVerifitionCode:",JSON.stringify(data));
        // },5000);

        // GHttp.sendHttp("userLogin",{
        //     username:"linzf",
        //     password:"password",
        // },function (data) {
        //     console.log("lin=getVerifitionCode:",JSON.stringify(data));
        // },5000);

        // GHttp.sendHttp("getUserInfo",{
        //     token:"7c6ba7ca42ae7eb35b92845998fa5878",
        // },function (data) {
        //     console.log("lin=getVerifitionCode:",JSON.stringify(data));
        // },5000);

        // GHttp.sendHttp("getTeamData",{
        //     userId:871154,
        // },function (data) {
        //     console.log("lin=getTeamData:",JSON.stringify(data));
        // },5000);

        // GHttp.sendHttp("addParentUser",{
        //     userId:871153,
        //     parentUserId:871150,
        // },function (data) {
        //     console.log("lin=addParentUser:",JSON.stringify(data));
        // },5000);

        // GHttp.sendHttp("getOrderList",{
        //     userId:871153,
        //     parentUserId:871150,
        // },function (data) {
        //     console.log("lin=getOrderList:",JSON.stringify(data));
        // },5000);

        GHttp.sendHttp("getCommissionList",{
            userId:871160,
        },function (data) {
            console.log("lin=getCommissionList:",JSON.stringify(data));
        },5000);
    },


    toGameHall: function () {
        GSceneMgr.runScene("GameHall_v", true);
    },
    start() {

    },

    showRegister() {
        let registerLayout = this.findNode("RegisterLayout");
        GUtils.setNodeVis(registerLayout, true);

    },
    hideRegister() {
        let registerLayout = this.findNode("RegisterLayout");
        GUtils.setNodeVis(registerLayout, false);
    },
    showLogin() {
        let loginLayout = this.findNode("LoginLayout");
        GUtils.setNodeVis(loginLayout, true);

    },
    hideLogin() {
        let loginLayout = this.findNode("LoginLayout");
        GUtils.setNodeVis(loginLayout, false);
    },
    startLogin() {
        let self = this;
        let EditPhone = cc.find("LoginLayout/EditPhone", this.node);
        let phoneStr = EditPhone.getComponent(cc.EditBox).string;
        let EditPassword = cc.find("LoginLayout/EditPassword", this.node);
        let passwordStr = EditPassword.getComponent(cc.EditBox).string;
        let userNameStr = "";
        if (!GUtils.checkMobile(phoneStr)) userNameStr = phoneStr;
        GHttp.sendHttp("userLogin", {
            phone: phoneStr,
            username: userNameStr,
            password: passwordStr,
        }, function (data) {
            if (data.code == 20000) {
                let recv_data = data.data;
                let playerData = GModel.getPlayerData();
                playerData.token = recv_data["token"];
                self.toGameHall();

                GModel.saveUserLocalStorage({
                    phone: phoneStr,
                    username: userNameStr,
                    password: passwordStr,
                });
            } else {
                CommonTipMgr.showTip(data.message);
            }
        }, 5000);
    },
    startRegister() {
        let self = this;
        let EditPhone = cc.find("RegisterLayout/EditPhone", this.node);
        let phoneStr = EditPhone.getComponent(cc.EditBox).string;
        let EditPassword = cc.find("RegisterLayout/EditPassword", this.node);
        let passwordStr = EditPassword.getComponent(cc.EditBox).string;
        let EditTwoPassword = cc.find("RegisterLayout/EditTwoPassword", this.node);
        let twoPasswordStr = EditTwoPassword.getComponent(cc.EditBox).string;
        let EditVerificationCode = cc.find("RegisterLayout/EditVerificationCode", this.node);
        let verificationCodeStr = EditVerificationCode.getComponent(cc.EditBox).string;
        let EditUserName = cc.find("RegisterLayout/EditUserName", this.node);
        let userNameStr = EditUserName.getComponent(cc.EditBox).string;

        //检测两次密码是否一致
        if (passwordStr != twoPasswordStr) {
            CommonTipMgr.showTip("两次密码不一致");
            return;
        }

        GHttp.sendHttp("userRegister", {
            phone: phoneStr,
            verificationCode: verificationCodeStr,
            username: userNameStr,
            password: passwordStr,
        }, function (data) {
            console.log("lin=userRegister:", JSON.stringify(data));
            if (data.code == 20000) {
                CommonTipMgr.showTip("注册成功");
                self.showLogin();
                self.hideRegister();
            }
        }, 5000);
    },
    update(dt) {

    },
});