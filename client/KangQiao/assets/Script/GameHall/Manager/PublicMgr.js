window.PublicMgr = {
    tag: "PublicMgr",
    rootNode: null,
    rootJs: null,
    init(rootNode) {
        this.rootNode = rootNode;

        //添加按钮监听
        for (let key in PageType) {
            let nodeName = 'BottomNode/Button_' + PageType[key];
            GUtils.addBtnClick(cc.find(nodeName, this.rootNode),this.btnCallback.bind(this));
        }

    },
    btnCallback(event) {
        cc.log("btnCallback:", event.node.name);
        let btnName = event.node.name;
        if (btnName.indexOf("Button_") != -1) {
            let nameArr = btnName.split('_');
            TableMgr.showPage(parseInt(nameArr[1]));
            this.setTitleName(PageName[nameArr[1]]);
        }
    },

    setTitleName(titleName){
        let titleLabel = cc.find("HeadNode/Title",this.rootNode);
        GUtils.setLabelText(titleLabel,titleName);
    },

    reset() {

    }
};