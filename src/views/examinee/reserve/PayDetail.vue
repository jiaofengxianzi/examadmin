<template>
    <div class="sys-pay-detail">
        <div class="err" v-if="orderDetail.ret != 0">
            {{orderDetail.res_info}}
        </div>
        <div v-else>
            <div class="row">缴费状态：<span>{{orderDetail.data.status | txt(statusArr)}}</span></div>
            <div class="row">缴费金额：<span>￥{{orderDetail.data.amount}}</span></div>
            <div class="row">缴费单号：<span>{{orderDetail.data.oid}}</span></div>
            <el-button type="primary" @click="sure">确认</el-button>
        </div>
    </div>
</template>

<script>
import examineeApi from '@/api/examinee'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'pay-detail',
    props: ['pay'],
    data () {
        return {
            orderDetail: {},
            statusArr: [
                {
                    value: '0',
                    label: '已创建'
                }, 
                {
                    value: '1',
                    label: '已支付'
                },
                {
                    value: '2',
                    label: '取消支付'
                },
                {
                    value: '3',
                    label: '支付过期'
                },
                {
                    value: '4',
                    label: '支付失败'
                },
                {
                    value: '5',
                    label: '已回调，但超过支付'
                },
            ]
        }
    },
    methods: {
        sure () {
            this.pay.dialogVisible = false;
        }
    },
    filters: {
        txt (val, arr) {
            return arr.find(item => item.value == val).label
        }
    },
    mounted () {
        examineeApi.orderDetails({oid: this.pay.oid}).thne((res) => {
            this.orderDetail = res.data
        })
    }
}
</script>

<style>
.sys-pay-detail .row{ font-size: 14px; padding-left: 145px; color: #292929; margin-top: 25px; }
.sys-pay-detail .row span{ color: #606060; }
.sys-pay-detail .el-button{ display: block; width: 200px; margin: 72px auto 0; }
</style>
