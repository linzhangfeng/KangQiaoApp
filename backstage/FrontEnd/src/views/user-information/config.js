var OrderStruct = {
    orderId: 0, //订单Id
    userName: '', //用户名称
    createtime: '', //创建时间
    updatetime: '', //更新时间
    money: 0 //消费 
}

var listQuery = {
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

export function packageOrderDetailsData(data) {
    var orderDetailsArr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var packageData = copyObject(OrderStruct);
        packageData.orderId = obj['UO_ID'];
        packageData.userName = obj['UI_Name'];
        packageData.money = obj['UO_Money'];
        packageData.updatetime = new Date(obj['UpdateTime']);
        packageData.createtime = new Date(obj['CreateTime']);
        console.log('lin=packageOrderDetailsData:', packageData.createtime);
        orderDetailsArr.push(packageData);
    }
    return orderDetailsArr;
}