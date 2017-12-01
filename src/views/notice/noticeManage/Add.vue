<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
            <el-form-item label="标题：" prop="title">
                <el-input v-model="ruleForm.title" class="title"></el-input>
            </el-form-item>
            <el-form-item label="内容：">
                <textarea id="ckeditor" v-model="ruleForm.body" class="ckeditor" ></textarea>
            </el-form-item>
            <el-form-item label="附件：">
                <el-input :readonly="true" v-model="ruleForm.fileName" style="width: 200px"></el-input>
                <el-button id="fileSelect" @click="fileSelect">选择文件</el-button>
                <div class="hide">
                    <input type="file" class="fileContr" @change="fileChange($event)">
                </div>
            </el-form-item>
            <el-form-item class="btn-form-item">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import noticeApi from '@/api/notice'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'sys-add',
    props: ['hand'],
    data() {
        return {
            ruleForm: {
                title: this.hand.data.title,
                body: this.hand.data.body,
                file: '',
                fileName: this.hand.data.upload_file,
            },
            rules: {
                title: [
                    { required: true, message: '标题不能为空', },
                ],
            }
        };
    },
    methods: {
        fileSelect () {
            $('.fileContr').click();
        },
        fileChange (e) {
            this.ruleForm.fileName = e.target.files[0].name
            this.ruleForm.file = e.target.files[0]
        },
        addNotice (formData) {
            noticeApi.addNotice(formData).then((res)=>{
                if(res.data.ret == 0){
                    layer.msg('提交成功！', {time: 2000, icon: 1})
                    this.$emit('reload');
                    var timer = setTimeout(()=>{
                        clearTimeout(timer);
                        this.hand.dialogVisible = false;
                    }, 2000)
                }else{
                    layer.msg(res.data.res_info, {time: 2500, icon: 2})
                }
            })
        },
        updateNotice (formData) {
            noticeApi.updateNotice(formData).then((res)=>{
                if(res.data.ret == 0){
                    layer.msg('提交成功！', {time: 2000, icon: 1})
                    this.$emit('reload');
                    var timer = setTimeout(()=>{
                        clearTimeout(timer);
                        this.hand.dialogVisible = false;
                    }, 2000)
                }else{
                    layer.msg(res.data.res_info, {time: 2500, icon: 2})
                }
            })
        },
        submitForm(formName) {
            var _this = this;
            var body = CKEDITOR.instances.ckeditor.getData();
            if(body == ''){
                layer.msg('通知消息不能为空', {time: 2500, icon: 2})
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var formData = new FormData();
                    formData.append('title', _this.ruleForm.title)
                    formData.append('body', body)
                    if(_this.ruleForm.file){
                        formData.append('file', _this.ruleForm.file)
                    }
                    if(_this.hand.data.id){
                        formData.append('id', _this.hand.data.id)
                        _this.updateNotice(formData);
                    }else{
                        _this.addNotice(formData);
                    }
                } else {
                    return false;
                }
            });
        }
    },
    mounted () {
        CKEDITOR.replace("ckeditor", {height: "300px", width: "100%", });
    }
}
</script>

<style>
.sys-add .title .el-input__inner{ width: 520px; }
.sys-add .hide{ width: 0; height: 0; overflow: hidden; opacity: 0; }
.sys-add .ckeditor{ height: 400px; width: 100%; }
</style>
