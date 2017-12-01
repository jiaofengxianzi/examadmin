<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="题型：" prop="type">
                <el-select v-model="ruleForm.type" filterable placeholder="请选择">
                    <el-option v-for="item in questType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分值：" prop="value">
                <el-input v-model="ruleForm.value"></el-input>
            </el-form-item>
            <el-form-item label="数量：" prop="total">
                <el-input v-model.number="ruleForm.total"></el-input>
                <span class="ps">单题得分必须能被0.5整除</span>
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
    props: ['hand', 'dataArr'],
    data() {
        return {
            ruleForm: {
                type: this.hand.data.type || '',
                value: this.hand.data.value || '',
                total: this.hand.data.total || '',
            },
            rules: {
                type: [
                    { required: true, message: '请选择题型',  },
                ],
                value: [
                    { required: true, message: '请输入总分值', },
                ],
                total: [
                    { required: true, message: '请输入数量',  }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            questType: 'allquestionsTypes',
        }),
    },
    methods: {
        ...mapActions([
            'getQuestionsTypes',
        ]),
        submitForm(formName) {
            var _this = this;
            if(_this.ruleForm.value%_this.ruleForm.total != 0){
                layer.msg('每题分值必须是0.5的倍数！', {time: 2500, icon: 2})
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.hand.dialogVisible = false;
                    if (_this.hand.title == '添加'){
                        _this.dataArr.push(_this.ruleForm)
                    }
                    if (_this.hand.title == '修改'){
                        this.dataArr.splice(_this.hand.index, 1, _this.ruleForm)
                    }
                } else {
                    return false;
                }
            });
        }
    },
    mounted () {
        this.getQuestionsTypes()
    }
}
</script>

