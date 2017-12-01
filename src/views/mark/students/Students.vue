<template>
    <div class="Students">
        <ul class="tabs-nav clearfix">
            <li>
                <router-link to="undecided"><span class="sp">未评</span></router-link>
            </li>
            <li>
                <router-link to="resolved"><span class="sp">已评</span></router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'Students'
    }
</script>

