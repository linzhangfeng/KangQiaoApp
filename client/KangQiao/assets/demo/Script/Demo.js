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
        this.initData();
        this.initUI();
    },

    initData: function() {

    },
    initUI: function() {
        this.setRootNode(this.node);
        this.addBtnClick(this.findNode("public/head/huodong_btn"));
        this.addBtnClick(this.findNode("public/head/wodetuiguang_btn"));
        this.addBtnClick(this.findNode("tuiguang/head/tuiguang_btn"));
        this.addBtnClick(this.findNode("tuiguang/head/zhishu_btn"));
        this.addBtnClick(this.findNode("tuiguang/head/yeji_btn"));

        this.setTuiGuangNodeVis(false);
    },
    start() {

    },
    btnCallback: function(event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
            case 'huodong_btn':
                this.setTuiGuangNodeVis(false);
                break;
            case 'wodetuiguang_btn':
                this.showTuiGuang(3);
                break;
            case 'tuiguang_btn':
                this.showTuiGuang(3);
                break;
            case 'zhishu_btn':
                this.showTuiGuang(1);
                break;
            case 'yeji_btn':
                this.showTuiGuang(2);
                break;
        }
    },

    //type 1:直属查询  2：业绩查询 3：我的推广
    showTuiGuang: function(type) {
        this.setTuiGuangNodeVis(true);
        let zhishuchaxun = this.findNode("tuiguang/zhishuchaxun");
        let yejichaxun = this.findNode("tuiguang/yejichaxun");
        let wodetuiguang = this.findNode("tuiguang/wodetuiguang");

        if (type == 1) {
            GUtils.setNodeVis(zhishuchaxun, true);
            GUtils.setNodeVis(yejichaxun, false);
            GUtils.setNodeVis(wodetuiguang, false);
        } else if (type == 2) {
            GUtils.setNodeVis(zhishuchaxun, false);
            GUtils.setNodeVis(yejichaxun, true);
            GUtils.setNodeVis(wodetuiguang, false);
        } else if (type == 3) {
            GUtils.setNodeVis(zhishuchaxun, false);
            GUtils.setNodeVis(yejichaxun, false);
            GUtils.setNodeVis(wodetuiguang, true);
        }
    },

    setTuiGuangNodeVis: function(v) {
        let tuiguangNode = this.findNode("tuiguang");
        GUtils.setNodeVis(tuiguangNode, v);
    },

    // update (dt) {},
});