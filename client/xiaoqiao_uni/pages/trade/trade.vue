<template>
	<view class="top_background">
		<view class="flexbox top_background">
			<view class="ml_5 flex1 fs_25">订单列表</view>
			<view class="mr_5 flex1 fs_25">消费总额:{{totalCost/100}}元</view>
		</view>
		<scroll-view class="scroll_background follow-houses-view" scroll-y="true">
			<view class="item_background container_of_slide top_flex_row flexbox box_shadow mt_2" v-for="(item,index) in list" :key="index">
				<view class="flex1 flex_item ucit">
					<view class="top_flex_col flexbox">
						<view>{{item.PL_Name}}</view>
						<view class="fs_14">订单ID:{{item.UO_ID}}</view>
					</view>
				</view>
				<view class="flex1 flex_item ucit">
					<view class="top_flex_col flexbox  container_of_slide">
						<view class="fs_14">单价:{{item.PL_Price/100}}元/个</view>
						<view class="ellipsis fs_14">数量:{{item.UO_Number}}支</view>
					</view>
				</view>
				<view class="flex1 flex_item ucit ">
					<view class="top_flex_col flexbox ">
						<view>总价:{{item.sum_money/100}}元</view>
						<view class="fs_14">{{item.date}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import testData from "./TestData.js"
	import Http from '@/public/Http.js'
	import Model from '@/public/Model.js'
	import Utils from '@/public/Utils.js'
	export default {
		data() {
			return {
				list: [],
				totalCost:0,
			}
		},
		created: function () {
			this.getOrderList();
		},
		computed: {
			getList() {
				return this.list;
			}
		},
		methods: {
			getOrderList(){
				let self = this;
				let playerData = Model.getPlayerData();
				Http.post('getOrderList', {
					userId: playerData.userId
				}, function (data) {
					if(data.code == 20000){
						let recv_data = data.data;
						self.list = recv_data.list;
						self.totalCost = recv_data.all_totle_money;
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
