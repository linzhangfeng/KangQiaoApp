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
        this.setRootNode(this.node);
    },

    start () {

    },

    initData(){

    },

    initUI(){
        let playerData = GModel.getPlayerData();
        let parentId = playerData.parentId;
        let parentInfo = this.findNode("ParentNode/ParentInfo");
        let addParentBtn = this.findNode("ParentNode/AddParentBtn");
        GUtils.addBtnClick(addParentBtn,function () {
            PopBoxMgr.showSettingParent();
        })
        if(parentId){
            GUtils.setNodeVis(parentInfo,true);
            GUtils.setNodeVis(addParentBtn,false);
            let itemLabel1 = cc.find("Item1/text",parentInfo);
            GUtils.setLabelText(itemLabel1,playerData.parentId)
            let itemLabel2 = cc.find("Item2/text",parentInfo);
            GUtils.setLabelText(itemLabel2,playerData.parentUserName)
            let itemLabel3 = cc.find("Item3/text",parentInfo);
            GUtils.setLabelText(itemLabel3,playerData.parentNickName)
        }else{
            GUtils.setNodeVis(parentInfo,false);
            GUtils.setNodeVis(addParentBtn,true);
        }
    },
    updateScene(){
        //重新获取数据
        this.initUI();
    },
    // update (dt) {},
});
