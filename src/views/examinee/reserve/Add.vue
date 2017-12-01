<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!-- <el-form-item label="教学点：" prop="teaching_place">
                <el-input v-model="ruleForm.teaching_place"></el-input>
            </el-form-item> -->
            <el-form-item label="报名编号：" prop="baoming_no">
                <el-input v-model="ruleForm.baoming_no"></el-input>
            </el-form-item>
            <el-form-item label="准考证号码：" prop="number">
                <el-input v-model="ruleForm.number" @blur="initPlace($event.target.value)"></el-input>
            </el-form-item>
            <!-- <el-form-item label="报考城市：" prop="city_id">
                <el-select v-model="ruleForm.city_id" filterable placeholder="请选择"  @change="changeRooms">
                    <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="考点：" prop="exam_place_id">
                <el-select v-model="ruleForm.exam_place_id" filterable placeholder="请选择"  @change="changeRooms">
                    <el-option  v-for="item in venues" :key="item.id" :label="item.place_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="考场：" prop="exam_room_id">
                <el-select v-model="ruleForm.exam_room_id" filterable placeholder="请选择">
                    <el-option  v-for="item in rooms" :key="item.id" :label="item.room_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="座位号：" prop="seat_no">
                <el-input v-model="ruleForm.seat_no"></el-input>
            </el-form-item>
            <el-form-item label="考试计划：" prop="plan_id">
                <el-select v-model="ruleForm.plan_id" filterable placeholder="请选择">
                    <el-option  v-for="item in plans" :key="item.id" :label="item.plan_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预约状态：" prop="status">
                <el-select v-model="ruleForm.status" filterable placeholder="请选择">
                    <el-option  v-for="item in statusArr" :key="item.id" :label="item.label" :value="item.value"></el-option>
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
import examineeApi from '@/api/examinee'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'sys-add',
    props: ['hand'],
    data() {
        return {
            ruleForm: {
                //this.hand.data
                action_type: this.hand.data.action_type,
                id: [this.hand.data.id] || '',
                // teaching_place: this.hand.data.teaching_place || '',
                baoming_no: this.hand.data.baoming_no || '',
                oid: this.hand.data.oid || '',
                number: this.hand.data.with_ticket && this.hand.data.with_ticket.number,
                // city_id: this.hand.data.with_bk_city && this.hand.data.with_bk_city.city_name || '',
                exam_place_id: this.hand.data.examplace && this.hand.data.examplace.id || '',
                exam_room_id: this.hand.data.examroom && this.hand.data.examroom.id,
                seat_no: this.hand.data.seat_no || '',
                plan_id: this.hand.data.with_plan && this.hand.data.with_plan.id,
                status: this.hand.data.status || '',
                remark: this.hand.data.remark || '',
            },
            rules: {
                number: [
                    { required: true, message: '准考证号必填', },
                    { min: 12, max: 12, message: '长度为12的字符', trigger: 'blur' }
                ],
                // teaching_place: [
                //     { required: true, message: '教学点必填', },
                // ],
                baoming_no: [
                    { required: true, message: '报名编号必填', },
                ],
                // city_id: [
                //     { required: true, message: '请选择城市', trigger: 'blur' },
                // ],
                exam_place_id: [
                    { required: true, message: '请选择考点', },
                ],
                exam_room_id: [
                    { required: true, message: '请选择考场', },
                ],
                seat_no: [
                    { required: true, message: '座位号必填', },
                ],
                plan_id: [
                    { required: true, message: '请选择报考科目名称', },
                ],
                status: [
                    { required: true, message: '请选择预约状态', },
                ],
            },
            statusArr: [
                {
                    value: 0,
                    label: '初始化'
                }, 
                {
                    value: 1,
                    label: '已确认'
                },
                {
                    value: 2,
                    label: '已支付'
                },
                {
                    value: 3,
                    label: '支付失败'
                },
                {
                    value: 4,
                    label: '取消预约'
                },
                {
                    value: 5,
                    label: '已到场'
                },
                {
                    value: 6,
                    label: '未到场'
                },
                {
                    value: 7,
                    label: '预约成功'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            venues: 'allVenues',
            citys: 'allCitys',
            rooms: 'allRooms',
            plans: 'allPlans',
            // cityId: 'cityId'
        })
    },
    methods: {
        ...mapActions([
            'getExaminees',
            // 'getCityId',
            'getCitys',
            'getVenues',
            'getRooms',
            'getPlans',
        ]),
        changeRooms (val) {
            this.ruleForm.exam_room_id = '';
            this.getRooms(val);
        },
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    examineeApi.reserveManage( _this.ruleForm).then((res)=>{
                        if(res.data.ret == 0){
                            _this.hand.dialogVisible = false;
                            layer.msg('提交成功！', {time: 2500, icon: 1})
                            _this.$emit('reload');
                        }else{
                            layer.msg(res.data.res_info, {time: 2500, icon: 2})
                        }
                    })
                } else {
                    return false;
                }
            });
        },
    },
    mounted () {
        this.getPlans()
        // this.getCitys()
        this.getVenues()
        this.getVenues()
        this.getRooms(this.ruleForm.exam_place_id);
    }
}
</script>

