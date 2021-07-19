var PlayerData = {
	userName: '',
	nickName: '',
	token: '',
	money: 0,
	userId: 0,
	phone: "",
	parentId: 0,
	parentNickName: "",
	parentUserName: "",
	reset() {
		this.userId = 0;
		this.nickName = "";
		this.token = "";
		this.userName = "";
		this.phone = "";
		this.money = 0;
		this.parentId = 0;
		this.parentNickName = "";
		this.parentUserName = "";
	}
}
import Utils from "@/public/Utils.js"
export default class Model {
	static playerData = null;			//用户数据
	static isLogin = false;				//用户是否已经登录
	static init() {
		this.playerData = Utils.copyObject(PlayerData);
	}

	static getPlayerData() {
		return this.playerData;
	}
	
	static reset() {
		this.playerData.reset();
	}
}
