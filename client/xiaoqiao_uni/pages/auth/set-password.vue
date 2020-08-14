<template>
	<view class="uni__container flexbox flex_col auth">
		<header-bar :isBack="true" title="密码" :bgColor="{background: '#3195f9'}" center>
			<text slot="back" class="uni_btnIco iconfont iconfanhui"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<view class="uni-lgregPanel">
				<view class="lgreg-header">
					<view class="forms mt_15">
						<form @submit.prevent="handleSubmit">
							<view class="item havebor">
								<text class="iconfont">登录密码</text>
								<input v-if="!pswshow" class="iptxt ipt-psw flex1" type="password"
								 v-model="formObj.pwd" placeholder="请输入登录密码" placeholder-style="color:#a6a9b6"/>
								 <input v-if="pswshow" class="iptxt ipt-psw flex1" type="text"
								  v-model="formObj.pwd" placeholder="请输入登录密码" placeholder-style="color:#a6a9b6" />
								 <text class="iconfont icondelete_fill" @tap="formObj.pwd = ''"></text>
							</view>
							<view class="item havebor">
								<text class="iconfont">确认密码</text>
								<input v-if="!pswshow" class="iptxt ipt-psw flex1" type="password"
								 v-model="formObj.pwdcf" placeholder="请确认登录密码" placeholder-style="color:#a6a9b6" />
								 <input v-if="pswshow" class="iptxt ipt-psw flex1" type="text"
								  v-model="formObj.pwdcf" placeholder="请确认登录密码" placeholder-style="color:#a6a9b6" />
								 <text v-if="!pswshow" class="iconfont iconbukejian" @tap="letPasswordShow()"></text>
								 <text v-if="pswshow" class="iconfont iconkejian" @tap="letPasswordShow()"></text>
							</view>
							<view class="item btns mt_70">
								<button :disabled="disabled" form-type="submit">注册</button>
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
					pwd:'',
					pwdcf:'',
				},
				vcodeText: '获取验证码',
				disabled: false,
				time: 0,
				beforemsg:{},
				pswshow:false
			}
		},
		computed: {},
		onLoad(data) {
			let that = this;
			console.log('set-password onLoad',data);
			that.beforemsg = data;
		},
		mounted() {
			
		},
		methods: {
			handleSubmit(e){
				let that = this,
					uniPop = that.$refs.uniPop;
				if(!that.formObj.pwd || !that.formObj.pwdcf){
					uniPop.base('密码不能为空');
				}else if(that.formObj.pwd != that.formObj.pwdcf){
					uniPop.base('两次输入的密码不一致');
				}else{
					that.disabled = true;
					util.bsajax('/api/im/UpdatePassword', {
							token: that.beforemsg.token,
							OldPassword: md5(that.beforemsg.oldpsw),
							NewPassword: md5(that.formObj.pwdcf)
						},
						/*成功*/
						function(data) {
							console.log('resdata',data);
							if(data.code == 200){
								uniPop.success('密码设置成功',function(){
									uni.navigateTo({
										url:'/pages/auth/login'
									})
								})								
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
			letPasswordShow(){
				let that = this;
				console.log('letPasswordShow');
				that.pswshow == true?that.pswshow = false:that.pswshow = true;
			}
		}
	}
</script>
<style scoped>

</style>
