<script>
import Http from '@/public/Http.js'
import Model from '@/public/Model.js'
export default {
	onLaunch: function() {
		console.log('App Launch');
        Model.init();
		// uni.redirectTo({
		// 	url: '/pages/auth/loginMethod'
		// });
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
	/*每个页面公共css */
	@import url("assets/css/layout.css");
	@import url("assets/css/reset.css");
	@import url("assets/fonts/iconfont.css");
</style>
