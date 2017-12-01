<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item v-if="type == 'add'" label="密码：" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item v-if="type == 'add'" label="确认密码：" prop="repassword">
                <el-input type="password" v-model="ruleForm.repassword"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名：" prop="real_name">
                <el-input v-model="ruleForm.real_name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model="ruleForm.mobile"></el-input>
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
import rolesApi from '@/api/roles'

export default {
    name: 'RolesAdd',
    props: ['hand'],
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.repassword !== '') {
                    this.$refs.ruleForm.validateField('repassword');
                } 
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            type: this.hand.type,
            ruleForm: {
                admin_id: this.hand.data.id || '',
                username: this.hand.data.username || '',
                password: '',
                repassword: '',
                real_name: this.hand.data.real_name || '',
                mobile: this.hand.data.mobile || '',
                remark: this.hand.data.remark || ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名必填' },
                ],
                password: [
                    { required: true, validator: validatePass, trigger: 'blur' },
                ],
                repassword: [
                    { required: true, validator: validatePass2, trigger: 'blur' },
                ],
                real_name: [
                    { required: true, message: '姓名不能为空'},
                ],
            }
        };
    },
    methods: {
        submit (type, params) {
            if(type == 'add'){
                return rolesApi.addAccount(params)
            }else{
                return rolesApi.updateAccount(params)
            }
        },
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   this.submit(_this.type, _this.ruleForm).then((res)=>{
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

