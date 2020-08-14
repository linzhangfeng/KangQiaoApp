<template>
	<view class="uni__container flexbox flex_col auth">
		<header-bar :isBack="true" :title="title" :bgColor="{background: '#3195f9'}" center>
			<text slot="back" class="uni_btnIco iconfont iconfanhui"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<view class="uni-lgregPanel">
				<view class="lgreg-header">
					<view class="forms mt_15">
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
							<view class="item btns mt_70">
								<button :disabled="disabled" form-type="submit">下一步</button>
							</view>
							<view class="item lgreg-lk">
								<view class="textstyle">已有账户？<navigator class="navigator" url="/pages/auth/findpassword">忘记密码</navigator></view>		
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
	import config from'../../config.js'
	export default {
		data() {
			return {
				formObj: {
					tel:'',
					vcode:''
				},
				vcodeText: '获取验证码',
				disabled: false,
				time: 0,
				title:'',
				OptType:null
			}
		},
		computed: {},
		onLoad(data) {
			let that = this;
			that.title = '注册'
			that.OptType = 1
		},
		mounted() {
			
		},
		methods: {
			handleSubmit(e) {				
				let that = this;
				// 去注册
				that.goResgister();						
			},
			goResgister(){
				let that = this,
					uniPop = that.$refs.uniPop;
				if (!this.formObj.tel) {
					uniPop.base('手机号不能为空');
				} else if (!util.checkTel(this.formObj.tel)) {
					uniPop.base('手机号格式有误');
				} else if (!this.formObj.vcode) {
					uniPop.base('验证码不能为空');
				} else {
					that.disabled = true;
					//注册用户
					util.bsajax('/api/im/LoginPhone', {
							MobilePhone: that.formObj.tel,
							VerificationCode: that.formObj.vcode,
							// Password: md5(that.formObj.pwd),
							ChannelBagId: config.ChannelBagId
						},
						/*成功*/
						function(data) {
							console.log('resdata',data);
							if(data.code == 200){
								
								that.goGetToken(data.result.Password)
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
			goGetToken(psw){
				let that = this,
				uniPop = that.$refs.uniPop;
				console.log(psw)
				util.post('/api/account/Login',{
					accountMobile: that.formObj.tel,
					password: md5(psw),
				},function(data){
					console.log('gettoken',data)
					uniPop.success('恭喜，验证成功！', function() {
						uni.navigateTo({
							url:'/pages/auth/set-password?oldpsw=' + psw + '&token=' +data.data.token
						})
					});
				},function(){
					uniPop.error(data.result);
				})
				
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

</style>
