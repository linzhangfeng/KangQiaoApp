<template>
	<view class="top_background">
		<view class="flexbox top_background">
			<view class="ml_5 flex1 fs_25">佣金列表</view>
			<view class="mr_5 flex1 fs_25">佣金金额:{{totalCommission}}元</view>
		</view>
		<scroll-view class="scroll_background follow-houses-view" scroll-y="true">
			<view class="item_background container_of_slide top_flex_row flexbox box_shadow mt_2" v-for="(item,index) in list" :key="index">
				<view class="flex1 flex_item ucit">
					<view class="item_text_flex_start flexbox">
						<view>用户名</view>
						<view>{{item.userName}}</view>
						<view>佣金ID:{{item.UC_ID}}</view>
					</view>
				</view>
				<view class="flex1 flex_item ucit">
					<view class="item_text_flex_center flexbox  container_of_slide">
						<view class="fs_16">总消费</view>
						<view class="fs_16">{{item.UC_CostMoeny/100}}元</view>
						<view class="ellipsis">{{item.UC_Type}}级拥挤({{item.UL_Ratio}}%)</view>
					</view>
				</view>
				<view class="flex1 flex_item ucit ">
					<view class="item_text_flex_end flexbox ">
						<view>佣金:{{item.UC_Commission/100}}元</view>
						<view class="fs_14">{{item.date}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import Http from '@/public/Http.js'
	import Model from '@/public/Model.js'
	import Utils from '@/public/Utils.js'
	import testData from "./TestData.js"
	export default {
		data() {
			return {
				list: [],
				totalCommission:0,
			}
		},
		created: function () {
			this.getCommissionData();
		},
		computed: {
			getList() {
				return this.list;
			}
		},
		methods: {
			getCommissionData() {
				let self = this;
				let playerData = Model.getPlayerData();
				Http.post('getCommissionList', {
					userId: playerData.userId
				}, function (data) {
					if(data.code == 20000){
						let recv_data = data.data;
						self.list = recv_data.list;
						self.totalCommission = recv_data.all_totle_commission;
						self.formatOrderList(self.list);
					}else{
						Utils.showToast(data.message);
					}
				});
			},
			formatOrderList(list){
				for(let i = 0; i < list.length;i++){
					let obj = list[i];
					obj["date"] = Utils.timeFormatter(obj["CreateTime"] );
				}
			}
		}
	}
</script>

<style>
	.ellipsis {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.container_of_slide {
		width: 100%;
		overflow: hidden;
	}

	.follow-houses-view {
		width: 100%;
		height: 900rpx;
		/* background-color:  cornflowerblue; */
	}

	.flex_05 {
		flex: 0.5;
	}

	.top_flex_row {
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.top_flex_col {
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.item_text_flex_start {
		flex-direction: column;
		align-items:flex-start;
		justify-content: flex-start;
	}
	.item_text_flex_center {
		flex-direction: column;
		align-items:center;
		justify-content: center;
	}
	.item_text_flex_end {
		flex-direction: column;
		align-items:flex-end;
		justify-content: flex-end;
	}
	.flex_item {
		align-items: center;
	}

	.box_shadow {
		-moz-box-shadow: 0 0 10px #06c;
		-webkit-box-shadow: 0 0 10px #06c;
		box-shadow: 0 0 10px #06c;
	}

	.top_box_shadow {
		-moz-box-shadow: 0 0 2px #06c;
		-webkit-box-shadow: 0 0 2px #06c;
		box-shadow: 0 0 10px #06c;
	}

	.top_background {
		background-color: #00ffff;
	}
	.item_background {
		background-color: #faf7ff;
	}
	.scroll_background {
		background-color: #f5f5f5;
	}
</style>
