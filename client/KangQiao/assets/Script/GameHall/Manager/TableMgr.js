window.TableMgr = {
    rootNode:null,
    rootJs:null,
    init(rootNode){
        this.rootNode = rootNode;
    },
    showPage(type){
        let homePage = cc.find('HomePageLayer',this.rootNode);
        let OrderPage = cc.find('OrderPageLayer',this.rootNode);
        let UserPage = cc.find('UserPageLayer',this.rootNode);
        let SpreadPage = cc.find('SpreadPageLayer',this.rootNode);
        GUtils.setNodeVis(homePage,PageType.HomePage == type);
        GUtils.setNodeVis(OrderPage,PageType.TradePage == type);
        GUtils.setNodeVis(UserPage,PageType.UserCenterPage == type);
        GUtils.setNodeVis(SpreadPage,PageType.SpreadPage == type);
    },

    reset(){

    }
};