<template>
    <div class="paper-detail">
        <div class="section">
            <div class="sear-tit">
                <a href="javascript:history.go(-1);" class="go-back">返回</a>
                试卷详情
            </div>
        </div>
        
        <div class="tips" v-if="type == 1">此试卷为样本，仅供参考</div>
        <Paper v-if="items.length" :paperItems="items"></Paper>
    </div>
</template>

<style>

</style>

<script>
import schemeApi from '@/api/scheme'
import Paper from '@/components/Paper'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'PaperDetail',
    data() {
        return {
            items: [],
            type: this.$route.query.type
        };
    },
    components: {
        Paper,
    },
    beforeRouteEnter (to, from, next) {
        if( to.query.type == 1){
            schemeApi.paperExample({
                plan_id: to.query.planId
            }).then((res)=>{
                if(res.data.ret == 0){
                    next(vm => {
                        vm.items = res.data.data.data
                    })
                }else{
                    layer.msg(res.data.res_info, {time: 2000, icon: 2})
                }
                
            });
        }else{
            schemeApi.paperDetail({
                plan_id: to.query.planId
            }).then((res)=>{
                if(res.data.ret == 0){
                    next(vm => {
                        vm.items = res.data.data.data
                    })
                }else{
                    layer.msg(res.data.res_info, {time: 2000, icon: 2})
                }
            });
        }
    }
}
</script>

<style scoped>
    .paper-detail .tips { font-size: 14px; line-height: 1; color: #ff4949; margin-bottom: 10px;}
</style>