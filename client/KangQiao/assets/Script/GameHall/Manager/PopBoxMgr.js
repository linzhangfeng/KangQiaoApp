window.PopBoxMgr = {
    rootNode:null,
    rootJs:null,
    init(rootNode){
        this.rootNode = rootNode;
        GUtils.setNodeVis(this.rootNode,true);
        this.showUserCenter(PopBoxMgr.UserCenter.None);
    },

    showUserCenter(type){
        let userCenterLayout = cc.find("UserCenterLayout",this.rootNode);
        let userInfoLayout = cc.find("UserCenterLayout/UserInfoLayout",this.rootNode);
        let changNameLayout = cc.find("UserCenterLayout/ChangeNameLayout",this.rootNode);
        if(type == PopBoxMgr.UserCenter.None){
            GUtils.setNodeVis(userCenterLayout,false);
            GUtils.setNodeVis(userInfoLayout,false);
            GUtils.setNodeVis(changNameLayout,false);
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