<template>
    <div class="answer">
        <div class="control">
            <form class="file-form">
                <span class="file-label">模板文件：</span>
                <el-input :readonly="true" v-model="fileName" style="width: 200px"></el-input>
                <el-button id="fileSelect" @click="fileSelect">选择文件</el-button>
                <el-button type="primary" @click="upload">上传</el-button>
                <div class="hide">
                    <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="fileContr" @change="fileChange($event)">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props:['resultForm'],
    data(){
        return {
            fileName: '',
            file: '',
            url:　this.$route.query.url,
            id: this.resultForm.id,
        }
    },
    methods: {
        fileSelect () {
            $('.fileContr').click();
        },
        upload () {
            var _this = this;
            var formData = new FormData();
            //操作类型
            formData.append('action_type', this.resultForm.action_type);
            //题干
            if( !CKEDITOR.instances.editor.getData() ){
                layer.msg('还没有题干！', { time: 2500, icon: 2})
                return;
            }
            formData.append('body',CKEDITOR.instances.editor.getData());
            //课程id
            formData.append('course_id', this.resultForm.course_id);
            //附件
            formData.append('file',this.file);
            //试题类型，附件题
            formData.append('type', this.resultForm.type);
            //课程ID
            if(this.id){
                formData.append('id',this.id);
            }
            _this.$axios.post('item/uploaditem', formData).then((req)=>{
                if(req.data.ret == 0){
                    layer.msg('操作成功！', { time: 2500, icon: 1})
                    _this.$emit('loadone')
                }else{
                    layer.msg(req.data.res_info, { time: 2500, icon: 2})
                }
            })
        },
        fileChange (e) {
            this.fileName = e.target.files[0].name
            this.file = e.target.files[0];
        },
    },
}
</script>
<style scoped>
    .hide{ display: none; }
    .file-label{  float: left; width: 80px; line-height: 34px; }
</style>
