<template>
    <div class="sys-add">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item
                v-for ="(item, index) in codeArr"
                label="考场："
                :key="item"
                required
            >
                <el-col>
                    <el-form-item :prop="'room_code.' + index" :rules="[
                        {required: true, message: '请输入考点代号',}
                    ]">
                        <el-input v-model="ruleForm.room_code[index]" placeholder="代号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item :prop="'seating_total.' + index" :rules="[
                        { required: true, message: '请输入考点人数', },
                        { type: 'number', message: '人数必须是数字', },
                    ]">
                        <el-input v-model.number="ruleForm.seating_total[index]" placeholder="人数"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-button type="text" @click="remove(index)">删除</el-button>
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
                <el-button @click="add">新增考场</el-button>
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
                action_type: this.hand.data.action_type,
                room_code: [''],
                seating_total: [''],
                city_id: '',
                place_id: '',
                // remark: this.hand.data.remark || '',
                dict_type: this.hand.data.dict_type
            },
            rules: {
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
        }),
        // 使用ruleForm.room_code或ruleForm.seating_total直接循环表单有输入数据时失去焦点的未知BUG
        // 这里新建个数组
        codeArr () {
            return new Array(this.ruleForm.room_code.length)
        }
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
        add () {
            this.ruleForm.room_code.push('');
            this.ruleForm.seating_total.push('');
        },
        remove (index) {
            if(this.ruleForm.room_code.length > 1 && this.ruleForm.seating_total.length > 1){
                this.ruleForm.room_code.splice(index, 1);
                this.ruleForm.seating_total.splice(index, 1);
            }else{
                layer.msg('再删就没有了！', {icon: 2, time: 2000})
            }
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
    }
}
</script>

