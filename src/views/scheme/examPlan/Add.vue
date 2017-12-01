<template>
    <div class="sys-plan-config">
        <BaseConf :planPaper="planPaper" @showNext="setPlanId"></BaseConf>
        <div v-if="plan_id">
            <RoomConf :planPaper="planPaper" :plan_id="plan_id"></RoomConf>
            <PaperConf :planPaper="planPaper" :plan_id="plan_id"></PaperConf>
        </div>
        <div class="conf-sure">
            <el-button type="primary" @click="submitForm">{{btnTxt}}</el-button>
        </div>
    </div>
</template>

<style>

</style>

<script>
import schemeApi from '@/api/scheme'
import BaseConf from './conf/BaseConf'
import RoomConf from './conf/RoomConf'
import PaperConf from './conf/PaperConf'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'sys-plan-config',
    data() {
        return {
            btnTxt: '返回',
            type: this.$route.query.type,
            plan_id: this.$route.query.planId || '',
            planPaper: {},
        };
    },
    components: {
        BaseConf,
        RoomConf,
        PaperConf,
    },
    methods: {
        setPlanId (val) {
            this.plan_id = val;
        },
        submitForm() {
            if( this.type == 'approve') {
                schemeApi.plansRelease({
                    plan_id: this.plan_id
                }).then((res)=>{
                    if(res.data.ret == 0){
                        layer.msg('审批成功！', {time: 2500, icon: 1})
                        this.$router.go(-1);
                    }else{
                        layer.msg(res.data.res_info, {time: 2500, icon: 2})
                    }
                })
            }else{
                this.$router.go(-1);
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        if(to.query.planId){
            schemeApi.plansPaperDetail({
                plan_id: to.query.planId
            }).then((res)=>{
                if(res.data.ret == 0){
                    next(vm => {
                        vm.planPaper = res.data.data
                    })
                }else{
                    layer.msg(res.data.res_info, {time: 2000, icon: 2})
                }
            });
        }else{
            next()
        }
    },
    mounted () {
        if( this.type == 'approve') {
            this.btnTxt = '审批'
        }
    }
}
</script>

<style>
.sys-plan-config .conf-sure { text-align: center; }
.sys-plan-config .conf-sure .el-button{ padding: 9px 60px; margin-top: 20px; }
</style>
