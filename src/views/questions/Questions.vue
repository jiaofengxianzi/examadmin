<template>
    <div class="questions">
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
        name: 'questions',
        data () {
            return {
                sideNavList: [
                    {module: 'questype', text: '题型管理', icon: 'leaf'},
                    {module: 'questest', text: '考题管理', icon: 'book'},
                ]
            }
        },
        components: {
            SideNav,NavShrink
        },
        computed: {
            pageMsg () {
                return this.$store.state.pageTit
            }
        },
        mounted () {
            this.$store.dispatch('setPageTit', $('.side-nav .router-link-active').text().trim());
        }
    }
</script>

