import request from '@/utils/request'

export function getLogCommissionList(data) {
    return request({
        url: '/getLogCommissionList',
        method: 'post',
        data
    })
}