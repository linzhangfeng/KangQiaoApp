<template>
	<view class="uni__container flexbox flex_col auth">		
		<view class="top-back-box">
			<!-- <text class="iconfont iconfanhuii" @tap="goLoginMethod()"></text> -->
		</view>
		<view>
			<view>
				<view class="login-avatar">
					<view class="ava-box">
						<image src="../../static/logo/login-logo.png" mode="widthFix"></image>
					</view>
					<!-- <view class="ava-title">LOGO</view> -->
				</view>
				
				<view class="login-forms">					
					<view class="login-ipt-box flexbox flex_alignc">			
						<button class="login-ipt" @tap="goLogin()">登录</button>
					</view>
					
					<view class="login-ipt-box flexbox flex_alignc">						
						<button class="login-ipt" @tap="goRegister()">注册</button>
					</view>	
					
				</view>
				
				<view class="other-way-title">社交账号登录</view>
				<view class="other-way-line"></view>
				<view class="other-way-box">
					<text class="iconfont icon-alipay" @tap="goLoginMethod()"></text>
					<text class="iconfont icon-wechat" @tap="goLoginMethod()"></text>
					<text class="iconfont icon-weibo" @tap="goLoginMethod()"></text>
				</view>
			</view>
			
		</view>
		
		
		
		<uni-pop ref="uniPop"></uni-pop>
	</view>
	
	
	
</template>

<script>
	export default {
		data() {
			return {			
				disabled: false, /*防误点重复提交*/
				formObj: {
					pwd:'',
					pwdcf:'',
				},
				
			}
		},
		mounted() {
			let that = this;
			let userInfo = that.$authentication.getUserInfo();
			console.log('userInfo', userInfo)
			if (userInfo) {
				that.formObj.tel = userInfo.accountMobile;
				//that.formObj.pwd = '123456';
			}
		},
		methods: {			
			goLogin(){
				let that = this;
				uni.navigateTo({
					url: '/pages/auth/login'
				});
			},
			goRegister(){
				let that = this;
				uni.navigateTo({
					url:'./check-vcode?vtype=' + 'resgister'
				})
			},
			
		}
	}
</script>
<style scoped>	
	.other-way-title{
		font-size: 24rpx;
		color: #FFFFFF;
		text-align: center;
		margin-top:150rpx;
	}
	.other-way-line{
		border-bottom: 2px solid #FFFFFF;
		width:476rpx;
		margin: 0 auto;
		margin-top: 80rpx;
	}
	.other-way-box{		
		display: flex;
		justify-content: space-between;
		width: 356rpx;
		height: 72rpx;
		margin: 0 auto;
		margin-top: 50rpx;
		color:#FFFFFF;
		box-sizing: border-box;
		padding: 12rpx;
	}
	
	.other-way-box .iconfont{
		font-size: 48rpx;
	}
	.top-back-box{
		height: 170rpx;		
		padding-left: 40rpx;
	}
	.top-back-box .iconfont{
		color: #FFFFFF;		
		font-size: 40rpx;
		line-height: 170rpx;
	}
	.login-forms{
		box-sizing: border-box;
		padding:0 112rpx;
	}
	.login-ipt-box{
		background-color: #FFFFFF;
		border-radius: 46rpx;
		height:92rpx;
		
		box-sizing: border-box;
		margin-bottom: 15rpx;
	}
	.login-ipt{
		/* text-align: center; */
		width: 100%;
		height: 100%;
		border-radius: 46rpx;
		font-size: 28rpx;
		color:#45ace7;
		line-height: 92rpx;
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
	.ava-title{
		font-size: 60rpx;
		color:#FFFFFF;
		margin:0 auto;
		text-align: center;
		margin-top:30rpx;
	}
	.fgt-pw-box{
		color: #FFFFFF;
		text-align: center;
		margin-top:40rpx;
		font-size: 24rpx;
	}
</style>
