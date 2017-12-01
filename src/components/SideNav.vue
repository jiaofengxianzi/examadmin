<style>
    .side-nav{ transition: width ease .4s; overflow: hidden;}
    .side-nav .fa{ transition: margin-right ease .4s;}
    .side-nav>ul{width:226px; }
    .fadeW{ width: 52px; }
    .fadeW .fa{ margin-right: 20px; }
</style>
<template>
    <div class="side-nav" :class="{'fadeW': isShowManual}">
        <ul class="list">
            <li v-for="item in sideNavList" :key="item.module">
                <router-link :to="path + '/' + item.module" @click.native="setPageTit(item.text)">
                    <el-tooltip class="item" transition="" :disabled="!isShowManual" :content="item.text" placement="right-start">
                        <i class="fa" :class="'el-icon-fa-' + item.icon"></i>
                    </el-tooltip>
                    {{item.text}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'side-nav',
        computed: {
            ...mapState({
                isShowManual: state => state.isShowManual
            }),
            //进入路径
            path () {
                return this.$store.state.routerMatched[1].path
            }
        },
        methods: {
            ...mapActions([
                'setPageTit'
            ]),
        },
        props: ['sideNavList']
    }
</script>

