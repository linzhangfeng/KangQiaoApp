import Utils from './Utils.js'
export default class Platform {
	static goLogin(){
		uni.navigateTo({
			url: '/pages/auth/login'
		})
	}
	static goAddParentUser(){
		uni.navigateTo({
			url: '/pages/home/AddParentUser'
		})
	}
}