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
        listData:[],
        totleAllMoney:0,
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
        this.getTradeData(function () {
            this.updateOrderListUI();
            this.updateTopUI();
        }.bind(this));
    },
    updateOrderListUI(){
        this.removeListView();
        for (let i = 0; i < this.listData.length; i++) {
            let obj = this.listData[i];
            this.createUserItem(obj);
        }
    },
    updateTopUI(){
        let sumLabel = cc.find("TotleCostText",this.node);
        GUtils.setLabelText(sumLabel,"消费总额:" + (this.totleAllMoney) + "元");

    },
    pushUserItem(userItem) {
        if (!userItem) return;
        let spreadListView = cc.find("OrderListView", this.node);
        let content = cc.find("view/content", spreadListView);
        userItem.parent = content;
    },

    createUserItem(data) {
        var self = this;
        cc.loader.loadRes("GameHall/hall/prefab/OrderItem", cc.Prefab, function (error, prefab) {
            let nodepr = cc.instantiate(prefab);
            self.pushUserItem(nodepr);
            let jsNode = nodepr.getComponent("OrderItem");
            jsNode.setData(data);
        })
    },
    removeListView() {
        let spreadListView = cc.find("OrderListView", this.node);
        let content = cc.find("view/content", spreadListView);
        content.removeAllChildren(true);
    },
    getTradeData(success){
        let self = this;
        let playerData = GModel.getPlayerData();
        GHttp.sendHttp("getOrderList",{
            userId:playerData.userId,
        },function (data) {
            if(data.code == 20000){
                let recv_data = data.data;
                self.listData = recv_data["list"];
                if(recv_data["all_totle_money"])self.totleAllMoney = recv_data["all_totle_money"];
                if(success)success();
            }else{
                CommonTipMgr.showTip(data.message);
            }
        },5000);
    },
    // update (dt) {},
});
