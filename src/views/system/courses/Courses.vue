<template>
    <div class="sys-courses">
        <div class="search clearfix section">
            <!-- <div class="sear-tit">条件筛选</div> -->
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">新增科目</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column prop="id" label="编号" width="100" align="center"></el-table-column>
                <!-- <el-table-column prop="with_level.level_name" label="层次" width="160" align="center"></el-table-column> -->
                <!-- <el-table-column prop="specialty_name" label="专业" width="160" align="center"></el-table-column> -->
                <el-table-column prop="name" label="科目" width="220" align="center"></el-table-column>
                <el-table-column prop="course_code" label="科目代码" width="180" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" @click.native="remove([scope.row])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>

            <div class="batch">
                <el-button @click.native="batchRemove(multipleSelection)">删除</el-button>
                <span class="total">总计条目：{{initData.count}}条</span>
            </div>
        </div>
        
        <!-- 增改弹窗 -->
        <div v-if="hand.dialogVisible">
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="tiny">
                <Add :hand="hand" @reload="init(searchRecord)"></Add>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import mixinSystem from '@/mixins/mixinSystem'
    import Add from './Add'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'sys-courses',
        mixins: [mixin, mixinSystem],
        data() {
            return {
                searchForm: {
                    dict_type: 'course',
                },
            }
        },
        computed: {
           ...mapGetters({
                grades: 'allGrades',
                majors: 'allMajors',
            }),
        },
        methods: {
            ...mapActions([
                'systemset',
                'getGrades',
                'getMajors',
            ]),
            _privateRemove (items) {
                var params = {
                    action_type: 'delete',
                    dict_type: this.searchForm.dict_type,
                    course_id: items.map(item => item.id )
                };
                return this.systemset(params);
            },
        },
        components: {
            Add,
        },
        mounted () {
            this.getGrades()
        }
    }
</script>

<style>

</style>

