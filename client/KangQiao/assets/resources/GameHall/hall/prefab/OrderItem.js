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

    },

    start() {

    },

    initUI() {

    },

    initData() {

    },
    setData(object) {
        let orderName = cc.find("OrderName", this.node);
        let orderID = cc.find("OrderID", this.node);
        let number = cc.find("Number", this.node);
        let unitPrice = cc.find("UnitPrice", this.node);
        let money = cc.find("Money", this.node);
        let date = cc.find("Date", this.node);
        GUtils.setLabelText(orderName, object["PL_Name"]);
        GUtils.setLabelText(orderID, "订单ID:" + object["UO_ID"]);
        GUtils.setLabelText(number, '数量:' + object["UO_Number"]);
        GUtils.setLabelText(unitPrice, '单价:' + (object["PL_Price"]/100) +"元/个");
        GUtils.setLabelText(money, '总价:' + object["sum_money"] + "元");
        GUtils.setLabelText(date, GUtils.timeFormatter(object["CreateTime"]));
    },
    // update (dt) {},
});
