<template>
    <div class="Published">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="学员姓名：" prop="name">
                    <el-input v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item label="准考证号码：" prop="number">
                    <el-input v-model.number="searchForm.number"></el-input>
                </el-form-item>
                <el-form-item label="考试计划名称：" prop="plan_id">
                    <el-select v-model="searchForm.plan_id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in plans" :key="item.value" :label="item.plan_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报考城市：" prop="city_id">
                    <el-select v-model="searchForm.city_id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in citys" :key="item.value" :label="item.city_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        
        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column prop="with_ticket.name" label="学员名字" width="90" align="center"></el-table-column>
                <el-table-column prop="with_plan.plan_name" label="考试计划名称" width="150" align="center"></el-table-column>
                <el-table-column prop="with_ticket.number" label="准考证号码" width="120" align="center"></el-table-column>
                <el-table-column prop="with_ticket.with_city.city_name" label="报考城市" width="150" align="center"></el-table-column>
                <el-table-column prop="computer_grade" label="机试分数" width="150" align="center"></el-table-column>
                <el-table-column prop="practicality_grade" label="实践分数" width="80" align="center"></el-table-column>
                <el-table-column prop="human_grade" label="平时分数" width="120" align="center"></el-table-column>
                <el-table-column prop="test_total" label="总成绩" width="120" align="center"></el-table-column>
                <el-table-column label="成绩状态" width="120" align="center">
                    <template scope="scope">
                        {{scope.row.status | txt(status)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <!-- <el-button type="text">修改</el-button> -->
                        <el-button type="text" @click="detail(scope.row.id)">试卷详情</el-button>
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
    import scoreApi from '@/api/score'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'Published',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    plan_id: '',
                    city_id: '',
                    number: '',
                    status: 5,
                },
                // 成绩状态
                status: [
                    {
                        value: '0',
                        label: '初始化'
                    },
                    {
                        value: '1',
                        label: '进行中'
                    },
                    {
                        value: '2',
                        label: '已完成'
                    },
                    {
                        value: '3',
                        label: '评分中'
                    },
                    {
                        value: '4',
                        label: '评分完成'
                    },
                    {
                        value: '5',
                        label: '公布成绩'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters({
                plans: 'allPlans',
                citys: 'allCitys',
            }),
        },
        methods: {
            ...mapActions([
                'getPlans',
                'getCitys',
            ]),
            detail (id){
                this.$router.push({
                    path : this.$route.path + '/detail',
                    query : {
                        id : id
                    }
                });
            },
            _privateRemove (items) {
                var params = {
                    id: items.map(item => item.id )
                };
                return scoreApi.scoreDelete(params);
            },
            getInitData (params) {
                return scoreApi.scoreLists(params)
            },
        },
        mounted () {
            this.getPlans()
            this.getCitys()
        }
    }
</script>

