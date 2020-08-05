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
    extends: cc.Component,

    properties: {
        userItem_Prefab: {
            default: null,        // The default value will be used only when the component attaching
            type: cc.Prefab, // optional, default is typeof default
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        listData: [],
        oneCount:0,
        twoCount:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.initData();
        this.initUI();
    },

    start() {

    },
    initUI() {
        this.removeListView();
    },
    removeListView() {
        let spreadListView = cc.find("OrderListView", this.node);
        let content = cc.find("view/content", spreadListView);
        content.removeAllChildren(true);
    },
    initData() {

    },

    updateUserItem() {
        this.removeListView();
        for (let i = 0; i < this.listData.length; i++) {
            let obj = this.listData[i];
            this.createUserItem(obj);
        }
    },
    updateTopUI(){
        let teamSumNode = cc.find("SpreadInfoLayout/SpriteTitleNode_sum",this.node);
        let sumLabel = cc.find("TitleValueText",teamSumNode);
        GUtils.setLabelText(sumLabel,(this.oneCount + this.twoCount) + "人");

        let teamOneNode = cc.find("SpreadInfoLayout/SpriteTitleNode_one",this.node);
        let oneLabel = cc.find("TitleValueText",teamOneNode);
        GUtils.setLabelText(oneLabel,(this.oneCount) + "人");

        let teamTwoNode = cc.find("SpreadInfoLayout/SpriteTitleNode_two",this.node);
        let twoLabel = cc.find("TitleValueText",teamTwoNode);
        GUtils.setLabelText(twoLabel,(this.twoCount) + "人");

    },
    pushUserItem(userItem) {
        if (!userItem) return;
        let spreadListView = cc.find("OrderListView", this.node);
        let content = cc.find("view/content", spreadListView);
        userItem.parent = content;
    },

    createUserItem(data) {
        var self = this;
        cc.loader.loadRes("GameHall/hall/prefab/ChildUserItem", cc.Prefab, function (error, prefab) {
            let nodepr = cc.instantiate(prefab);
            self.pushUserItem(nodepr);
            let jsNode = nodepr.getComponent("ChildUserItem");
            let itemData = [
                ['用户ID', data.UI_ID],
                ['用户名', data.UserName],
                ['下级人数', data.childCount],
                ['团队贡献', data.team_money == null ? 0 : data.team_money],
                ['用户贡献', data.sum_money == null ? 0 : data.sum_money],
            ];
            jsNode.setData(itemData);
        })
    },
    updateScene() {
        let self = this;
        this.getSpreadData(function () {
            self.updateUserItem();
            self.updateTopUI();
        });
    },
    getSpreadData(success) {
        let self = this;
        let playerData = GModel.getPlayerData();
        GHttp.sendHttp("getTeamData", {
            userId: playerData.userId,
        }, function (data) {
            console.log("lin=getSpreadData:", JSON.stringify(data));
            if (data.code == 20000) {
                let recv_data = data.data;
                self.listData = data.data.list;
                self.oneCount = recv_data.oneCount;
                self.twoCount = recv_data.twoCount;
                if (success) success();
            } else {
                CommonTipMgr.showTip(data.message);
            }
        }, 5000);
    },
    // update (dt) {},
});
