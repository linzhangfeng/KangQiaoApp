<template>
	<view class="uni_tabbar" :class="[fixed ? 'fixed' : '']">
		<view class="tablist flexbox flex_alignc uni_borT" :style="[backgroundColor ? {'background-color': backgroundColor} : '']">
			<block v-for="(item,index) in tabList" :key="index">
				<view class="navigator" :class="currentTabIndex == index ? 'on' : ''" @tap="switchTab(index)">
					<view class="icon">
						<text class="iconfont" :class="currentTabIndex == index?item.activeicon:item.icon" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]"></text>
						<text v-if="item.badge" class="uni_badge">{{item.badge}}</text>
						<text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>
					</view>
					<view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">{{item.text}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{
						icon: 'iconmessage',
						activeicon:'iconmessage_fill',
						text: '首页',
						badge: 0
					},
					{
						icon: 'iconselect',
						activeicon:'iconselect_fill',
						text: '佣金',
					},
					{
						icon: 'iconaddressbook',
						activeicon: 'iconaddressbook_fill',
						text: '推广',
						badgeDot: false
					},
					{
						icon: 'iconpeople',
						activeicon:'iconpeople_fill',
						text: '交易',
						badgeDot: false
					},
					{
						icon: 'iconpeople',
						activeicon:'iconpeople_fill',
						text: '我的',
						badgeDot: false
					}
				],
				currentTabIndex: this.current
			}
		},
		props: {
			current: {
				type: [Number, String],
				default: 0
			},
			backgroundColor: {
				type: String,
				default: '#fbfbfb'
			},
			color: {
				type: String,
				default: '#999'
			},
			tintColor: {
				type: String,
				default: '#3195f9'
			},
			fixed: {
				type: [Boolean, String],
				default: false
			}
		},
		created() {
			let that = this;
			uni.$on('OnTabNewMessage', that.onUpdatebadge);		
		},
		watch: { // 对接收值进行监听
			current: function(val) {
				this.currentTabIndex = val;
			},
		},
		methods: {
			switchTab(index) {
				// this.currentTabIndex = index
				this.$emit('click', index)
			},
			onUpdatebadge(eventArgs) {
				let that = this;
				/*消息*/
				if (eventArgs.type == 1) {
					that.tabList[0].badge = eventArgs.count;
				}
				/*联系人*/
				if (eventArgs.type == 2) {
					that.tabList[2].badgeDot = eventArgs.status;
				}
				/*我的*/
				if (eventArgs.type == 3) {
					that.tabList[3].badgeDot = true;
				}
			}
		},
	}
</script>

<style scoped>
	.uni_tabbar {
		display: flex;
		width: 100%;
	}

	.uni_tabbar .tablist {
		background-color: #fbfbfb;
		height: 130upx;
		width: 750upx;
		position: relative;
		z-index: 9000;
	}

	.uni_tabbar .tablist:before {
		background: #cbcbcb;
	}

	.uni_tabbar.fixed {
		padding-top: 100upx;
	}

	.uni_tabbar.fixed .tablist {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.uni_tabbar .tablist .navigator {
		flex: 1;
		text-align: center;
		height: 100upx;
	}

	.uni_tabbar .tablist .icon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		margin-top: 10upx;
		height: 50upx;
		width: 50upx;
		position: relative;
	}

	.uni_tabbar .tablist .icon .iconfont {
		color: #999;
		font-size: 58upx;
	}

	.uni_tabbar .tablist .text {
		color: #999;
		font-size: 24upx;
	}

	.uni_tabbar .tablist .navigator.on .icon .iconfont {
		color: #3195f9;
	}

	.uni_tabbar .tablist .navigator.on .text {
		color: #3195f9;
	}

	.uni_tabbar .tablist .uni_badge {
		position: absolute;
		top: -3upx;
		left: 32upx;
	}

	.uni_tabbar .tablist .uni_badge_dot {
		left: 36upx;
	}
</style>
