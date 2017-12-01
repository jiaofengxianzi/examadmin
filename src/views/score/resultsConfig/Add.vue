<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item v-if="type == 'add'" label="考试计划名称：" prop="id">
                <el-select v-model="ruleForm.id" filterable clearable placeholder="考试计划">
                    <el-option  v-for="item in plans" :key="item.id" :label="item.plan_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="平时成绩分数：" prop="score">
                <el-input v-model.number="ruleForm.score"></el-input>
            </el-form-item>
            <el-form-item class="btn-form-item">
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import scoreApi from '@/api/score'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'sys-add',
    props: ['hand'],
    data() {
        return {
            ruleForm: {
                id: this.hand.data && this.hand.data.id,
                score: this.hand.data && this.hand.data.planScore,
            },
            type: this.hand.type,
            rules: {
                id: [
                    { required: true, message: '请输入考试计划名称', },
                ],
                score: [
                    { required: true, message: '请输入平时成绩分数', },
                    { type: 'number', message: '成绩只能是数字', },
                ],
            }
        };
    },
    computed: {
        ...mapGetters({
            plans: 'allPlans',
        })
    },
    methods: {
        ...mapActions([
            'getPlans',
        ]),
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    scoreApi.scoreAdd({
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
    },
    mounted () {
        this.getPlans();
    }
}
</script>

