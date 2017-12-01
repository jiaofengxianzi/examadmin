<template>
    <div id="app" v-if="isIE">
        <router-view></router-view>
    </div>
</template>

<script>
    import '@/assets/css/global.css'
    import '@/assets/css/font-awesome.css'
    import '@/assets/css/main.css'


    export default {
        name: 'app',
        data () {
            return {
                isIE: (function(){
                    return navigator.userAgent.indexOf('Trident') <= -1
                })()
            }
        }
    }
</script>

<style>
    #app {
        font-family: "Microsoft YaHei", SimHei, Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
        background-color: #f9f9f9;
        color: #3d3d3d;
    }
</style>
