<template>
    <view class="uni__container flexbox flex_col">
        <view class="uni__scrollview flex1">
            <view class="uni-addFriends">
                <view class="uni__listview mt_15">
                    <view class="uni__list">
                        <input placeholder="请输入推介人ID" class="searIpt flex1 fs_14" type="text" maxlength="12"
                               v-model="parentUserId"/>
                    </view>
                    <button class="mt_30" type="primary" @click="updateNickName()">完成</button>
                </view>
            </view>
        </view>
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
                parentUserId:""
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

                if(!typeof(this.parentUserId)=="number"){
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

</style>
