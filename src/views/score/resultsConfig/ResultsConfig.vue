<template>
    <div class="sys-results-config">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="考试计划名称：" prop="id">
                    <el-select v-model="searchForm.id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in plans" :key="item.value" :label="item.plan_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">添加</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column prop="created_at" label="创建日期" width="200" align="center"></el-table-column>
                <el-table-column prop="plan_code" label="考期" width="150" align="center"></el-table-column>
                <el-table-column prop="plan_name" label="考试计划名称" width="220" align="center"></el-table-column>
                <el-table-column prop="plan_score" label="平时成绩" width="150" align="center"></el-table-column>
                <el-table-column prop="ramrk" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" @click="remove([scope.row])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>

            <div class="batch">
                <el-button @click.native="batchRemove(multipleSelection)">删除</el-button>
            </div>
        </div>

        <!-- 弹窗 -->
        <div v-if="hand.dialogVisible">
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="tiny">
                <Add :hand="hand" @reload="init(searchRecord)"></Add>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import scoreApi from '@/api/score'
    import Add from './Add'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'sys-results-config',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    id: '',
                },
            }
        },
        computed: {
            ...mapGetters({
                plans: 'allPlans',
            }),
        },
        methods: {
            ...mapActions([
                'getPlans',
            ]),
            add () {
                this.hand.title = "添加"
                this.hand.type = "add"
                this.hand.dialogVisible = true
            },
            edit (item) {
                this.hand.title = "修改"
                this.hand.type = "edit"
                this.hand.dialogVisible = true
                this.hand.data = {
                    id: item.id,
                    planScore: item.plan_score
                }
            },
            _privateRemove (items) {
                var params = {
                    id: items.map(item => item.id )[0]
                };
                return scoreApi.scorePeacetimeDelete(params);
            },
            getInitData (params) {
                return scoreApi.scoreInfo(params)
            },
        },
        components: {
            Add,
        },
        mounted () {
            this.getPlans()
        }
    }
</script>

