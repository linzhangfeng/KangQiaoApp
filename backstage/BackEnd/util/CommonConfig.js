var OperatorType = {
    Login: 1, //登录
    GetDictype: 2, //获取字典类型
    LogManager: 3, //获取日记类型
}

var ErrorCode = {
    Success: 20000,
    UsernameError: 300,
    PasswordError: 301,
    FindUserInfoError: 302,
    FindOrderDetailsError: 303,
    UserInfoNotFound: 304,
    UpdateDetailsError: 305,
}

var ErrorCodeMsg = {
    '20000': '处理成功',
    '300': '用户名输入错误',
    '301': '密码输入错误',
    '302': '用户信息查找错误',
    '303': '获取订单详情错误',
    '304': '用户信息不存在',
    '305': '更新订单失败',
}
exports.ErrorCodeMsg = ErrorCodeMsg;
exports.ErrorCode = ErrorCode;