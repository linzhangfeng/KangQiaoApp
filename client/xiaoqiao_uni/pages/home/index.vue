<template>
    <view>
        <view class="home_border flexbox home_flex_column" v-if="userInfo">
            <view class="flexbox home_width home_flex_column flex1">
                <view>我的资产</view>
            </view>
            <view class="home_width flexbox home_flex_row">
                <view class="flexbox home_flex_column flex1 mb_5">
                    <view class="flex1 mt_2">团队人数:200人</view>
                    <view class="flex1 mt_2">一级用户人数:100人</view>
                    <view class="flex1 mt_2">二级用户人数:100人</view>
                </view>
                <view class="flexbox home_flex_column flex1 mb_5">
                    <view class="flex1 mt_2">当前佣金:2.6万元</view>
                </view>
            </view>
        </view>
        <view class="mt_5 home_border flexbox home_flex_column home_height" v-if="!parentUserInfo && userInfo">
            <view class="flexbox home_width home_flex_column flex1">
                <view class="home_border" @click="goAddParentUser">添加推介人</view>
            </view>
        </view>
        <view class="mt_5 home_border flexbox home_flex_column home_height" v-if="parentUserInfo&& userInfo">
            <view class="flexbox home_flex_column flex1 mb_5">
                <view class="flex1 mt_2">我的推介人</view>
                <view class="flex1 mt_2">推介人ID:{{parentUserInfo.parentId}}</view>
                <view class="flex1 mt_2">推介人用户名:{{parentUserInfo.parentUserName}}</view>
            </view>
        </view>

        <view class="mt_5 home_border flexbox home_flex_column home_height_100" v-if="!userInfo">
            <view class="flexbox home_flex_column flex1 mb_5">
                <view class="home_border" @click="goAddParentUser">未获得用户信息，请登录</view>
            </view>
        </view>
    </view>
</template>

<script>
    import Platform from '@/public/Platform.js'
    import Model from '@/public/Model.js'

    export default {
        data() {
            return {
                parentUserInfo: null,
                userInfo:null,
            }
        },

        created: function () {
            let playerData = Model.getPlayerData();
            if (playerData.parentId != 0 && playerData.parentId != undefined) {
                this.parentUserInfo = {};
                this.parentUserInfo['parentId'] = playerData.parentId;
                this.parentUserInfo['parentUserName'] = playerData.parentUserName;
            }

            if(playerData.userId != 0 && playerData.userId != undefined){
                this.userInfo = {};
                this.userInfo['userId'] = playerData.userId;
                this.userInfo['userName'] = playerData.userName;
            }
        },
        methods: {
            goAddParentUser() {
                if (!Model.isLogin) {
                    Platform.goLogin();
                    return;
                }
                Platform.goAddParentUser();
            },
        }
    }
</script>

<style>
    .home_flex_row {
        flex-direction: row;
    }

    .home_flex_column {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .test_background {
        background-color: #BD2C00;
    }

    .home_width {
        width: 100%;
    }

    .home_border {
        border: 1px solid #000
    }

    .home_height {
        height: 200upx;
    }
    .home_height_100 {
        height: 100vh;
    }
</style>
