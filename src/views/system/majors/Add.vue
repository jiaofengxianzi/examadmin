<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="专业名称：" prop="specialty_name">
                <el-input v-model="ruleForm.specialty_name"></el-input>
            </el-form-item>
            <el-form-item label="专业代码：" prop="specialty_code">
                <el-input v-model="ruleForm.specialty_code" placeholder="长度为7的字符"></el-input>
            </el-form-item>
            <el-form-item label="层次：" prop="level_id">
                <el-select v-model="ruleForm.level_id" filterable placeholder="请选择">
                    <el-option  v-for="item in grades" :key="item.id" :label="item.level_name" :value="item.id"></el-option>
                </el-select>
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
        // var checkCode = (rule, value, callback) => {
        //     if(!value){
        //         callback(new Error('专业代码不能为空'))
        //     }
        //     if (value.toString().length != 7) {
        //         callback(new Error('只能是7位字符'));
        //     }else{
        //         callback()
        //     }
        // };
        return {
            ruleForm: {
                action_type: this.hand.data.action_type || '',
                specialty_id: this.hand.data.id || '',
                specialty_name: this.hand.data.specialty_name || '',
                specialty_code: this.hand.data.specialty_code || '',
                level_id: this.hand.data.level_id || '',
                remark: this.hand.data.remark || '',
                dict_type: this.hand.data.dict_type
            },
            rules: {
                specialty_name: [
                    { required: true, message: '请输入专业名称',  },
                ],
                specialty_code: [
                    { required: true, message: '请输入专业代码', },
                    { min: 7, max: 7, message: '专业代码只能是7位字符', trigger: 'blur' }
                ],
                level_id: [
                    { required: true, message: '请选择层次',  }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            grades: 'allGrades',
        })
    },
    methods: {
        ...mapActions([
            'getGrades',
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

