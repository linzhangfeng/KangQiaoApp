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

    initUI: function() {
        cc.log("lin=initUI");
        this.addBtnClick(this.findNode("LoginBtn"));
        let loginLayout = this.findNode("LoginLayout");
        let registerLayout = this.findNode("RegisterLayout");
        GUtils.setNodeVis(loginLayout,false);
        GUtils.setNodeVis(registerLayout,false);

        this.addBtnClick(cc.find("LoginBtn",loginLayout));
        this.addBtnClick(cc.find("ForgetPasswordBtn",loginLayout));
        this.addBtnClick(cc.find("RegisterBtn",loginLayout));

        this.addBtnClick(cc.find("VerificationCodeBtn",registerLayout));
        this.addBtnClick(cc.find("StartRegisterBtn",registerLayout));

        this.showLogin();
    },

    initData: function() {

    },
    btnCallback: function(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
            case 'LoginBtn':
                this.testHttp();
                // this.toGameHall();
                break;
            case 'ForgetPasswordBtn':
                this.toGameHall();
                break;
            case 'RegisterBtn':
                this.showRegister();
                this.hideLogin();
                break;
            case 'VerificationCodeBtn':
                this.toGameHall();
                break;
            case 'StartRegisterBtn':
                this.hideRegister();
                this.showLogin();
                break;
        }
    },
    
    //测试网络接口
    testHttp:function(){
        GHttp.apiurl = "http://localhost:7767/";
        GHttp.sendHttp("getVerifitionCode",{
            phone:"13617313041"
        },function (data) {
            console.log("lin=getVerifitionCode:",JSON.stringify(data));
        },5000);
    },
    toGameHall: function() {
        GSceneMgr.runScene("GameHall_v", true);
    },
    start() {

    },

    showRegister(){
        let registerLayout = this.findNode("RegisterLayout");
        GUtils.setNodeVis(registerLayout,true);

    },
    hideRegister(){
        let registerLayout = this.findNode("RegisterLayout");
        GUtils.setNodeVis(registerLayout,false);
    },
    showLogin(){
        let loginLayout = this.findNode("LoginLayout");
        GUtils.setNodeVis(loginLayout,true);

    },
    hideLogin(){
        let loginLayout = this.findNode("LoginLayout");
        GUtils.setNodeVis(loginLayout,false);
    },
    update(dt) {

    },
});