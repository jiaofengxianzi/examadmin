<template>
    <div class="scheme">
        <SideNav :sideNavList="sideNavList"></SideNav>
        <div class="container">
            <NavShrink></NavShrink>
            <div class="step">
                <span class="s1">当前位置</span><i class="el-icon-fa el-icon-fa-angle-right"></i>{{pageMsg}}
            </div>
            <div class="section-wrap">
                <router-view class="view"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import SideNav from '@/components/SideNav'
    import NavShrink from '@/components/NavShrink'
    export default {
        name: 'scheme',
        data () {
            return {
                sideNavList: [
                    {module: 'resultsConfig', text: '平时分数', icon: 'minus-square-o'},
                    {module: 'results', text: '成绩管理', icon: 'laptop'},
                ]
            }
        },
        computed: {
            pageMsg () {
                return this.$store.state.pageTit
            }
        },
        components: {
            SideNav,
            NavShrink
        },
        mounted () {
            this.$store.dispatch('setPageTit', $('.side-nav .router-link-active').text().trim());
        }
    }
</script>

