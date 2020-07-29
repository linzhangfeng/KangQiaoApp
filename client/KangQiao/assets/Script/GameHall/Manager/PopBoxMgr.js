window.PopBoxMgr = {
    rootNode:null,
    rootJs:null,
    init(rootNode){
        this.rootNode = rootNode;
        GUtils.setNodeVis(this.rootNode,true);

        //隐藏所有的弹框
        let userInfoBox = cc.find("UserInfo",this.rootNode);
        GUtils.setNodeVis(userInfoBox,false);
        let changeNameBox = cc.find("ChangeName",this.rootNode);
        GUtils.setNodeVis(changeNameBox,false);
    },
    showUserInfoBox(){
        let box = cc.find("UserInfo",this.rootNode);
        let jsBox = box.getComponent("UserInfoBox");
        jsBox.show();
    },
    hideUserInfoBox(){
        let box = cc.find("UserInfo",this.rootNode);
        let jsBox = box.getComponent("UserInfoBox");
        jsBox.hide();
    },
    showChangeNameBox(){
        let box = cc.find("ChangeName",this.rootNode);
        let jsBox = box.getComponent("ChangeNameBox");
        jsBox.show();
    },
    hideChangeNameBox(){
        let box = cc.find("ChangeName",this.rootNode);
        let jsBox = box.getComponent("ChangeNameBox");
        jsBox.show();
    },
    showUserCenter(type){
        let userCenterLayout = cc.find("UserCenterLayout",this.rootNode);
        let jsUserCenterLayout = userCenterLayout.getComponent("UserCenterPopBox");
        let userInfoLayout = cc.find("UserCenterLayout/UserInfoLayout",this.rootNode);
        let changNameLayout = cc.find("UserCenterLayout/ChangeNameLayout",this.rootNode);
        if(type == PopBoxMgr.UserCenter.None){
            GUtils.setNodeVis(userCenterLayout,false);
            jsUserCenterLayout.
            return;
        }

        GUtils.setNodeVis(userCenterLayout,true);
        GUtils.setNodeVis(userInfoLayout,PopBoxMgr.UserCenter.UserInfo == type);
        GUtils.setNodeVis(changNameLayout,PopBoxMgr.UserCenter.ChangeName == type);
    },

    reset(){

    }
};
PopBoxMgr.UserCenter = {
    None:-1,
    ChangeName:1,
    UserInfo:2,
}