<template>
    <div class="logout">
        <a href="javascript:;" @click="logout">退出</a>
    </div>
</template>

<script>
    import loginApi from '@/api/login'
    
    export default {
        name: 'logout',
        methods: {
            logout () {
                var layerIndex = layer.load(1, {
                    shade: [0.1, '#fff']
                })
                loginApi.logout().then((req)=>{
                    // if(req.data.ret == 0){
                        layer.close(layerIndex)
                        this.$store.dispatch('setUserInfo', '')
                        this.$router.replace('/user/login');
                    // }
                })
            },
        }
    }
</script>

<style>
    .logout{ float: right; padding-left: 10px; margin-right: 15px; margin-top: 10px; border-left: 1px solid #004149; line-height: 1; }
    .logout a{ color: #fff;}
</style>

