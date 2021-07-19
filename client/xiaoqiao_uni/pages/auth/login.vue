<template>
    <view class="uni__container flexbox flex_col auth">
        <view class="uni__scrollview flex1">
            <view class="uni-lgregPanel">
                <view class="lgreg-header">
                    <view class="slogan">
                        <view class="ava-box">
                            <image src="../../static/logo/login-logo.png" mode="widthFix"></image>
                        </view>
                    </view>
                    <view class="forms fspace">
                        <form @submit.prevent="handleSubmit">
                            <view class="item havebor">
                                <text class="iconfont iconzhanghao"></text>
                                <input class="iptxt flex1" type="text" v-model="formObj.tel" placeholder="请输入手机号"
                                       placeholder-style="color:#a6a9b6"
                                       maxlength="11"/>
                                <text class="iconfont icondelete_fill" @tap="formObj.tel = ''"></text>
                            </view>
                            <view v-if="loginmode == 'pw'" class="item havebor">
                                <text class="iconfont iconmima"></text>
                                <input class="iptxt flex1" type="text" v-if="pwdshow" password="true"
                                       v-model="formObj.pwd" placeholder="请输入密码"
                                       placeholder-style="color:#aaa"/>
                                <text class="iconfont icondelete_fill" @tap="formObj.pwd = ''"></text>
                            </view>
                            <view v-if="loginmode == 'sc'" class="item havebor">
                                <text class="iconfont icon-vcode"></text>
                                <input class="iptxt flex1" type="text" v-model="formObj.vcode" placeholder="验证码"
                                       placeholder-style="color:#aaa"
                                       @input="handerVcodeInput"/>
                                <button class="btn-getcode" @click.prevent="handleVcode" :disabled="disabled">
                                    {{vcodeText}}
                                </button>
                            </view>
                            <view class="item btns mt_40">
                                <button :disabled="disabled" form-type="submit">登录</button>
                            </view>

                            <view class="item lgreg-lk">
                                <view class="navigator" @tap="forgetPassword()">忘记密码</view>
                            </view>
                        </form>
                    </view>
                </view>
                <view class="lgreg-footer">
                </view>
            </view>
        </view>
        <uni-pop ref="uniPop"></uni-pop>
    </view>
</template>

<script>
    import Http from '@/public/Http.js'
    import Utils from '@/public/Utils.js'
    import Model from '@/public/Model.js'

    export default {
        data() {
            return {
                formObj: {
                    tel: '13617313041',
                    pwd: '123456',
                    vcode: ''
                },
                loginmode: 'pw',
                vcodeText: '获取验证码',
                disabled: false,
                /*防误点重复提交*/
                pwdshow: true
            }
        },
        mounted() {

        },
        methods: {
            goResgister() {
                uni.navigateTo({
                    url: './check-vcode?vtype=' + 'resgister'
                })
            },
            forgetPassword() {
                uni.navigateTo({
                    url: './findpassword'
                })
            },
            goLoginMethod() {
                let that = this;
                uni.navigateBack({})
            },
            switchloginmode() {
                let that = this;
                that.loginmode == 'pw' ? that.loginmode = 'sc' : that.loginmode = 'pw';
                that.formObj.pwd = '';
                that.formObj.vcode = '';
            },
            // 提交表单
            handleSubmit(e) {
                // uni.reLaunch({
                // 	url: '/pages/index/index'
                // });
                // uni.navigateBack();
                // return;

                let that = this
                let uniPop = this.$refs.uniPop
                if (!this.formObj.tel) {
                    uniPop.base('手机号不能为空')
                } else if (!Utils.checkMobile(this.formObj.tel)) {
                    uniPop.base('手机号格式有误')
                } else if (!this.formObj.pwd && that.loginmode == 'pw') {
                    uniPop.base('密码不能为空')
                } else if (!this.formObj.vcode && that.loginmode == 'sc') {
                    uniPop.base('验证码不能为空')
                } else {
                    that.disabled = true;
                    uni.showLoading({
                        title: '正在登录..'
                    });

                    Http.post("userLogin", {
                        phone: this.formObj.tel,
                        username: "",
                        password: this.formObj.pwd,
                    }, function (data) {
                        if (data.code == 20000) {
                            let recv_data = data.data;
                            let playerData = Model.getPlayerData();
                            playerData.token = recv_data["token"];
                            uni.$emit('emit_get_user_info');
                            uni.navigateBack();
                        } else {
                            Utils.showToast(data.message);
                        }
                    });
                }
            },
            handleVcode() {
                let uniPop = this.$refs.uniPop
                let that = this;
                if (!this.formObj.tel) {
                    uniPop.base('手机号不能为空')
                } else if (!util.checkTel(this.formObj.tel)) {
                    uniPop.base('手机号格式有误')
                } else {
                    //发送验证码
                    util.bsajax('/api/im/SendCode', {
                            MobilePhone: that.formObj.tel
                        },
                        /*成功*/
                        function (data) {
                            console.log('codedata', data);
                            if (data.code == 200) {
                                uniPop.success(data.result, function () {
                                    that.time = 60
                                    that.disabled = true
                                    that.countDown()
                                });
                            }
                        },
                        /*失败*/
                        function (data) {
                            that.disabled = false;
                            uniPop.error(data.result);
                        });


                }
            },
            countDown() {
                if (this.time > 0) {
                    this.vcodeText = '获取验证码(' + this.time + ')'
                    this.time--
                    setTimeout(this.countDown, 1000)
                } else {
                    this.vcodeText = '获取验证码'
                    this.time = 0
                    this.disabled = false
                }
            },
            handerVcodeInput(e) {
                let that = this;
                console.log(e)
                if (that.formObj.vcode) {
                    this.time = 0;
                    that.countDown();
                }
            },
            passwordshow() {
                let that = this;
                that.pwdshow ? that.pwdshow = false : that.pwdshow = true;
            },
            // 微信登录
            weixinlogin() {
                console.log('微信登录');
                uni.login({
                    provider: 'weixin',
                    success: function (loginRes) {
                        console.log(loginRes.authResult);
                        // 获取用户信息
                        uni.getUserInfo({
                            provider: 'weixin',
                            success: function (infoRes) {
                                console.log(infoRes)
                                console.log('用户昵称为：' + infoRes.userInfo.nickName);
                            }
                        });
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .otherwaylogin-box {
        position: absolute;
        bottom: 20 upx;
        width: 100%;
    }

    .otherLoginTitle {
        text-align: center;
        color: #a6a9b6;
        font-size: 30 upx;
        border-bottom: 1px solid #a6a9b6;
        margin: 0 auto;
        width: 192 upx;
    }

    .otherLogin {
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        margin-top: 30 upx;
    }

    .otherLogin .iconfont {
        font-size: 60 upx;
        color: #3195f9;
    }

    .otherLogin image {
        width: 60 rpx;
        height: 60 rpx;
    }
</style>
