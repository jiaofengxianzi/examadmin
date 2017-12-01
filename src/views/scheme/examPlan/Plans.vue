<template>
    <div class="sys-plans">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="考期：" prop="plan_code">
                    <el-input v-model="searchForm.plan_code"></el-input>
                </el-form-item>
                <el-form-item label="状态：" prop="plan_status">
                    <el-select v-model="searchForm.plan_status" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试时间：" prop="test_start_date">
                    <el-date-picker 
                        v-model="searchForm.test_start_date" 
                        type="date" 
                        placeholder="开始日期" 
                        :picker-options="pickerStart"
                        @change="startDateFormat">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="test_end_date">
                    <el-date-picker 
                        v-model="searchForm.test_end_date" 
                        type="date" placeholder="结束日期" 
                        :picker-options="pickerEnd"
                        @change="endDateFormat">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="plan_name" label="计划名称" width="220" align="center"></el-table-column>
                <el-table-column label="预约开放时间" width="170" align="center">
                    <template scope="scope">
                        {{scope.row.order_parse_date.split('—')[0]}}
                    </template>
                </el-table-column>
                <el-table-column label="预约结束时间" width="170" align="center">
                    <template scope="scope">
                        {{scope.row.order_parse_date.split('—')[1]}}
                    </template>
                </el-table-column>
                <el-table-column prop="test_parse_date" label="考试时间" width="240" align="center"></el-table-column>
                <el-table-column prop="sign_person" label="预约人数" width="80" align="center"></el-table-column>
                <el-table-column prop="plan_code" label="考期" width="100" align="center"></el-table-column>
                <el-table-column prop="created_at" label="创建日期" width="160" align="center"></el-table-column>
                <el-table-column prop="created_admin_name" label="创建人" width="150" align="center"></el-table-column>
                <el-table-column label="审批状态" width="80" align="center">
                    <template scope="scope">
                        <div class="txt-green" :class="{'txt-red': scope.row.is_release == 0}">
                            {{scope.row.is_release | txt(approvalStatus)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="考试计划状态" width="110" align="center">
                    <template scope="scope">
                        <div :class="colorStyle(scope.row.status)">
                            {{scope.row.status | txt(status)}}
                        </div>
                    </template>
                </el-table-column> 
                <el-table-column label="试卷类型" width="80" align="center">
                    <template scope="scope">
                        {{scope.row.create_paper_type | txt(paperType)}}
                    </template>
                </el-table-column>
                <el-table-column label="试卷详情" width="120" align="center">
                    <template scope="scope">
                        <el-button v-if="scope.row.create_paper_type == 1" @click="detail(scope.row)">试卷范本</el-button>
                        <el-button v-else @click="detail(scope.row)">试卷详情</el-button>
                    </template>
                </el-table-column> 
                <el-table-column label="操作" width="220" align="center">
                    <template scope="scope">
                        <el-button type="text" :disabled="scope.row.is_release == 1" @click="edit(scope.row)">配置</el-button>
                        <el-button type="text" @click="approve(scope.row)">审批</el-button>
                        <el-button type="text" :disabled="scope.row.status != 3" @click="upload(scope.row)">固定出题</el-button>
                        <el-button type="text" @click.native="remove([scope.row])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>

            <div class="batch">
                <el-button @click.native="batchRemove(multipleSelection)">删除</el-button>
            </div>
        </div>

    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import schemeApi from '@/api/scheme'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'sys-plans',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    plan_code: '',
                    plan_status: '',
                    test_start_date: '',
                    test_end_date: '',
                },
                pickerStart: {
                    disabledDate: (time) => {
                        var endTime = new Date(this.searchForm.test_end_date).getTime();
                        return time.getTime() > endTime;
                    }
                },
                pickerEnd: {
                    disabledDate: (time) => {
                        var startTime = new Date(this.searchForm.test_start_date).getTime();
                        return time.getTime() < startTime - 8.64e7;
                    }
                },
                status: [
                    {
                        value: 0,
                        label: '初始化'
                    },
                    {
                        value: 1,
                        label: '已发布'
                    },
                    {
                        value: 2,
                        label: '已开始预约'
                    },
                    {
                        value: 3,
                        label: '已结束预约'
                    },
                    {
                        value: 4,
                        label: '已开始考试'
                    },
                    {
                        value: 5,
                        label: '考试结束'
                    }
                ],
                approvalStatus: [
                    {
                        value: '0',
                        label: '未审核'
                    }, 
                    {
                        value: '1',
                        label: '已审核'
                    },
                ],
                paperType: [
                    {
                        value: 1,
                        label: '随机出题'
                    }, 
                    {
                        value: 2,
                        label: '固定出题'
                    },
                ]
            }
        },
        methods: {
            startDateFormat (val) {
                this.searchForm.test_start_date = val;
            },
            endDateFormat (val) {
                this.searchForm.test_end_date = val;
            },
            colorStyle (val) {
                return {
                    'txt-green': val == 1 || val == 3 || val == 5,
                    'txt-yellow': val == 2 || val == 4,
                }
            },
            add () {
                this.$router.push({
                    path: 'plans/add',
                    query: {
                        type: 'add',
                    }
                })
            },
            edit (item) {
                this.$router.push({
                    path: 'plans/add',
                    query: {
                        type: 'edit',
                        planId: item.id
                    }
                })
            },
            approve (item) {
                this.$router.push({
                    path: 'plans/add',
                    query: {
                        type: 'approve',
                        planId: item.id
                    }
                })
            },
            detail (item) {
                this.$router.push({
                    path: 'plans/detail',
                    query: {
                        planId: item.id,
                        type: item.create_paper_type
                    }
                })
            },
            upload (item) {
                this.$router.push({
                    path: 'plans/Upload',
                    query: {
                        planId: item.id
                    }
                })
            },
            _privateRemove (items) {
                var params = {
                    plan_ids: items.map(item => item.id )
                };
                return schemeApi.plansDelete(params);
            },
            getInitData (params) {
                params.test_start_date = params.test_start_date ? params.test_start_date + ' 00:00:00' : '';
                params.test_end_date = params.test_end_date ? params.test_end_date + ' 23:59:59' : '';
                return schemeApi.plansInfo(params)
            },
        }
    }
</script>

