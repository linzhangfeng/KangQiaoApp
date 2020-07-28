var HeadMgr = {
    rootNode: null,
    init(rootNode) {
        this.rootNode = rootNode;
        this.rootJs = node.getComponents("Head");
    },
    updateInfo(playerData) {
        this.rootJs.setName(playerData.name);
        this.rootJs.setMoney(playerData.money);
    }
}