<template>
    <view>
        <view class="top_flex_row flexbox">
            <view class="flex1 flex_item ucit itembox  mt_5 ml_5 mr_5 box_shadow">
                <view class="top_flex_col flexbox mt_5 mb_5">
                    <view>团队人数</view>
                    <view>{{oneCount+twoCount}}</view>
                </view>
            </view>
            <view class="flex1 flex_item ucit itembox mt_5 ml_5 mr_5 box_shadow">
                <view class="top_flex_col flexbox mt_5 mb_5  ">
                    <view>1级用户</view>
                    <view>{{oneCount}}</view>
                </view>
            </view>
            <view class="flex1 flex_item ucit itembox mt_5 ml_5 mr_5 box_shadow">
                <view class="top_flex_col flexbox mt_5 mb_5">
                    <view>2级用户</view>
                    <view>{{twoCount}}</view>
                </view>
            </view>
        </view>
        <view class="top_flex_row flexbox">
            <scroll-view class="follow-houses-view" scroll-y="true">
                <view class="container_of_slide top_flex_row flexbox box_shadow mt_2" v-for="(item,index) in list"
                      :key="index">
                    <view class="flex1 flex_item ucit  mt_2 mb_5">
                        <view class="top_flex_col flexbox">
                            <view>用户ID</view>
                            <view>{{item.UI_ID}}</view>
                        </view>
                    </view>
                    <view class="flex1 flex_item ucit   mt_2 mb_5">
                        <view class="top_flex_col flexbox  container_of_slide">
                            <view>用户名</view>
                            <view class="ellipsis">{{item.UserName}}</view>
                        </view>
                    </view>
                    <view class="flex1 flex_item ucit ">
                        <view class="top_flex_col flexbox ">
                            <view>下级人数</view>
                            <view>{{item.childCount}}</view>
                        </view>
                    </view>
                    <view class="flex1 flex_item ucit ">
                        <view class="top_flex_col flexbox">
                            <view>团队贡献</view>
                            <view>{{item.team_money/100}}元</view>
                        </view>
                    </view>
                    <view class="flex1 flex_item ucit ">
                        <view class="top_flex_col flexbox">
                            <view>用户贡献</view>
                            <view>{{item.sum_money/100}}元</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
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
                oneCount:0,
                twoCount:0
            }
        },
        created: function () {
            this.getSpreadData();
        },
        computed: {
            getList() {
                return this.list;
            }
        },
        methods: {
            getSpreadData() {
                let self = this;
                let playerData = Model.getPlayerData();
                Http.post('getTeamData', {
                    userId: playerData.userId
                }, function (data) {
                    if(data.code == 20000){
                        let recv_data = data.data;
                        self.list = recv_data.list;
                        self.oneCount = recv_data.oneCount;
                        self.twoCount = recv_data.twoCount;
                    }else{
                        Utils.showToast(data.message);
                    }
                });
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
        margin: 20 rpx 0 20 rpx 0;
        height: 900 rpx;
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
</style>
