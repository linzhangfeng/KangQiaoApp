window.PopBoxMgr = {
    rootNode:null,
    rootJs:null,
    init(rootNode){
        this.rootNode = rootNode;
        GUtils.setNodeVis(this.rootNode,true);
        this.showUserCenter(PopBoxMgr.UserCenter.None);

        //隐藏所有的弹框
        let userInfoBox = cc.find("UserInfo",this.rootNode);
        GUtils.setNodeVis(userInfoBox,false);
        let changeName = cc.find("ChangeName",this.rootNode);
        GUtils.setNodeVis(changeName,false);
    },

    showUserInfoBox(){
        let userInfoBox = cc.find("UserInfo",this.rootNode);
        let jsUserInfoBox = userInfoBox.getComponent("UserInfoBox");
    },
    hideUserInfoBox(){
        let userInfoBox = cc.find("UserInfo",this.rootNode);
        let jsUserInfoBox = userInfoBox.getComponent("UserInfoBox");
    },
    showChangeNameBox(){
        let userInfoBox = cc.find("ChangeName",this.rootNode);
        let jsUserInfoBox = userInfoBox.getComponent("ChangeNameBox");
    },
    hideChangeNameBox(){
        let userInfoBox = cc.find("ChangeName",this.rootNode);
        let jsUserInfoBox = userInfoBox.getComponent("ChangeNameBox");
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