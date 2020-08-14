export default class Utils {
	static copyObject(obj) {
		var newobj = {};
		for (var attr in obj) {
			newobj[attr] = obj[attr];
		}
		return newobj;
	}

	static checkMobile(s) {
		let length = s.length;
		if (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s)) {
			return true;
		} else {
			return false;
		}
	}

	static timeFormatter(value) {
		var da = new Date(parseInt(value.replace("/Date(", "").replace(")/", "").split("+")[0]));
		return da.getFullYear() + "-" + Utils.polish(da.getMonth() + 1, 2) + "-" + Utils.polish(da.getDate(), 2) + " " +
			Utils.polish(da.getHours(), 2) + ":" + Utils.polish(da.getMinutes(), 2) + ":" + Utils.polish(da.getSeconds(), 2);
	}
	
	static polish(num, n) {
		var len = num.toString().length; //num的值转换成字符串并且将它的长度赋值
		while (len < n) { //n是总位数
			num = "0" + num;
			len++;
		}
		return num;
	}
	
	static showToast(title) {
		uni.showToast({
			title: title,
			duration: 2
		});
	}
}
