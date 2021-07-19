<template>
	<view class="uni__container flexbox flex_col auth">
		<view class="top-back-box">
			<text class="iconfont icon-arrL" @tap="goLoginMethod()"></text>
		</view>
		<view>
			<view>				
				<view class="login-avatar">
					<view class="ava-box">
						<image src="../../static/logo/lgoin-logo.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="reg-forms">
					<form @submit.prevent="handleSubmit">
						<view class="login-ipt-box flexbox flex_alignc">			
							<input class="login-ipt flex1" type="text" v-model="formObj.tel" placeholder="请输入手机号" placeholder-style="color:#45ace7" maxlength="11" />
						</view>
						
						<view class="login-ipt-box flexbox flex_alignc">						
							<input class="login-ipt flex1" type="text" password="true" v-model="formObj.pwd" placeholder="请输入密码" placeholder-style="color:#45ace7" />
						</view>
				
						<view class="login-ipt-box flexbox flex_alignc">
							<input class="login-ipt flex1" type="text" password="true" v-model="formObj.pwdcf" placeholder="请确认密码" placeholder-style="color:#45ace7" />
						</view>
						
						<view class="login-ipt-box flexbox flex_alignc">
							<input class="login-ipt flex1" type="text" v-model="formObj.vcode" placeholder="输入验证码" placeholder-style="color:#45ace7"  @input="handerVcodeInput"/>
							<button class="getvcode" @click.prevent="handleVcode" :disabled="disabled">{{vcodeText}}</button>
						</view>
						
						<view class="login-btn-box">
							<button :disabled="disabled" class="login-btn" form-type="submit">注册</button>
						</view>
										
						<view class="fgt-pw-box">
							<navigator class="navigator" url="/pages/auth/login">已有账号，去登录</navigator>
						</view>
					</form>
				</view>
			</view>
			
		</view>
		
		<uni-pop ref="uniPop"></uni-pop>
	</view>
</template>

<script>
	import util from '../../utils/util.js'
	import md5 from '../../static/js/md5.js'
	import config from'../../config.js'
	export default {
		data() {
			return {
				formObj: {
					tel:'',
					pwd:'',
					pwdcf:'',
					vcode:'',
					avatar:'../../static/img/ava-default.png'
				},
				vcodeText: '获取',
				disabled: false,
				time: 0,
				sex:1
			}
		},
		computed: {},
		mounted() {
			// let userInfo = this.$authentication.getUserInfo();
			// console.log("lin=getUserInfo:"+userInfo);
			// if (userInfo) {
			// 	uni.redirectTo({
			// 		url: '/pages/index/index'
			// 	})
			// }
		},
		methods: {
			picksex(){
				let that =this;
				that.sex == 1?that.sex = 2:that.sex = 1;
			},
			
			goLoginMethod(){
				let that = this;
				// uni.redirectTo({
				// 	url: '/pages/auth/loginMethod'
				// });
				uni.navigateBack()
			},
			
			handleSubmit(e) {
				let that = this,
					uniPop = that.$refs.uniPop;
				if (!this.formObj.tel) {
					uniPop.base('手机号不能为空');
				} else if (!util.checkTel(this.formObj.tel)) {
					uniPop.base('手机号格式有误');
				} else if (!this.formObj.pwd) {
					uniPop.base('密码不能为空');					
				} else if (this.formObj.pwd !== this.formObj.pwdcf) {
					uniPop.base('两次输入的密码不一致');							
					}else if (!this.formObj.vcode) {
					uniPop.base('验证码不能为空');						
				} else {
					that.disabled = true;
					//注册用户
					util.bsajax('/api/im/LoginPhone', {
							MobilePhone: that.formObj.tel,
							VerificationCode: that.formObj.vcode,
							Password: md5(that.formObj.pwd),
							ChannelBagId: config.ChannelBagId
						},
						/*成功*/
						function(data) {
							if(data.code == 200){
								uniPop.success('恭喜，注册成功！', function() {
									uni.redirectTo({
										url: '/pages/auth/login'
									});
								});
							}else{
								uniPop.error(data.msg);
							}
							that.disabled = false;
						},
						/*失败*/
						function(data) {
							that.disabled = false;
							uniPop.error(data.msg);
						});
				}
			},
			handleVcode() {
				let uniPop = this.$refs.uniPop
				let that = this;
				if (!this.formObj.tel) {
					uniPop.base('手机号不能为空');							
				} else if (!util.checkTel(this.formObj.tel)) {
					uniPop.base('手机号格式有误');						
				} else {					
					//发送验证码
					util.bsajax('/api/im/SendCode', {
							MobilePhone: that.formObj.tel
						},
						/*成功*/
						function(data) {
							console.log('codedata',data);
							if(data.code == 200){
								uniPop.success(data.result, function() {
									that.time = 60
									that.disabled = true
									that.countDown()
								});
							}							
						},
						/*失败*/
						function(data) {
							that.disabled = false;
							uniPop.error(data.result);
						});
					
					
				}
			},
			countDown() {
				if (this.time > 0) {
					this.vcodeText =  this.time;
					this.time--;
					setTimeout(this.countDown, 1000);
				} else {
					this.vcodeText = '获取';
					this.time = 0;
					this.disabled = false;
				}
			},
			handerVcodeInput(e){
				let that = this;
				console.log(e)
				if(that.formObj.vcode){
					this.time= 0;
					that.countDown();
				}
			}
		}
	}
</script>
<style scoped>
	.top-back-box{
		height: 170rpx;		
		padding-left: 40rpx;
	}
	.top-back-box .iconfont{
		color: #FFFFFF;		
		font-size: 40rpx;
		line-height: 170rpx;
	}
	.reg-forms{
		box-sizing: border-box;
		padding:0 112rpx;
	}
	.login-ipt-box{
		background-color: #FFFFFF;
		border-radius: 46rpx;
		height:92rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		margin-bottom: 15rpx;
		position: relative;
	}
	.login-ipt{
		text-align: center;
	}
	.login-btn-box{
		box-sizing: border-box;
		margin-top: 35rpx;
		
	}
	.login-btn{
		background-color: #75c1f2;
		border-radius: 46rpx;
		height:92rpx;
		line-height: 92rpx;
		font-size: 28rpx;
		box-sizing: border-box;
		color:#FFFFFF;
		box-shadow: 0rpx 10rpx 5rpx rgba(0,0,0,0.2);
	}
	.login-avatar{
		margin-top: 5.5%;
		margin-bottom: 150rpx;
	}
	.ava-box{
		width: 170rpx;
		/* height: 150rpx; */
		/* background: #FFFFFF; */
		margin:0 auto;
	}
	.sexbox{
		display: flex;
		justify-content: space-between;
		width: 286rpx;
		margin: 0 auto;
		margin-top: 90rpx;
	}
	.sex-item{
		text-align: center;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	.sex-item image{
		margin-bottom: 14rpx;
	}
	.fgt-pw-box{
		color: #FFFFFF;
		text-align: center;
		margin-top:40rpx;
		font-size: 24rpx;
	}
	.getvcode{
		position: absolute;
		right: 0;
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		background-color: #75c1f2;
		color: #FFFFFF;
		margin-right: 5rpx;
		font-size: 28rpx;
		line-height: 82rpx;
	}
	.set-avator{
		width: 100%;
		height: 100%;
	}
</style>
