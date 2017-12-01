<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="考点名称：" prop="place_name">
                <el-input v-model="ruleForm.place_name"></el-input>
            </el-form-item>
            <el-form-item label="考点归属：" prop="city_id">
                <el-select v-model="ruleForm.city_id" filterable placeholder="城市">
                    <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址：" prop="address">
                <el-input type="text" v-model="ruleForm.address"></el-input>
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
                place_id: this.hand.data.id || '',
                place_name: this.hand.data.place_name || '',
                city_id: this.hand.data.city_id || '',
                address: this.hand.data.address || '',
                remark: this.hand.data.remark || '',
                dict_type: this.hand.data.dict_type
            },
            rules: {
                place_name: [
                    { required: true, message: '请输入考点名称', trigger: 'blur' },
                ],
                city_id: [
                    { required: true, message: '请选择考点归属', }
                ],
                address: [
                    { required: true, message: '请填写详细地址', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            citys: 'allCitys',
        })
    },
    methods: {
        ...mapActions([
            'getCitys',
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

