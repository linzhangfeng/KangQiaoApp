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
        userItemNodeArr:[],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initData();
        this.initUI();
    },

    start () {

    },
    initData(){

    },
    initUI(){
        //隐藏所有的节点
        for(let i = 1; i <= 5;i++){
            let itemNode = cc.find("node" + i,this.node);
            GUtils.setNodeVis(itemNode,false);
            this.userItemNodeArr.push(itemNode);
        }
    },
    setData(dataArr){
        for(let i = 0; i < dataArr.length;i++){
            let node = this.userItemNodeArr[i];
            let itemData = dataArr[i];
            if(node) {
                GUtils.setNodeVis(node,true);
                let textTip = cc.find("TextTip",node);
                let textValue = cc.find("TextValue",node);
                GUtils.setLabelText(textTip,itemData[0]);
                GUtils.setLabelText(textValue,itemData[1]);
            }
        }
    },
    // update (dt) {},
});
