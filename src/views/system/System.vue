<template>
    <div class="system">
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
        name: 'examinee',
        data () {
            return {
                sideNavList: [
                    {module: 'citys', text: '城市管理', icon: 'hospital-o'},
                    {module: 'spots', text: '考点管理', icon: 'laptop'},
                    {module: 'rooms', text: '考场管理', icon: 'home'},
                    {module: 'majors', text: '专业管理', icon: 'paper-plane-o'},
                    {module: 'courses', text: '科目管理', icon: 'sticky-note-o'},
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

