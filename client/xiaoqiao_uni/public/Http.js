import Utils from './Utils.js'
export default class Http {
	// static baseUrl = 'http://localhost:7767/';
	static baseUrl = 'http://119.23.221.227:7767/';
	static sendHttp(path, method, data, success, failure) {
		console.log(path + '  http_req_data:',data);
		let url = this.baseUrl + path;
		uni.request({
			url: url,
			data: data,
			method: method,
			success: function(res) {
				console.log(path + '  http_recv_data:',res);
				if (res.code == 9999 || res.data.code == 9999) {
						uni.redirectTo({
							url: '/pages/auth/login'
						});
				}else{
					typeof success == 'function' && success(res.data);
				}
			},
			fail: function() {
				Utils.showToast('网络请求异常');
			}
		})
	}
	
	static get(path, data, success, failure) {
		this.sendHttp(path, 'GET', data, success, failure);
	}
	
	static post(path, data, success, failure) {
		this.sendHttp(path, 'POST', data, success, failure);
	}
}