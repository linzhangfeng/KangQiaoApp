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
        // this._super();
    },

    start () {

    },

    initData(){
        // this._super();
    },

    initUI(){
        let self = this;
        this.setRootNode(this.node);
        let headNode = this.findNode("PopHead");
        this._super(headNode);
        this.addListenerFinish(function () {
            self.addParent();
        }.bind(this));
        this.setTitle("添加推介人");
    },

    addParent(){
        let playerData = GModel.getPlayerData();
        let EditParentID = cc.find("ContentLayout/EditParentID", this.node);
        let parentIDStr = EditParentID.getComponent(cc.EditBox).string;

        if(parentIDStr.length < 4){
            CommonTipMgr.showTip("格式错误");
            return;
        }
        GHttp.sendHttp("addParentUser",{
            userId:playerData.userId,
            parentUserId:parentIDStr,
        },function (data) {
            if(data.code == 20000){
                let parentData = data.data.parent_user;
                playerData.parentId = parentData["UI_ID"];
                playerData.parentNickName = parentData["UI_NickName"];
                playerData.parentUserName = parentData["UA_Name"];
                TableMgr.getPageJs(PageType.HomePage).updateScene();
                CommonTipMgr.showTip("添加成功");
                PopBoxMgr.hideSettingParent();
            }

        },5000);
    },
    // update (dt) {},
});
