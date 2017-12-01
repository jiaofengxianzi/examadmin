<template>
    <div class="roles">
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
        name: 'Roles',
        data () {
            return {
                sideNavList: [
                    {module: 'account', text: '账号管理', icon: 'gear'},
                    {module: 'systemRoles', text: '账号角色', icon: 'user-o'},
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

