import request from '@/utils/request'

export function getCommissionList(data) {
    return request({
        url: '/getCommissionList',
        method: 'post',
        data
    })
}

export function getOrderProductList(data) {
    return request({
        url: '/getOrderProductList',
        method: 'post',
        data
    })
}
export function fastAddOrder(data) {
    return request({
        url: '/fastAddOrder',
        method: 'post',
        data
    })
}