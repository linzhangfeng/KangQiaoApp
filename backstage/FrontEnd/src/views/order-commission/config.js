var OrderStruct = {
    orderId: undefined, //订单Id
    userName: undefined, //用户名称
    createtime: undefined, //创建时间
    updatetime: undefined, //更新时间
    price: undefined, //成交价格
    number: undefined, //成交数量
    productName: undefined, //商品名称
    money: undefined //消费 
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

export function getListData() {
    return listData;
}

export function getOrderStruct() {
    return OrderStruct;
}

export function packageOrderDetailsData(data) {
    var orderDetailsArr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var packageData = copyObject(OrderStruct);
        packageData.orderId = obj['UO_ID'];
        packageData.userName = obj['userName'];
        packageData.money = obj['UO_Money'] / 100 + "元";
        packageData.price = obj['UO_Price'] / 100 + "元/个";
        packageData.number = obj['UO_Number'];
        packageData.productName = obj['productName'];
        packageData.updatetime = new Date(obj['UpdateTime']);
        packageData.createtime = new Date(obj['CreateTime']);
        console.log('lin=packageOrderDetailsData:', packageData.createtime);
        orderDetailsArr.push(packageData);
    }
    return orderDetailsArr;
}

export function packageUserInfoData(data) {
    var userInfoArr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var packageData = copyObject(UserInfoStruct);
        packageData.userId = obj['UI_ID'];
        packageData.nickName = obj['UI_NickName'];
        packageData.money = obj['UI_Gold'];
        packageData.userName = obj['UA_Name'];
        packageData.phone = obj['UI_Phone'];
        packageData.parentUserName = obj['Parent_UserName'];
        packageData.parentNickName = obj['Parent_NickName'];
        packageData.updatetime = new Date(obj['UpdateTime']);
        packageData.createtime = new Date(obj['CreateTime']);
        userInfoArr.push(packageData);
    }
    return userInfoArr;
}