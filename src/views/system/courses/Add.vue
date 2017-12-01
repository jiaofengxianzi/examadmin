<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="科目名称：" prop="course_name">
                <el-input v-model="ruleForm.course_name"></el-input>
            </el-form-item>
            <el-form-item label="科目代码：" prop="course_code">
                <el-input v-model="ruleForm.course_code" placeholder="长度为5的字符"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item class="btn-form-item">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'sys-add',
    props: ['hand'],
    data() {
        return {
            ruleForm: {
                action_type: this.hand.data.action_type || '',
                course_id: this.hand.data.id || '',
                course_name: this.hand.data.name || '',
                course_code: this.hand.data.course_code || '',
                remark: this.hand.data.remark || '',
                dict_type: this.hand.data.dict_type
            },
            rules: {
                course_name: [
                    { required: true, message: '请输入科目名称', },
                ],
                course_code: [
                    { required: true, message: '请输入科目代码', },
                    { min: 5, max: 5, message: '科目代码只能是5位字符', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        ...mapActions([
            'systemset',
        ]),
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.systemset({
                        ...this.ruleForm
                    }).then((res)=>{
                        _this.$emit('reload');
                        _this.hand.dialogVisible = false;
                        layer.msg('提交成功！', {time: 2000, icon: 1})
                    })
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

