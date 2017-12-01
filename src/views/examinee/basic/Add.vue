<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="准考证号码：" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码：" prop="user_card_id">
                <el-input v-model="ruleForm.user_card_id"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="mobile">
                <el-input v-model.number="ruleForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="报考城市：" prop="city_id">
                <el-select v-model="ruleForm.city_id" filterable  placeholder="请选择" filterable>
                    <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="层次：" prop="level_id">
                <el-select v-model="ruleForm.level_id" filterable placeholder="请选择" @change="changeMajors">
                    <el-option  v-for="item in grades" :key="item.id" :label="item.level_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="专业：" prop="specialty_id">
                <el-select v-model="ruleForm.specialty_id" filterable placeholder="请选择">
                    <el-option  v-for="item in majors" :key="item.id" :label="item.specialty_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="教学点：" prop="teaching_place">
                <el-input v-model="ruleForm.teaching_place"></el-input>
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
import examineeApi from '@/api/examinee'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'sys-add',
    props: ['hand'],
    data() {
        var checkPhone = (rule, value, callback)=>{
            if(!value){
                callback(new Error('手机号不能为空'))
            }
            if (value.toString().length != 11 || isNaN(value) || !Number.isInteger(parseFloat(value))) {
                callback(new Error('手机号必须是11位数字'));
            }else{
                callback()
            }
        }
        return {
            ruleForm: {
                //this.hand.data
                action_type: this.hand.data.action_type,
                id: [this.hand.data.id] || '',
                number: this.hand.data.number || '',
                name: this.hand.data.name || '',
                user_card_id: this.hand.data.users && this.hand.data.users.user_card_id,
                mobile: this.hand.data.mobile || '',
                city_id: this.hand.data.city_id || '',
                level_id: this.hand.data.level_id || '',
                specialty_id: this.hand.data.specialty_id || '',
                teaching_place: this.hand.data.teaching_place || '',
                remark: this.hand.data.remark || '',
            },
            rules: {
                number: [
                    { required: true, message: '准考证号必填', trigger: 'blur' },
                    { min: 12, max: 12, message: '长度为12的字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '姓名必填', trigger: 'blur' },
                    { min: 1, max: 26, message: '超出规格的名字', trigger: 'blur' }
                ],
                user_card_id: [
                    { required: true, message: '身份证必填', trigger: 'blur' },
                    { min: 15, max: 18, message: '身份证号格式不正确', trigger: 'blur' }
                ],
                mobile: [
                    { validator: checkPhone, required: true },
                ],
                city_id: [
                    { required: true, message: '请选择城市', },
                ],
                level_id: [
                    { required: true, message: '请选择层次', },
                ],
                specialty_id: [
                    { required: true, message: '请选择专业', },
                ],
                teaching_place: [
                    { required: true, message: '教学点必填', trigger: 'blur' },
                ],
            }
        };
    },
    computed: {
        ...mapGetters({
            citys: 'allCitys',
            grades: 'allGrades',
            majors: 'allMajors',
        })
    },
    methods: {
        ...mapActions([
            'getCitys',
            'getGrades',
            'getMajors',
        ]),
        changeMajors (val) {
            this.ruleForm.specialty_id = '';
            this.getMajors(val);
        },
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   examineeApi.studentsManage(_this.ruleForm).then((res)=>{
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
        this.getCitys()
        this.getGrades()
        this.getMajors(this.ruleForm.level_id);
    }
}
</script>

