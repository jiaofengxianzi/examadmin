<template>
    <div class="sys-detail">
        <h1>{{noticeDetail.title}}</h1>
        <div class="article" v-html="noticeDetail.body">
            {{noticeDetail.body}}
        </div>
        <div class="accessory" v-if="noticeDetail.upload_file">
            <a :href="noticeDetail.upload_file || 'javascript:;'" download>附件下载</a>
        </div>
    </div>
</template>

<script>
import noticeApi from '@/api/notice'
export default {
    name: 'sys-detail',
    props: ['noticeItem'],
    data () {
        return {
            noticeDetail: {},
            // host: api_host
        }
    },
    mounted () {
        noticeApi.getNoticeDetail({id: this.noticeItem.data.id}).then((res)=>{
            if(res.data.ret == 0){
                this.noticeDetail = res.data.data
            }else{
                layer.msg(res.data.res_info, {time: 2000, icon: 2})
            }
        });
    }
}
</script>

<style>
.sys-detail h1{ font-size: 24px; text-align: center; }
.sys-detail .article{ min-height: 450px; max-height: 500px; overflow-y: scroll; }
.sys-detail .accessory{ margin-top: 10px; }
.sys-detail .accessory a{ color: #125b64; }
</style>
