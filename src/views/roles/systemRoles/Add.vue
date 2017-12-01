<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="角色：" prop="role_name">
                <el-select v-model="ruleForm.role_name[0]"  placeholder="请选择" filterable>
                    <el-option  v-for="item in roles" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item> -->
            <el-form-item class="btn-form-item">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import rolesApi from '@/api/roles'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'RolesAdd',
    props: ['hand'],
    data() {
        return {
            ruleForm: {
                name: '',
                role_name: [''],
                remark: ''
            },
            rules: {
                name: [
                    { required: true, message: '用户名必填' },
                ],
                role_name: [
                    { required: true, message: '请选择角色'},
                ],
            }
        };
    },
    computed: {
        ...mapGetters({
            roles: 'allRoles',
        })
    },
    methods: {
        ...mapActions([
            'getRoles',
        ]),
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   rolesApi.addUserRole(_this.ruleForm).then((res)=>{
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
    mounted () {
        this.getRoles()
    }
}
</script>

