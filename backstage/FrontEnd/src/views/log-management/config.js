var LogCommissionStruct = {
    page: 1,
    limit: 20,
    logCommissionId: undefined, //佣金Id
    userId: undefined, //用户Id
    commissionId: undefined, //佣金Id
    userName: undefined, //用户名称
    orderId: undefined, //订单ID
    logType: undefined, //佣金类型
    oldMoney: undefined, //更新前佣金
    newMoney: undefined, //更新后佣金
    commission: undefined, //佣金 
    createtime: undefined, //创建时间
    updatetime: undefined, //更新时间
}



//拷贝结构体
function copyObject(obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

export function getLogCommissionStruct() {
    return copyObject(LogCommissionStruct);
}

export function packageLogCommissionData(data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var packageData = copyObject(LogCommissionStruct);
        packageData.logCommissionId = obj['SC_ID'];
        packageData.orderId = obj['UO_ID'];
        packageData.newMoney = obj['SC_New_Money'];
        if (obj['SC_Type'] == 1) {
            packageData.logType = '订单';
        } else if (obj['SC_Type'] == 2) {
            packageData.logType = '提取';
        } else {
            packageData.logType = '未知';
        }
        packageData.commission = obj['SC_New_Money'] - obj['SC_Old_Money'];
        packageData.commissionId = obj['UC_ID'];
        packageData.oldMoney = obj['SC_Old_Money'];
        packageData.userName = obj['userName'];
        packageData.userId = obj['UI_ID'];
        packageData.orderId = obj['UO_ID'];
        packageData.updatetime = new Date(obj['UpdateTime']);
        packageData.createtime = new Date(obj['CreateTime']);
        arr.push(packageData);
    }
    return arr;
}