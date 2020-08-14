<template>
	<view class="uni__container flexbox flex_col">
		<view class="page_scrollview page_flex1">
			<block v-if="currentTabIndex == 0">
				<home />
			</block>
			<block v-else-if="currentTabIndex == 1">
				<commission />
			</block>
			<block v-else-if="currentTabIndex == 2">
				<spread />
			</block>
			<block v-else-if="currentTabIndex == 3">
				<trade />
			</block>
			<block v-else-if="currentTabIndex == 4">
				<usercenter />
			</block>
		</view>
		<tab-bar :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#3195f9" @click="handleTabbar"></tab-bar>
		<uni-pop ref="uniPop"></uni-pop>
	</view>
</template>

<script>
	import home from '@/pages/home/index.vue'
	import usercenter from '@/pages/usercenter/usercenter.vue'
	import trade from '@/pages/trade/trade.vue'
	import commission from '@/pages/commission/commission.vue'
	import spread from '@/pages/spread/spread.vue'
	import Http from '@/public/Http.js'
	import Model from '@/public/Model.js'
	import Platform from '@/public/Platform.js'
	export default {
		data() {
			return {
				currentTabIndex: 0,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		onLoad() {
			console.log("lin=index", this.currentTabIndex);


			uni.$on('emit_get_user_info',this.getUserInfo);
			// uni.redirectTo({
			// 	url: '/pages/auth/login'
			// });
		},
		components: {
			home,
			usercenter,
			commission,
			spread,
			trade
		},
		methods: {
			getUserInfo(){
				let self = this;
				let playerData = Model.getPlayerData();
				let token = playerData.token;
				let temp_currentTabIndex = this.currentTabIndex;
				this.currentTabIndex = -1;
				Http.post("getUserInfo", {
					token: token,
				}, function (data) {
					if (data.code == 20000) {
						let recv_data = data.data;
						let userData = recv_data["userdata"];
						playerData.nickName = userData["UI_NickName"];
						playerData.userName = userData["UA_Name"];
						playerData.userId = userData["UI_ID"];
						playerData.money = userData["UI_Gold"];
						playerData.phone = userData["UI_Phone"];
						playerData.parentNickName = userData["Parent_NickName"];
						playerData.parentUserName = userData["Parent_UserName"];
						playerData.parentId = userData["Parent_ID"];
						Model.isLogin = true;
						self.handleTabbar(temp_currentTabIndex)
					} else {
						self.handleTabbar(temp_currentTabIndex)
						Utils.showToast(data.message);
					}
				});
			},
			handleTabbar(index) {
				if(!Model.isLogin){
					Platform.goLogin();
					return
				}
				this.currentTabIndex = index;
				console.log("lin=handleTabbar:" + index);
				this.setTitle(index);
			},

			setTitle(index) {
				var arr = ['首页', '佣金', '推广', '交易', '我的'];
				uni.setNavigationBarTitle({
					title: arr[index]
				});
			}
		}
	}
</script>


<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.page_flex1 {
		flex: 1;
	}

	.page_scrollview {
		box-sizing: border-box;
		/* overflow-y: auto; */
		/* overflow-x: hidden; */
		width: 100%;
		position: relative;
		/* -webkit-overflow-scrolling: touch; */
	}
</style>
