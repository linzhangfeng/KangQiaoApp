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

    onLoad () {
        this.initData();
        this.initUI();
    },

    start () {

    },

    // update (dt) {},

    initData(){

    },

    initUI(){
        this.setRootNode(this.node);
        this.addBtnClick(this.findNode("ContentLayout/UserInfo"));
        this.addBtnClick(this.findNode("ContentLayout/SettingItem"));
    },

    btnCallback: function(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
            case  'UserInfo':
                PopBoxMgr.showUserCenter(PopBoxMgr.UserCenter.UserInfo);
                break;
            case  'SettingItem':
                break;
        }
    },
});
