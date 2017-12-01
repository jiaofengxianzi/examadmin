<template>
    <div class="login">
        <div class="wrap">
            <div class="cnt">
                <div class="login-form">
                    <div class="title">暨南大学远程在线考试系统后台</div>
                    <form id="loginForm">
                        <div class="row row-user">
                            <div class="inp-wrap">
                                <input type="text" v-model="loginForm.username" class="inp-text" placeholder="用户名"/>
                            </div>
                        </div>
                        <div class="row row-psd">
                            <div class="inp-wrap">
                                <input type="password" v-model="loginForm.password" class="inp-text" placeholder="密码" @keyup.enter="login"/>
                            </div>
                        </div>
                        <div class="row row-btn">
                            <button type="button" class="btn" @click="login">登录</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loginApi from '@/api/login'

    export default {
        name: 'login',
        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login () {
                var _this = this;
                var url = _this.$route.fullPath.split('redirect=')[1] || '/';
                loginApi.login(_this.loginForm).then(function(req){
                    if( req.data.ret == 0){
                        var userInfo = req.data.data;
                        if(!userInfo.cat_list.length){
                            layer.msg('该账户还未分配角色！', {icon: 2, time: 2500})
                            return;
                        }
                        userInfo.loginTime = new Date().getTime();
                        // 给各个模块加入路由
                        userInfo.cat_list.map((item) => {
                            switch (item.id) {
                                case 1:
                                    item.module = 'roles';
                                    break;
                                case 2:
                                    item.module = 'examinee';
                                    break;
                                case 3:
                                    item.module = 'scheme';
                                    break;
                                case 4:
                                    item.module = 'mark';
                                    break;
                                case 5:
                                    item.module = 'score';
                                    break;
                                case 6:
                                    item.module = 'monitor';
                                    break;
                                case 7:
                                    item.module = 'questions';
                                    break;
                                case 8:
                                    item.module = 'notice';
                                    break;
                                case 9:
                                    item.module = 'system';
                                    break;
                                default:
                                    break;
                            }
                        })
                        _this.$store.dispatch('setUserInfo', userInfo)
                        _this.$router.push(decodeURIComponent(url))
                    }else{
                        layer.msg(req.data.res_info, {time: 2000, icon: 2})
                    }
                })
            }
        },
    }
</script>

<style>
    .login{ position: relative; width: 100%; height: 100%; background: url(/static/img/login-bd.jpg) no-repeat center center;}
    .login .cnt{ 
        position: absolute; top: 50%; left: 50%; width: 667px; height: 438px; margin-left: -334px; margin-top: -219px;
        background: url(/static/img/login-cnt.png) no-repeat left top;
    }
    .login .login-form{ padding-top: 78px; padding-left: 355px; font-size: 16px;}
    .login .login-form .title{ line-height: 1; margin-bottom: 52px;}
    .login .row{ position: relative; margin-bottom: 16px;}
    .login .lab{ float: left; width: 120px; text-indent: 34px; line-height: 32px;  }
    .login .row-user .inp-text{ background: #fff url(../../assets/img/icons-user.png) no-repeat 214px center; }
    .login .row-user .inp-text:focus{ background: #fff url(../../assets/img/icons-user-2.png) no-repeat 214px center; }
    .login .row-psd .inp-text{ background: #fff url(../../assets/img/icons-psd.png) no-repeat 214px center; }
    .login .row-psd .inp-text:focus{ background: #fff url(../../assets/img/icons-psd-2.png) no-repeat 214px center; }
    .login .inp-wrap{ position: relative; width: 350px; line-height: 32px; }
    .login .inp-text{ width: 246px; height: 40px; border: 1px solid #dedede; text-indent: 14px; border-radius: 24px; font-size: 14px; border-color:#c7dee1; vertical-align: top; }
    .login .inp-text:focus{ border-color: #166c78; box-shadow: 0 0 5px 0 #166c78; }
    .login .row-btn{ margin-top: 40px; margin-left: 0; }
    .login .btn{ width: 246px; height: 40px; line-height: 40px; color: #fff; font-size: 14px; background-color: #125b64; border-radius: 24px; border: 0; outline: 0;}
    .login .btn:active{ background-color: #146374;}
</style>


