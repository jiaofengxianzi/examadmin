<template>
    <div class="sys-results">
        <ul class="tabs-nav clearfix">
            <li>
                <router-link to="unpublished"><span class="sp">待发布</span></router-link>
            </li>
            <li>
                <router-link to="published"><span class="sp">已发布</span></router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'sys-results'
    }
</script>

