<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码：" prop="old_password">
                <el-input type="password" v-model="ruleForm.old_password"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="new_password">
                <el-input type="password" v-model="ruleForm.new_password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="new_password2">
                <el-input type="password" v-model="ruleForm.new_password2"></el-input>
            </el-form-item>
            <el-form-item class="btn-form-item">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import rolesApi from '@/api/roles'

export default {
    name: 'RolesAdd',
    props: ['hand'],
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.new_password2 !== '') {
                    this.$refs.ruleForm.validateField('new_password2');
                } 
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.new_password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            type: this.hand.type,
            ruleForm: {
                admin_id: this.hand.data.id || '',
                old_password: '',
                new_password: '',
                new_password2: '',
            },
            rules: {
                old_password: [
                    { required: true, message: '旧密码必填' },
                ],
                new_password: [
                    { required: true, validator: validatePass, trigger: 'blur' },
                ],
                new_password2: [
                    { required: true, validator: validatePass2, trigger: 'blur' },
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   rolesApi.resetPassword(_this.ruleForm).then((res)=>{
                        if(res.data.ret == 0){
                            _this.hand.dialogVisible = false;
                            layer.msg('提交成功！', {time: 2000, icon: 1})
                            _this.$emit('reload');
                        }else{
                            layer.msg(res.data.res_info, {time: 2500, icon: 2})
                        }
                    })
                } else {
                    return false;
                }
            });
        }
    },
}
</script>

