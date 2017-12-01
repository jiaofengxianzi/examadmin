<template>
    <div class="notice">
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
        name: 'notice',
        data () {
            return {
                sideNavList: [
                    {module: 'noticeManage', text: '公告管理', icon: 'bell-o'},
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

