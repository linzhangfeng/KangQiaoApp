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
        this.setRootNode(this.node);
        this.initData();
        this.initUI();
    },

    start() {

    },

    initUI() {
        this.re
    },

    initData() {

    },
    setData(object) {
        let OrderId = cc.find("OrderId", this.node);
        let Ratio = cc.find("Ratio", this.node);
        let CostMoney = cc.find("CostMoney", this.node);
        let UserName = cc.find("UserName", this.node);
        let Commission = cc.find("Commission", this.node);
        let date = cc.find("Date", this.node);
        GUtils.setLabelText(Commission, '佣金:' + (object["UC_Commission"]/100)+"元");
        GUtils.setLabelText(OrderId, "订单ID:" + object["UC_ID"]);
        GUtils.setLabelText(Ratio, (object["UC_Type"]) +'级佣金('+ (object["UL_Ratio"])+'%)');
        GUtils.setLabelText(CostMoney, '总额:' + (object["UC_CostMoeny"]/100) +"元");
        GUtils.setLabelText(UserName, '用户名:' + object["userName"] );
        GUtils.setLabelText(date, GUtils.timeFormatter(object["CreateTime"]));
    },
    // update (dt) {},
});
