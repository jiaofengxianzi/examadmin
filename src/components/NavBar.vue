<template>
    <div class="nav">
        <div class="logo"></div>
        <ul class="nav-list">
            <li v-for="item in navList" :key="item.module">
                <router-link :to="path + '/' + item.module">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import commonApi from '@/api/common'

    export default {
        name: 'nav',
        data () {
            return {
                navList: this.$store.state.userInfo.cat_list || []
            }
        },
        computed: {
            //进入路径
            path () {
                return this.$store.state.routerMatched[0].path
            }
        },
    }
</script>


