var OrderStruct = {
    page: 1,
    limit: 20,
    orderId: undefined, //订单Id
    orderAliasName: undefined, //订单名称
    userName: undefined, //用户名称
    createtime: undefined, //创建时间
    updatetime: undefined, //更新时间
    price: undefined, //成交价格
    number: undefined, //成交数量
    productName: undefined, //商品名称
    money: undefined, //消费 
    commissionState: undefined //佣金状态 
}

var OrderProductStruct = {
    price: undefined, //成交价格
    number: undefined, //成交数量
    productName: undefined, //商品名称
    sumCost: undefined //总消费
}


var CommissionStruct = {
    page: 1,
    limit: 20,
    commissionId: undefined, //佣金Id
    userName: undefined, //用户名称
    orderId: undefined, //订单ID
    commissionType: undefined, //佣金类型
    commissionRatio: undefined, //佣金提成
    commission: undefined, //佣金 
    orderCost: undefined, //订单消费
    createtime: undefined, //创建时间
    updatetime: undefined, //更新时间
    userId: undefined, //用户Id
}

var UserInfoStruct = {
    userId: 0, //用户Id
    nickName: '', //昵称
    userName: '', //用户名称
    parentUserName: '', //上级用户名
    phone: '', //手机
    createtime: '', //创建时间
    updatetime: '', //更新时间
    money: 0, //消费 
    remark: 0, //备注 
}

var listQuery = {
    page: 1,
    limit: 20,
    userName: undefined,
    orderId: undefined,
    sort: '+id'
}

var userInfo = {
        page: 1,
        limit: 20,
        userName: undefined,
        orderId: undefined,
        sort: '+id'
    }
    //拷贝结构体
function copyObject(obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

export function getOrderTestData() {

    var testData = {
        list: [{
            shopName: '肯德基',
            userName: '13666666666',
            sumCost: 40000,
            aliasName: '小乔洗衣粉1*50;小乔牙刷1*50',
            payType: 1,
            isCheck: false,
            product: [{
                    productName: '小乔洗衣粉',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
                {
                    productName: '小乔牙刷',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
            ]
        }, {
            shopName: '麦当劳',
            userName: '13111111111',
            sumCost: 40000,
            aliasName: '小乔洗衣粉1*50;小乔牙刷1*50',
            payType: 1,
            isCheck: false,
            product: [{
                    productName: '小乔洗衣粉',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
                {
                    productName: '小乔牙刷',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
            ]
        }, {
            shopName: '麦当劳',
            userName: '13111111111',
            sumCost: 40000,
            aliasName: '小乔洗衣粉1*50;小乔牙刷1*50',
            payType: 1,
            isCheck: false,
            product: [{
                    productName: '小乔洗衣粉',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
                {
                    productName: '小乔牙刷',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
            ]
        }, {
            shopName: '麦当劳',
            userName: '13111111111',
            sumCost: 40000,
            aliasName: '小乔洗衣粉1*50;小乔牙刷1*50',
            payType: 1,
            isCheck: false,
            product: [{
                    productName: '小乔洗衣粉',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
                {
                    productName: '小乔牙刷',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
            ]
        }, {
            shopName: '麦当劳',
            userName: '13111111111',
            sumCost: 40000,
            aliasName: '小乔洗衣粉1*50;小乔牙刷1*50',
            payType: 1,
            isCheck: false,
            product: [{
                    productName: '小乔洗衣粉',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
                {
                    productName: '小乔牙刷',
                    price: 100,
                    number: 20,
                    cost: 2000
                },
            ]
        }]
    };
    return testData.list;
}

export function getOrderProduct() {
    return copyObject(OrderProductStruct);
}

export function getListData() {
    return listData;
}

export function getOrderStruct() {
    return OrderStruct;
}


export function getCommissionStruct() {
    return copyObject(CommissionStruct);
}

export function packageOrderProductData(data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var packageData = copyObject(OrderProductStruct);
        packageData.productName = obj['productName'];
        packageData.number = obj['OL_Number'];
        packageData.sumCost = obj['OL_SumMoney'];
        packageData.price = obj['OL_Price'];
        arr.push(packageData);
    }
    return arr;
}

export function packageOrderDetailsData(data) {
    var orderDetailsArr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var packageData = copyObject(OrderStruct);
        packageData.orderId = obj['UO_ID'];
        packageData.userName = obj['userName'];
        packageData.orderAliasName = obj['UO_Name'];
        packageData.money = obj['UO_Money'] / 100 + "元";
        packageData.price = obj['UO_Price'] / 100 + "元/个";
        packageData.number = obj['UO_Number'];
        packageData.productName = obj['productName'];
        packageData.commissionState = obj['UO_CommisionState'];
        packageData.updatetime = new Date(obj['UpdateTime']);
        packageData.createtime = new Date(obj['CreateTime']);
        orderDetailsArr.push(packageData);
    }
    return orderDetailsArr;
}

export function packageCommissionData(data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var packageData = copyObject(UserInfoStruct);
        packageData.commissionId = obj['UC_ID'];
        packageData.orderId = obj['UO_ID'];
        packageData.commissionRatio = obj['UL_Ratio'];
        packageData.commissionType = obj['UC_Type'];
        packageData.commission = obj['UC_Commission'];
        packageData.orderCost = obj['UC_CostMoeny'];
        packageData.userName = obj['userName'];
        packageData.userId = obj['UI_ID'];
        packageData.updatetime = new Date(obj['UpdateTime']);
        packageData.createtime = new Date(obj['CreateTime']);
        arr.push(packageData);
    }
    return arr;
}