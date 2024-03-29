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
        tag:"GameHall",
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
        console.log("lin=onLoad:"+this.tag);
    },
    initUI: function () {
        this.setRootNode(this.node);
        let popLayer = this.findNode("PopLayer");
        PopBoxMgr.init(popLayer);

        let tableLayer = this.findNode("TableLayer");
        TableMgr.init(tableLayer);

        let publicLayer = this.findNode("PublicLayer");
        PublicMgr.init(publicLayer);

        this.addBtnClick(this.findNode("EnterGameBtn"));

        TableMgr.showPage(PageType.HomePage);
    },


    btnCallback: function (event) {
        cc.log("btnCallback:", event.node.name);
        switch (event.node.name) {
            case  'EnterGameBtn':
                this.toGameRoom();
                break;
        }
    },
    initData: function () {
        this.getUserInfo(function () {
            TableMgr.getPageJs(PageType.HomePage).updateScene();
        });
    },

    start() {
        console.log("lin=start:"+this.tag);
        this.setRootNode(this.node);
        this.initUI();
        this.initData();
    },

    update(dt) {

    },

    getUserInfo(success){
        let playerData = GModel.getPlayerData();
        GHttp.sendHttp("getUserInfo",{
            token:playerData.token,
        },function (data) {
            if(data.code == 20000){
                let recv_data = data.data;
                let userData = recv_data["userdata"];
                playerData.nickName = userData["UI_NickName"];
                playerData.userName = userData["UA_Name"];
                playerData.userId = userData["UI_ID"];
                playerData.money = userData["UI_Gold"];
                playerData.phone = userData["UI_Phone"];
                playerData.parentNickName = userData["Parent_NickName"];
                playerData.parentUserName = userData["Parent_UserName"];
                playerData.parentId = userData["Parent_ID"];
                playerData = GModel.getPlayerData();
                if(success)success();
            }
        },5000);
    },

    toGameRoom:function () {
        GSceneMgr.runScene("LaoHuJi");
    }
});
