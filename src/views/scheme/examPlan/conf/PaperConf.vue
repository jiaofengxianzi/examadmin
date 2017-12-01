<template>
    <div class="paper-conf section">
        <div class="sear-tit">步骤三：配置试卷</div>
        <div class="test test-computer">
            <div class="allot">
                <div class="row">
                    <span class="lab">实践成绩占比(%)：</span>
                    <el-input v-model.number="ruleForm.practicality_test_ratio"></el-input>
                </div>

                <div class="row">
                    <span class="lab">平时成绩占比(%)：</span>
                    <el-input v-model.number="ruleForm.human_test_ratio"></el-input>
                </div>

                <div class="row">
                    <span class="lab">机试成绩占比(%)：</span>
                    <el-input v-model.number="ruleForm.computer_test_ratio"></el-input>
                </div>
                <div class="row">
                    <span class="lab">&nbsp;</span>
                    <el-button @click="add">添加试卷题型</el-button>
                </div>
            </div>
            <el-table ref="multipleTable" :data="ruleForm.exam_item_configs" border tooltip-effect="dark" style="width: 100%">
                <el-table-column label="审批状态" width="250" align="center">
                    <template scope="scope">
                        {{scope.row.type | txt(questType)}}
                    </template>
                </el-table-column>
                <el-table-column prop="value" label="分值" width="200" align="center"></el-table-column>
                <el-table-column prop="total" label="数量" width="200" align="center"></el-table-column>
                <el-table-column label="每题得分" width="200" align="center">
                    <template scope="scope">
                        {{scope.row.value/scope.row.total}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="edit(scope.row, scope.$index)">修改</el-button>
                        <el-button type="text" @click.native="remove(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div class="btn-item">
            <el-button type="primary" @click="submitForm">保存</el-button>
        </div>

        <!-- 弹窗 -->
        <div v-if="hand.dialogVisible">
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="tiny">
                <Add :hand="hand" :dataArr="ruleForm.exam_item_configs"></Add>
            </el-dialog>
        </div>

    </div>
</template>

<style>

</style>

<script>
import schemeApi from '@/api/scheme'
import Add from './Add'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'paper-conf',
    props: ['planPaper', 'plan_id'],
    data() {
        return {
            ruleForm: {
                practicality_test_ratio: '',
                human_test_ratio: '',
                computer_test_ratio: '',
                exam_item_configs: []
            },
            hand: {
                dialogVisible: false
            },
        };
    },
    computed: {
        ...mapGetters({
            questType: 'allquestionsTypes',
        }),
    },
    components: {
        Add,
    },
    watch: {
        planPaper (curVal, oldVal) {
            if(curVal.paper_config.exam_item_configs){
                this.ruleForm = curVal.paper_config;
            }
        }
    },
    filters: {
        txt (val, arr) {
            var obj = arr.find(item => item.id == val)
            return obj && obj.name || ''
        }
    },
    methods: {
        ...mapActions([
            'getQuestionsTypes',
        ]),
        add () {
            this.hand = {
                title: '添加',
                dialogVisible: true,
                data: {}
            }
        },
        edit (item, index) {
            this.hand = {
                title: '修改',
                dialogVisible: true,
                data: item,
                index: index
            }
        },
        remove (index) {
            this.ruleForm.exam_item_configs.splice(index, 1);
        },
        submitForm() {
            var _this = this;
            var count = 0;
            _this.ruleForm.exam_item_configs.forEach((item, index)=>{
                count += parseFloat(item.value);
            })
            if(_this.ruleForm.practicality_test_ratio + _this.ruleForm.human_test_ratio + _this.ruleForm.computer_test_ratio != 100){
                layer.msg('各阶段成绩占比总和必须是100！', {time: 2500, icon: 2})
                return;
            }
            // if(count !== 100){
            //     layer.msg('试题总分值必须是100分！', {time: 2500, icon: 2})
            //     return;
            // }
            schemeApi.paperConfUpdate({
                ..._this.ruleForm,
                plan_id: _this.plan_id,
            }).then((res)=>{
                if(res.data.ret == 0){
                    layer.msg('保存成功！', {time: 2500, icon: 1})
                }else{
                    layer.msg(res.data.res_info, {time: 2500, icon: 2})
                }
            })
        },
    },
    mounted () {
        this.getQuestionsTypes()
    }
}
</script>

<style>
.paper-conf .allot .row{ margin-bottom: 10px; }
.paper-conf .allot .lab{ display: inline-block; width: 120px; font-size: 14px; text-align: right; }
.paper-conf .el-table{ margin-top: 15px; margin-bottom: 15px; }
</style>
