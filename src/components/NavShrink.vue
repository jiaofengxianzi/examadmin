<template>
    <div class="shrink" :class="{'shr-right': isShowManual}" @click="setIsShowManual(!isShowManual)"></div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'shrink',
        computed: {
            ...mapState({
                isShowManual: state => state.isShowManual
            }),
        },
        methods: {
            ...mapActions([
                'setIsShowManual'
            ]),
        }, 
    }
</script>


