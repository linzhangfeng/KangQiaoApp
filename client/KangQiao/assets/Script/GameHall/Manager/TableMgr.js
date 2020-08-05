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
        let CommissionPage = cc.find('CommissionPageLayer',this.rootNode);
        GUtils.setNodeVis(homePage,PageType.HomePage == type);
        GUtils.setNodeVis(OrderPage,PageType.TradePage == type);
        GUtils.setNodeVis(UserPage,PageType.UserCenterPage == type);
        GUtils.setNodeVis(SpreadPage,PageType.SpreadPage == type);
        GUtils.setNodeVis(CommissionPage,PageType.Commission == type);

        if(TableMgr.getPageJs(type).updateScene)TableMgr.getPageJs(type).updateScene();
    },

    getPageJs(type){
        let homePage = cc.find('HomePageLayer',this.rootNode);
        let OrderPage = cc.find('OrderPageLayer',this.rootNode);
        let UserPage = cc.find('UserPageLayer',this.rootNode);
        let SpreadPage = cc.find('SpreadPageLayer',this.rootNode);
        let CommissionPage = cc.find('CommissionPageLayer',this.rootNode);
        if(PageType.HomePage == type){
            return homePage.getComponent("HomePage");
        }
        if(PageType.TradePage == type){
            return OrderPage.getComponent("TradePage");
        }
        if(PageType.UserCenterPage == type){
            return UserPage.getComponent("UserCenterPage");
        }
        if(PageType.SpreadPage == type){
            return SpreadPage.getComponent("SpreadPage");
        }
        if(PageType.Commission == type){
            return CommissionPage.getComponent("Commission");
        }
        return null;
    },
    reset(){

    }
};