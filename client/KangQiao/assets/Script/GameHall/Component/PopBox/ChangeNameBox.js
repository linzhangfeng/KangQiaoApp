// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
let BasePopBox = require("BasePopBox");
cc.Class({
    extends: BasePopBox,

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

    onLoad () {
        this.initData();
        this.initUI();
        this._super();
    },

    start () {

    },

    initData(){
        this._super();

    },
    initUI(){
        this.setRootNode(this.node);
        let headNode = this.findNode("UserCenterHead");
        this._super(headNode);
        this.addListenerFinish(function () {
            PopBoxMgr.showUserCenter(PopBoxMgr.UserCenter.None);
        }.bind(this));

        let userInfoItem_1 = this.findNode("UserInfoLayout/UserInfoItem_1");
        GUtils.addBtnClick(userInfoItem_1,function () {
            PopBoxMgr.showUserCenter(PopBoxMgr.UserCenter.ChangeName);
        })
    },

    // update (dt) {},
});
