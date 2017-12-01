<template>
    <div class="sys-upload">
        <ul class="list">
            <!-- <li>
                <span class="txt">
                    1、下载模板
                </span>
                <el-button>下载模板</el-button>
            </li> -->
            <li>
                <form class="file-form">
                    <!-- <span class="txt">
                        上传文件
                    </span> -->
                    <el-input :readonly="true" v-model="fileName" style="width: 200px" @click.native="fileSelect"></el-input>
                    <el-button id="fileSelect" @click="fileSelect">选择文件</el-button>
                    <el-button type="primary" @click="upload">上传</el-button>
                    <div class="hide">
                        <input type="file" accept="" class="fileContr" @change="fileChange($event)">
                    </div>
                </form>
            </li>
        </ul>
        <div class="ps">
            PS：导入过程中请耐心等待，不要进行其他操作或者关闭浏览器，以免影响数据完整性。
        </div>
    </div>
</template>

<script>
import monitorApi from '@/api/monitor'
export default {
    name: 'sys-upload',
    props: ['hand'],
    data () {
        return {
            fileName: '',
            file: '',
            sucRows: 0,
            totalRows: 0,
            items: [],
        }
    },
    methods: {
        fileSelect () {
            $('.fileContr').click();
        },
        upload () {
            var _this = this;
            var formData = new FormData();
            formData.append('paper_id', this.hand.data.id)
            formData.append('upload_file', this.file)
            monitorApi.examPaperUpload(formData).then((res)=>{
                if(res.data.ret == 0){
                    _this.$emit('reload');
                    _this.hand.dialogVisible = false;
                    layer.msg('上传成功！', { time: 2000, icon: 1})
                }else{
                    layer.msg(res.data.res_info, { time: 2500, icon: 2})
                }
            })
        },
        fileChange (e) {
            this.fileName = e.target.files[0].name
            this.file = e.target.files[0]
        }
    }
}
</script>

<style>
.sys-upload .hide{ width: 0; height: 0; opacity: 0; overflow: hidden;}
.sys-upload li{ margin-bottom: 10px; font-size: 16px; }
.sys-upload li .txt{ margin-right: 15px; }
.sys-upload .ps{ color: #f06966; }
</style>
