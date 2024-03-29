import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/manager_login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/manager_info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/vue-element-admin/user/logout',
        method: 'post'
    })
}

export function checkUser(data) {
    return request({
        url: 'checkUser',
        method: 'post',
        data
    })
}