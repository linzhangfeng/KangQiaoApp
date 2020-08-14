<template>
    <view class="uni__ucenterWrapper">
        <view class="uni__listview" @tap="goLogin">
            <view class="item ucinfoitem uni__list uni__material">
                <image className="ucavatar mr_15" src="/static/uimg/avatar.png" mode="widthFix"
                       style="height: 55px;width:55px;"
                       errorImage="/static/uimg/avatar.png" loadingImage="/static/uimg/avatar.png"/>
                <view class="txt flex1 fs_18">小乔流水
                    <text v-if="userInfo.gender == 1" class="iconfont iconnan c_589bee ml_10"
                          style="font-size:34rpx"></text>
                    <text v-if="userInfo.gender == 2" class="iconfont iconnv c_ee7357 ml_10"
                          style="font-size:34rpx"></text>
                    <text class="db c_999 fs_12 mt_5">用户ID: 123456</text>
                </view>
                <text class="iconfont iconenter c_999 fs_25"></text>
            </view>
        </view>
        <view class="uni__listview mt_10 hborder">
            <view class="item uni__list uni__material" @tap="goSetting">
                <view class="txt flex1 flexbox ucit">
                    <text class="iconfont iconsetup mr_5" style="font-size: 40rpx;color:#3195f9;"></text>
                    <text class="item-name">通用</text>
                </view>
                <text class="iconfont iconenter c_999 fs_25"></text>
            </view>
        </view>

        <view class="uni__listview">
            <view class="item uni__list uni__material" @tap="goSecurity">
                <view class="txt flex1 flexbox ucit">
                    <text class="iconfont iconwarning mr_5" style="font-size: 40rpx;color:#3195f9;"></text>
                    <text class="item-name">安全与隐私</text>
                </view>
                <text class="iconfont iconenter c_999 fs_25"></text>
            </view>
        </view>
        <view class="uni__listview mt_10">
            <view class="item uni__list uni__material" @tap="goHelpcenter">
                <view class="txt flex1 flexbox ucit">
                    <text class="iconfont iconfeedback mr_5" style="font-size: 40rpx;color:#fe69ab;"></text>
                    <text class="item-name">帮助</text>
                </view>
                <text class="iconfont iconenter c_999 fs_25"></text>
            </view>
        </view>
        <uni-pop ref="uniPop"></uni-pop>
    </view>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        destroyed() {

        },
        methods: {
            goLogin() {
                uni.navigateTo({
                    url: '/pages/auth/login'
                })
            }
        },

    }
</script>

<style scoped>
    .ucavatar {
        width: 114 rpx;
        height: 114 rpx;
        border-radius: 50%;
    }

    .hborder {
        border-bottom: 1px solid #e7e7e7;
    }
</style>
