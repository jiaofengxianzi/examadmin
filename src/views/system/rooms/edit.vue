<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="考场：" required>
                <el-col>
                    <el-form-item prop="room_code">
                        <el-input v-model="ruleForm.room_code" placeholder="代号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item prop="seating_total">
                        <el-input v-model.number="ruleForm.seating_total" placeholder="人数"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="考场归属：" required>
                <el-col :span="10">
                    <el-form-item prop="city_id">
                        <el-select v-model="ruleForm.city_id" filterable placeholder="报考城市" @change="changeVenues">
                            <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item prop="place_id">
                        <el-select v-model="ruleForm.place_id" filterable placeholder="考点">
                            <el-option  v-for="item in venues" :key="item.id" :label="item.place_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
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

import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'sys-add',
    props: ['hand'],
    data() {
        return {
            ruleForm: {
                action_type: this.hand.data.action_type || '',
                room_code: this.hand.data.room_code || '',
                room_id: this.hand.data.id || '',
                seating_total: this.hand.data.seating_total || '',
                city_id: this.hand.data.with_place && this.hand.data.with_place.city_id || '',
                place_id: this.hand.data.with_place && this.hand.data.with_place.id || '',
                // remark: this.hand.data.remark || '',
                dict_type: this.hand.data.dict_type
            },
            rules: {
                room_code: [
                    { required: true, message: '请输入考点代号', },
                ],
                seating_total: [
                    { required: true, message: '请输入考点人数', },
                    { type: 'number', message: '考点人数必须为数字', },
                ],
                city_id: [
                    { required: true, message: '请选择归属城市', }
                ],
                place_id: [
                    { required: true, message: '请选择归属考点', }
                ],
            }
        };
    },
    computed: {
        ...mapGetters({
            citys: 'allCitys',
            venues: 'allVenues',
        })
    },
    methods: {
        ...mapActions([
            'getCitys',
            'getVenues',
            'systemset',
        ]),
        changeVenues (val) {
            this.ruleForm.place_id = '';
            this.getVenues(val);
        },
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
    },
    mounted () {
        if(this.hand.data.with_place){
            this.getVenues(this.hand.data.with_place.city_id);
        }
    }
}
</script>

