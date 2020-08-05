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
        totleAllCommission:0,
        listData:[],
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.setRootNode(this.node);
        this.initUI();
        this.initData();
    },

    start () {

    },
    initData(){

    },
    initUI(){
        this.removeListView();
    },
    updateScene(){
        this.getCommissionData(function () {
            this.updateCommisstionListUI();
            this.updateTopUI();
        }.bind(this));
    },
    updateCommisstionListUI(){
        this.removeListView();
        for (let i = 0; i < this.listData.length; i++) {
            let obj = this.listData[i];
            this.createUserItem(obj);
        }
    },
    updateTopUI(){
        let sumLabel = cc.find("TotleCommissionText",this.node);
        GUtils.setLabelText(sumLabel,"佣金总额:" + (this.totleAllCommission/100) + "元");

    },
    pushUserItem(userItem) {
        if (!userItem) return;
        let spreadListView = cc.find("CommissionListView", this.node);
        let content = cc.find("view/content", spreadListView);
        userItem.parent = content;
    },

    createUserItem(data) {
        var self = this;
        cc.loader.loadRes("GameHall/hall/prefab/CommissionItem", cc.Prefab, function (error, prefab) {
            let nodepr = cc.instantiate(prefab);
            self.pushUserItem(nodepr);
            let jsNode = nodepr.getComponent("CommissionItem");
            jsNode.setData(data);
        })
    },
    removeListView() {
        let spreadListView = cc.find("CommissionListView", this.node);
        let content = cc.find("view/content", spreadListView);
        content.removeAllChildren(true);
    },
    getCommissionData(success){
        let self = this;
        let playerData = GModel.getPlayerData();
        GHttp.sendHttp("getCommissionList",{
            userId:playerData.userId,
        },function (data) {
            if(data.code == 20000){
                let recv_data = data.data;
                self.listData = recv_data["list"];
                if(recv_data["all_totle_commission"])self.totleAllCommission = recv_data["all_totle_commission"];
                if(success)success();
            }else{
                CommonTipMgr.showTip(data.message);
            }
        },5000);
    },
    // update (dt) {},
});
