// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let BasePopBox = require("BaseBox");
cc.Class({
    extends: BasePopBox,

    properties: {
        tag:"SettingBox",
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

    onLoad () {
        console.log("lin=onLoad:"+ this.tag);
    },

    start () {
        console.log("lin=start:"+ this.tag);
        this.initData();
        this.initUI();
    },

    initData(){
        // this._super();

    },
    initUI(){
        let self = this;
        this.setRootNode(this.node);
        let headNode = this.findNode("PopHead");
        this._super(headNode);

        // this.addListenerFinish(function () {
        //
        // }.bind(this));

        let userInfoItem = this.findNode("ContentLayout/UserInfoItem_1");
        GUtils.addBtnClick(userInfoItem,function () {
           PopBoxMgr.showChangeNameBox();
        })

        let logoutBtn = this.findNode("ContentLayout/LogoutBtn");
        GUtils.addBtnClick(logoutBtn,function () {
            self.logout();
        })
    },

    logout(){
        let playerData = GModel.getPlayerData();
        GHttp.sendHttp("userLogout",{
            userId:playerData.userId
        },function (data) {
            if(data.code == 20000){
                //重置数据
                GModel.reset();

                //回到登录界面
                GPlatform.toLogin();
            }
        },5000);
    },
    // update (dt) {},
});
