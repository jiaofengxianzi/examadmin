<template>
    <div class="base-conf section">
        <div class="sear-tit">
            <a href="javascript:history.go(-1);" class="go-back">返回</a>步骤一：录入基本信息
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="计划名称：" prop="plan_name" class="item-plan-name">
                <el-input v-model="planName" readonly></el-input>
                <!-- 统一按考期+层次+科目的命名方式 -->
                <span class="ps">（计划名称自动生成）</span>
            </el-form-item>
            <el-form-item label="考期：" prop="plan_code">
                <el-input v-model="ruleForm.plan_code"></el-input>
            </el-form-item>
            <el-form-item label="预约开放时间：" class="item-inline clearfix" required>
                <el-col>
                    <el-form-item prop="order_start_date">
                        <el-date-picker v-model="ruleForm.order_start_date" type="datetime" :picker-options="pickerStart" @change="orderStartDateFormat" placeholder="开始时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <span class="line">-</span>
                <el-col>
                    <el-form-item prop="order_end_date">
                        <el-date-picker v-model="ruleForm.order_end_date" type="datetime" :picker-options="pickerEnd" @change="orderEndDateFormat" placeholder="结束时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="考试时间：" class="item-inline" required>
                <el-col>
                    <el-form-item prop="test_start_date">
                        <el-date-picker v-model="ruleForm.test_start_date" type="datetime" :picker-options="examPickerStart" @change="testStartDateFormat" placeholder="开始时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <span class="line">-</span>
                <el-col>
                    <el-form-item prop="test_end_date">
                        <el-date-picker v-model="ruleForm.test_end_date" type="datetime" :picker-options="examPickerEnd" @change="testEndDateFormat" placeholder="结束时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="层次：" class="item-inline clearfix" required>
                <el-col>
                    <el-form-item label-width="0" prop="level_id">
                        <el-select v-model="ruleForm.level_id" placeholder="请选择" @change="changeMajors">
                            <el-option  v-for="item in grades" :key="item.id" :label="item.level_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="专业：" label-width="60px" prop="specialty_id">
                        <el-select v-model="ruleForm.specialty_id" placeholder="请选择">
                            <el-option  v-for="item in majors" :key="item.id" :label="item.specialty_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item label="科目：" label-width="60px" prop="course_id">
                        <el-select v-model="ruleForm.course_id" placeholder="请选择">
                            <el-option  v-for="item in courses" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="考试费用：" prop="price">
                <el-input v-model.number="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label-width="0" class="btn-item">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style>

</style>

<script>
import schemeApi from '@/api/scheme'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'base-conf',
    props: ['planPaper'],
    data() {
        var checkPrice = (rule, value, callback) => {
            if(!value){
                callback(new Error('价格不能为空'))
            }
            if (isNaN(value) && parseFloat(value)) {
                callback(new Error('价格只能是数字'));
            }
            if(value.toString().split('.')[1] && value.toString().split('.')[1].length > 2 ){
                callback(new Error('价格只能保留两位小数（精确到分）'))
            }else{
                callback()
            }
        };
        var checkStartTestTime = (rule, value, callback) => {
            if(!value){
                callback(new Error('考试开始时间必须'))
            }else{
                callback()
            }
        };
        var checkEndTestTime = (rule, value, callback) => {
            if(!value){
                callback(new Error('考试结束时间必须'))
            }else{
                callback()
            }
        };
        return {
            plan_id: this.$route.query.planId || '',
            ruleForm: {
                level_id: '',
                course_id: '',
                order_start_date: '',
                order_end_date: '',
                plan_code: '',
                plan_name: '',
                price: '',
                specialty_id: '',
                test_start_date: '',
                test_end_date: '',
                remark: '',
            },
            rules: {
                plan_code: [
                    { required: true, required: true, message: '请输入考期', },
                ],
                test_start_date: [
                    { validator: checkStartTestTime, required: true },
                ],
                test_end_date: [
                    { validator: checkEndTestTime, required: true },
                ],
                order_start_date: [
                    { required: true, message: '预约开始时间必须', },
                ],
                order_end_date: [
                    { required: true, message: '预约结束时间必须', },
                ],
                price: [
                    { validator: checkPrice, required: true },
                ],
                level_id: [
                    { required: true, message: '请选择层次', }
                ],
                specialty_id: [
                    { required: true, message: '请选择专业', }
                ],
                course_ids: [
                    { required: true, message: '请选择科目', }
                ],
            },
            examPickerStart: {
                disabledDate: (time) => {
                    var endTime = new Date(this.ruleForm.test_end_date).getTime();
                    return time.getTime() > endTime || time.getTime() < endTime - 8.64e7;
                }
            },
            examPickerEnd: {
                disabledDate: (time) => {
                    var startTime = new Date(this.ruleForm.test_start_date).getTime();
                    return time.getTime() < startTime - 8.64e7 || time.getTime() > startTime;
                }
            },
            pickerStart: {
                disabledDate: (time) => {
                    var endTime = new Date(this.ruleForm.order_end_date).getTime();
                    return time.getTime() > endTime - 8.64e7;
                }
            },
            pickerEnd: {
                disabledDate: (time) => {
                    var startTime = new Date(this.ruleForm.order_start_date).getTime();
                    return time.getTime() < startTime;
                }
            },
        };
    },
    computed: {
        ...mapGetters({
            grades: 'allGrades',
            majors: 'allMajors',
            courses: 'allCourses',
        }),
        planName () {
            var levelName = '',
                courseName = '';
            if(this.grades.length && this.ruleForm.level_id){
                levelName = this.grades.find(item => item.id == this.ruleForm.level_id).level_name
            }
            if(this.courses.length && this.ruleForm.course_id){
                courseName = this.courses.find(item => item.id == this.ruleForm.course_id).name
            }
            return this.ruleForm.plan_code + levelName + courseName
        }
    },
    methods: {
        ...mapActions([
            'getGrades',
            'getMajors',
            'getCourses',
        ]),
        changeMajors (val) {
            this.ruleForm.specialty_id = '';
            this.getMajors(val);
        },
        submitForm(formName) {
            var _this = this;
            var params = this.ruleForm;
            params.plan_name = _this.planName;
            if(this.plan_id){
                params.plan_id = this.plan_id
            }
            if(new Date(params.order_start_date).getTime() > new Date(params.order_end_date).getTime()){
                layer.msg('预约开始时间必须早于结束时间', {time: 2500, icon: 2})
                return;
            }
            if(new Date(params.test_start_date).getTime() > new Date(params.test_end_date).getTime()){
                layer.msg('考试开始时间必须早于结束时间', {time: 2500, icon: 2})
                return;
            }
            if(new Date(params.test_start_date).getTime() < new Date(params.order_end_date).getTime()){
                layer.msg('预约开放时间必须早于考试时间', {time: 2500, icon: 2})
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    schemeApi.plansAdd(params).then((res)=>{
                        if(res.data.ret == 0){
                            layer.msg('保存成功！', {time: 2500, icon: 1})
                            _this.$emit('showNext', res.data.data.plan_id);
                        }else{
                            layer.msg(res.data.res_info, {time: 2500, icon: 2})
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        testStartDateFormat (val) {
            this.ruleForm.test_start_date = val;
        },
        testEndDateFormat (val) {
            this.ruleForm.test_end_date = val;
        },
        orderStartDateFormat (val) {
            this.ruleForm.order_start_date = val;
        },
        orderEndDateFormat (val) {
            this.ruleForm.order_end_date = val;
        },
    },
    watch: {
        planPaper (curVal, oldVal) {
            if(!curVal){
                return false;
            }
            var objClone = JSON.parse(JSON.stringify(curVal));
            Object.keys(this.ruleForm).forEach((key, index)=>{
                this.ruleForm[key] = objClone[key]
            })
            this.ruleForm = Object.assign({}, this.ruleForm, {level_id: curVal.level_info.id});
            var timer = setTimeout(()=>{
                clearTimeout(timer);
                this.ruleForm.specialty_id = curVal.specialty_id;
            }, 0)
        }
    },
    mounted () {
        this.getGrades();
        this.getCourses();
    }
}
</script>

