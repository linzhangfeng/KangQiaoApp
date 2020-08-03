window.CommonTipMgr = {
    showTip(text){
        cc.loader.loadRes("Component/CommonTip/Prefab/CommonTip", cc.Prefab, function (error, prefab) {
            let node = cc.instantiate(prefab);
            if (node) {
                let jsNode = node.getComponent("CommonTip");
                // let winSize = cc.director.getWinSize();
                let curScene = cc.director.getScene();
                node.setPosition(cc.winSize.width*0.5,cc.winSize.height*0.5);
                curScene.addChild(node,100000);
                jsNode.setText(text);

                setTimeout(function () {
                    node.parent = null;
                    node.destroy();
                }, 2000);
            }
        })
    }
}