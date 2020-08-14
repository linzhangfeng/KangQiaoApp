<template>
	<view class="uni__container flexbox flex_col auth">
		<header-bar :isBack="true" title="重置登录密码" :bgColor="{background: '#3195f9'}" center>
			<text slot="back" class="uni_btnIco iconfont iconfanhui"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<view class="uni-lgregPanel">
				<view class="lgreg-header">	
					<view class="forms">
						<form @submit.prevent="handleSubmit">
							<view class="item havebor">
								<text class="iconfont iconzhanghao"></text>
								<input class="iptxt flex1" type="text"
								 v-model="formObj.tel" placeholder="请输入手机号" placeholder-style="color:#a6a9b6" maxlength="11" />
								 <text class="iconfont icondelete_fill" @tap="formObj.tel = ''"></text>
							</view>
							<view class="item havebor">
								<text class="iconfont iconyanzhengma"></text>
								<input class="iptxt flex1" type="text" v-model="formObj.vcode" placeholder="验证码" placeholder-style="color:#aaa" @input="handerVcodeInput"/>
								<view class="btn-getcode" @click.prevent="handleVcode" :disabled="disabled">{{vcodeText}}</view>
							</view>
							<view class="item havebor">
								<input v-if="!pswshow" class="iptxt flex1" type="password"
								 v-model="formObj.pwd" placeholder="请输入新的登录密码" placeholder-style="color:#a6a9b6"/>
								 <input v-if="pswshow" class="iptxt flex1" type="text"
								  v-model="formObj.pwd" placeholder="请输入新的登录密码" placeholder-style="color:#a6a9b6"/>
								 <text class="iconfont icondelete_fill" @tap="formObj.pwd = ''"></text>
							</view>
							<view class="item havebor">
								<input v-if="!pswshow" class="iptxt flex1" type="password"
								 v-model="formObj.pwdcf" placeholder="请确认新的登录密码" placeholder-style="color:#a6a9b6"/>
								 <input v-if="pswshow" class="iptxt flex1" type="text"
								  v-model="formObj.pwdcf" placeholder="请确认新的登录密码" placeholder-style="color:#a6a9b6"/>
								 <text v-if="!pswshow" class="iconfont iconbukejian" @tap="letPasswordShow()"></text>
								 <text v-if="pswshow" class="iconfont iconkejian" @tap="letPasswordShow()"></text>
							</view>
							<view class="item btns mt_70">
								<button :disabled="disabled" form-type="submit">确认</button>
							</view>				
						</form>
					</view>
				</view>
				<view class="lgreg-footer">
				</view>
			</view>
		</view>
		<uni-pop ref="uniPop"></uni-pop>
	</view>
</template>

<script>
	import util from '../../utils/util.js'
	import md5 from '../../static/js/md5.js'
	export default {
		data() {
			return {
				formObj: {
					tel:'',
					vcode:'',
					pwd:'',
					pwdcf:''
				},
				disabled: false,
				pswshow:false,
				beforemsg:{},
				vcodeText: '获取验证码',
				time: 0,
			}
		},
		onLoad(data) {
			let that = this;
			console.log('findpassword onLoad',data);
			that.beforemsg.token = data.token;
		},
		computed: {},
		mounted() {
		},
		methods: {
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
					//修改密码
					util.bsajax('/api/im/ForgetPassword', {
							MobilePhone: that.formObj.tel,
							VerificationCode: that.formObj.vcode,
							NewPassword: md5(that.formObj.pwd)
						},
						/*成功*/
						function(data) {
							if(data.code == 200){
								uniPop.success('恭喜，修改成功！', function() {
									uni.redirectTo({
										url: '/pages/auth/login'
									});
								});
							}else{
								uniPop.error(data.msg);
							}
							
						},
						/*失败*/
						function(data) {
							that.disabled = false;
							uniPop.error(data.msg);
						});
				}
			},			
			letPasswordShow(){
				let that = this;
				console.log('letPasswordShow');
				that.pswshow == true?that.pswshow = false:that.pswshow = true;
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
							MobilePhone: that.formObj.tel,
							OptType:that.OptType
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
					this.vcodeText = '获取验证码';
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
