<template>
    <div class="paging clearfix" v-if="parseInt(this.searchRecord.count) > parseInt(this.searchRecord.page_size)">
        <el-button class="btn-goto" @click="goto">GO</el-button>
        <div class="inpt-num">
            第<el-input v-model="page"></el-input>页
        </div>
        <a href="javascript:;" class="pre" :class="{'disabled': preActive}" @click="prePage">上一页</a>
        <span class="page">{{searchRecord.page_no}}/{{pageTotal}}</span>
        <a href="javascript:;" class="next" :class="{'disabled': nextActive}" @click="nextPage">下一页</a>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        name: 'paging',
        props: ['searchRecord'],
        data () {
            return {
                page: '',
            }
        },
        computed: {
            pageTotal () {
                return Math.ceil(this.searchRecord.count/this.searchRecord.page_size) || 1
            },
            preActive () {
                return this.searchRecord.page_no > 1 ? false : true
            },
            nextActive () {
                return this.searchRecord.page_no >= this.pageTotal ? true : false
            },
        },
        methods: {
            prePage () {
                if(this.searchRecord.page_no <= 1){
                    return;
                }
                this.searchRecord.page_no --
                if( this.searchRecord.page_no <= 1) {
                    this.searchRecord.page_no = 1;
                }
                if(!this.preActive || this.searchRecord.page_no >= 1){
                    this.jump();
                }
            },
            nextPage () {
                if(this.searchRecord.page_no >= this.pageTotal){
                    return;
                }
                this.searchRecord.page_no ++
                if( this.searchRecord.page_no >= this.pageTotal ){
                    this.searchRecord.page_no = this.pageTotal
                }
                if(!this.nextActive || this.searchRecord.page_no <= this.pageTotal){
                    this.jump();
                }
            },
            goto () {
                if(this.page && this.page <= this.pageTotal){
                    this.searchRecord.page_no = this.page;
                    this.page = '';
                    this.jump();
                }
            },
            jump () {
                this.$emit('reload');
            }
        },
    }
</script>

