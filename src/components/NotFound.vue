<template>
    <div class="notFound">
        <h1 class="ps">
            <img src="/static/img/404-icon-ps.png" alt="icon" class="ps-icon">
            抱歉，您请求的页面暂时无法打开，请稍后在试！
        </h1>
        <img src="/static/img/404.png" alt="404" class="pic">
        <div class="btn-wrap dib-wrap">
            <a href="/" class="btn dib btn-home"></a>
            <a href="javascript:;" class="btn dib btn-back" @click="goBack"></a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notFound',
        methods: {
            goBack () {
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
    .notFound{ position: relative; top: 50%; height: 508px; font-size: 32px; color: #606060; text-align: center; transform: -ms-translateY(-50%); transform: translateY(-50%); }
    .notFound h1{ line-height: 1; }
    .notFound .ps-icon{ margin-right: 12px; }
    .notFound .pic{ margin-top: 60px; }
    .notFound .btn-wrap{ margin-top: 60px;}
    .notFound .btn-wrap .btn{ width: 322px; height: 84px; margin-left: 15px; margin-right: 15px; background-position: center; background-repeat: no-repeat; }
    .notFound .btn-wrap .btn-home{ background-image: url(/static/img/404-home-btn.png); }
    .notFound .btn-wrap .btn-back{ background-image: url(/static/img/404-back-btn.png); }
</style>

