var m_db = require('../../util/db');
var Utils = require('../../util/Utils');


//获取商品信息
exports.checkProductName = function(objectArr, productArr) {
    var productNameArr = [];
    for (var i = 0; i < productArr.length; i++) {
        var name = productArr[i]["PL_Name"];
        productNameArr.push(name);
    }
    for (var i = 0; i < objectArr.length; i++) {
        var orderObject = objectArr[i];
        var productList = orderObject.product;
        for (var k = 0; k < productList.length; k++) {
            var productObject = productList[k];
            var productName = productObject.productName;
            if (productNameArr.indexOf(productName) == -1) {
                return {
                    result: false,
                    productName: productName
                }
            }
        }
    }
    return {
        result: true
    }
}