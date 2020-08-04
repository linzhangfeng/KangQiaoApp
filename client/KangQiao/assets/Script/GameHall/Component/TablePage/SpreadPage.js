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
        listData:[],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initData();
        this.initUI();
    },

    start () {

    },
    initUI(){
        this.removeListView();
    },
    removeListView(){
        let spreadListView = cc.find("OrderListView",this.node);
        let content = cc.find("view/content",spreadListView);
        content.removeAllChildren(true);
    },
    initData(){

    },

    updateUserItem(){
        this.removeListView();
        let self = this;
        for(let i = 0; i < this.listData.length;i++){
            let obj = this.listData[i];
            this.createUserItem(obj);
        }
    },
    pushUserItem(userItem){
        if(!userItem)return;
        let spreadListView = cc.find("OrderListView",this.node);
        let content = cc.find("view/content",spreadListView);
        userItem.parent = content;
    },

    createUserItem(data){
        var self = this;
        cc.loader.loadRes("GameHall/hall/prefab/ChildUserItem", cc.Prefab, function (error, prefab) {
            let nodepr = cc.instantiate(prefab);
            self.pushUserItem(nodepr);
            
        })
    },
    updateScene(){
        let self = this;
        this.getSpreadData(function () {
            self.updateUserItem();
        });
    },
    getSpreadData(success){
        let self = this;
        let playerData = GModel.getPlayerData();
        GHttp.sendHttp("getTeamData",{
            userId:playerData.userId,
        },function (data) {
            console.log("lin=getSpreadData:",JSON.stringify(data));
            if(data.code == 20000){
                self.listData = data.data.list;
                if(success)success();
            }else{
                CommonTipMgr.showTip(data.message);
            }
        },5000);
    },
    // update (dt) {},
});
