<template>
    <div class="home">
        <div class="top-msg">
            <span class="adm-name">暨南大学远程在线考试系统后台</span>
            <Logout></Logout>
            <PerSetting></PerSetting>
            <div class="user-info">
                欢迎您！{{userInfo.username}}
            </div>
        </div>
        <NavBar></NavBar>
        <router-view class="main" :style="{height: mHeight}"></router-view>
    </div>
</template>

<script>    

import NavBar from '@/components/NavBar'
import Logout from '@/components/Logout'
import PerSetting from '@/components/PerSetting'

export default {
    name: 'home',
    data () {
        return {
            timer: false
        }
    },
    computed: {
        userInfo () {
            return JSON.parse(window.localStorage.getItem('userInfo'))
        },
        mHeight () {
            return this.$store.state.mainHeight + 'px'
        }
    },
    components: {
        NavBar,
        Logout,
        PerSetting
    },
    methods: {
        setMainHeight () {
            var mHeight = document.querySelector('body').offsetHeight - 95;
            this.$store.dispatch('setMainHeight', mHeight)
        },
        winResize () {
            if (!this.timer) {
                this.timer = true
                let that = this
                var timeId = setTimeout(function () {
                    clearTimeout(timeId);
                    that.setMainHeight()
                    that.timer = false
                }, 200)
            }
        }
    },
    mounted () {
        this.setMainHeight();
        this.winResize();
        window.onresize = this.winResize
    }
}
</script>

<style>
.home{ position: relative; min-width: 1200px; height: 100%; }
.top-msg{ height: 34px; line-height: 34px; font-size: 14px; color: #fff; background-color: #002a2f;}
.top-msg .adm-name{ padding-left: 20px; border-bottom: 1px solid #001c1f; }
.top-msg .user-info{ float: right; padding-right: 10px; border-right: 1px solid #001c1f; line-height: 1; margin-top: 10px; }
</style>