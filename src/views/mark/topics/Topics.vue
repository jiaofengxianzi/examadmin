<template>
    <!-- 按考生评卷 -->
    <div class="section topics relative">
        <div class="examineeList clearfix">
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline searchForm">
                <el-form-item label="考试计划：" prop="plan_id">
                    <el-select v-model="searchForm.plan_id" filterable clearable>
                        <el-option v-for="item in plans" :label="item.plan_name" :key="item.id" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题型：" prop="type_id">
                    <el-select v-model="searchForm.type_id" filterable clearable>
                        <el-option v-for="item in questType" :label="item.name" :key="item.id" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="试卷状态：" prop="status">
                    <el-select v-model="searchForm.status" filterable clearable>
                        <el-option v-for="(k, v) in status" :label="k" :key="v" :value="v"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="exhibit section" v-if="initData.lists">
            <el-table
                :data="initData.lists"
                class="markTable"
                border>
                <el-table-column
                    width="200"
                    align="center"
                    prop="with_plan.plan_name"
                    label="考试计划">
                </el-table-column>
                <el-table-column
                    width="100"
                    align="center"
                    prop="id"
                    label="题目ID">
                </el-table-column>
                <el-table-column
                    width="100"
                    align="center"
                    label="题型">
                    <template scope="scope">{{ scope.row.item_type }}</template>
                </el-table-column>
                <el-table-column
                    align="left"
                    prop="with_item.with_detail.body"
                    label="题干内容">
                </el-table-column>
                <el-table-column
                    width="120"
                    align="center"
                    label="评卷状态">
                    <template scope="scope">{{ scope.row.status ? '已完成' : '未完成' }}</template>
                </el-table-column>
                <el-table-column
                    width="100"
                    align="center"
                    prop="mark"
                    label="已评数">
                </el-table-column>
                <el-table-column
                    width="100"
                    align="center"
                    prop="noMark"
                    label="未评数">
                </el-table-column>
                <el-table-column
                    width="100"
                    align="center"
                    label="操作">
                    <template scope="scope">
                        <a href="javascript:;" class="link-1" @click="showDetail(scope.row)">{{ scope.row.status ? '查看' : '评卷' }}</a>
                    </template>
                </el-table-column>
            </el-table>

            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>

        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import {mapGetters, mapActions} from 'vuex'
    import markApi from '@/api/mark'
    import commonApi from '@/api/common'

    export default {
        name: 'topics',
        mixins: [mixin],
        data() {
            return {
                status:{
                    0: '未完成',
                    2: '已完成',
                },
                searchForm: {
                    name: '',
                    plan_id: '',
                    status: '',
                    type_id: '',
                },
            }
        },
        computed: {
            ...mapGetters({
                plans: 'allPlans',
                questType: 'objectiveTypes',
            }),
        },
        methods:{
            ...mapActions([
                'getPlans',
                'getQuestionsTypes',
            ]),
            showDetail (item){
                this.$router.push({
                    path: 'topics/detail',
                    query: {
                        id: item.id,
                        planId: item.plan_id,
                        itemId: item.item_id,
                        status: item.status
                    }
                })
            },
            getInitData (params) {
                return markApi.getQuestionlist(params)
            },
        },
        created (){
            this.getPlans();
            this.getQuestionsTypes()
        },
        filters: {
            statusTotxt: function (v) {
                if (!v) return '';
                switch(+v){
                    case 0:
                        return '未完成';
                        break;
                    case 1:
                        return '已完成';
                        break;
                    default:
                        return '未完成';
                        break;
                }
            },
            txt (val, arr) {
                return arr.find(item => item.id == val).name
            }
        },
    }
</script>