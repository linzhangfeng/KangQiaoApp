<template>
    <view>
        <scroll-view class="scroll_background follow-houses-view box_shadow" scroll-y="true">
            <view class="flex_col flexbox">
                <view class="flex_row flexbox ml_5 mt_5">
                    <view class="fs_14 flex_4">订单ID：</view>
                    <view class="fs_14 flex_4">123456</view>
                </view>
                <view class="flex_row flexbox  ml_5 mt_5">
                    <view class="fs_14 flex_4">用户名：</view>
                    <view class="fs_14 flex_4">13617313041</view>
                </view>
                <view class="flex_row flexbox  ml_5 mt_5">
                    <view class="fs_14 flex_4">店名：</view>
                    <view class="fs_14 flex_4">肯德基</view>
                </view>
                <view class="flex_row flexbox  ml_5 mt_5">
                    <view class="fs_14 flex_4">订单名称：</view>
                    <view class="fs_14 flex_4">小乔洗衣粉</view>
                </view>
                <view class="flex_row flexbox  ml_5 mt_5">
                    <view class="fs_14 flex_4">支付方式：</view>
                    <view class="fs_14 flex_4">微信支付</view>
                </view>
                <view class="flex_row flexbox  ml_5 mt_5">
                    <view class="fs_14 flex_4">消费总额：</view>
                    <view class="fs_14 flex_4">60元</view>
                </view>
            </view>
            <view class="mt_10">
                商品列表
            </view>
            <view  class="mt_5">
                <view class="item_background container_of_slide top_flex_row flexbox box_shadow  mt_5" v-for="(item,index) in list" :key="index" @tap="goOrderDetails">
                    <view class="flex1 flex_item ucit ml_10">
                        <view class="flex_col flexbox">
                            <view>商品名称</view>
                            <view>小乔洗衣粉</view>
                        </view>
                    </view>
                    <view class="flex1 flex_item ucit">
                        <view class="flex_col flexbox  ">
                            <view >数量</view>
                            <view>100支</view>
                        </view>
                    </view>
                    <view class="flex1 flex_item ucit ">
                        <view class="flex_col flexbox ">
                            <view>价格</view>
                            <view >10元</view>
                        </view>
                    </view>
                    <view class="flex1 flex_item ucit ">
                        <view class="flex_col flexbox ">
                            <view>总额</view>
                            <view>111元</view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <uni-pop ref="uniPop"></uni-pop>
    </view>
</template>

<script>
    import Http from '@/public/Http.js'
    import Model from '@/public/Model.js'
    import Utils from '@/public/Utils.js'

    export default {
        data() {
            return {
                parentUserId: "",
                list:[
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    {}
                ],
            }
        },
        created() {

        },
        methods: {
            updateNickName() {
                let that = this;
                let uniPop = that.$refs.uniPop;

                if (!this.parentUserId) {
                    uniPop.error('昵称不能为空');
                    return;
                }

                if (!typeof (this.parentUserId) == "number") {
                    uniPop.error('ID只能为数字');
                    return;
                }

                let playerData = Model.getPlayerData();
                Http.post("addParentUser", {
                    userId: playerData.userId,
                    parentUserId: this.parentUserId,
                }, function (data) {
                    if (data.code == 20000) {
                        let recv_data = data.data;
                        let parentData = recv_data.parent_user;
                        playerData.parentId = parentData["UI_ID"];
                        playerData.parentNickName = parentData["UI_NickName"];
                        playerData.parentUserName = parentData["UA_Name"];
                        Utils.showToast(data.message);
                        uni.navigateBack();
                    } else {
                        Utils.showToast(data.message);
                    }
                });
            }
        }

    }
</script>

<style>
    .top_background {
        background-color: #00ffff;
    }
    .item_background {
        background-color: #faf7ff;
    }
    .scroll_background {
        background-color: #f5f5f5;
    }
    .box_shadow {
        -moz-box-shadow: 0 0 10px #06c;
        -webkit-box-shadow: 0 0 10px #06c;
        box-shadow: 0 0 10px #06c;
    }
</style>
