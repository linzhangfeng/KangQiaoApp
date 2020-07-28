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

    onLoad() {
        this._super();
    },
    initData(){
        this.topNode = null;
        this.listenerFinish = null;
    },
    initUI(topNode){
        this.topNode = topNode;
        let backBtn = cc.find("BackBtn",this.topNode);
        let finishBtn = cc.find("FinishBtn",this.topNode);

        GUtils.setNodeVis(finishBtn,false);

        GUtils.addBtnClick(backBtn,function (event) {
            GUtils.setNodeVis(this.node,false);
        }.bind(this));
        GUtils.addBtnClick(finishBtn,function (event) {
            if(this.listenerFinish)this.listenerFinish();
        }.bind(this));
    },
    start() {

    },

    addListenerFinish(listener){
        this.listenerFinish = listener;
        this.setFinishBtnVis(true);
    },
    setFinishBtnVis(v){
        let finishBtn = cc.find("FinishBtn",this.topNode);
        GUtils.setNodeVis(finishBtn,v);
    },

    show(){
        GUtils.setNodeVis(this.rootNode,true);
    },

    hide(){
        GUtils.setNodeVis(this.rootNode,false);
    },

    setTitle(title) {
        let headTitle = cc.find("HeadTitle",this.topNode);
        GUtils.setLabelText(headTitle,title);
    },


    // update (dt) {},
});
