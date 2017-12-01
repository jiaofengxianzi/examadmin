<template>
    <div class="sys-spots">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="报考城市：" prop="city_id">
                    <el-select v-model="searchForm.city_id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">新增考点</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="90" align="center"></el-table-column>
                <el-table-column prop="created_at" label="创建日期" width="180" align="center"></el-table-column>
                <el-table-column prop="with_city.city_name" label="报考城市" width="150" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="place_name" label="考点名称" width="180" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="address" label="详细地址" width="300" show-overflow-tooltip align="center"></el-table-column>
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
        name: 'sys-spots',
        mixins: [mixin, mixinSystem],
        data() {
            return {
                searchForm: {
                    city_id: '',
                    dict_type: 'place',
                },
            }
        },
        computed: {
            ...mapGetters({
                citys: 'allCitys',
            }),
        },
        methods: {
            ...mapActions([
                'systemset',
                'getCitys',
            ]),
            _privateRemove (items) {
                var params = {
                    action_type: 'delete',
                    dict_type: this.searchForm.dict_type,
                    place_id: items.map(item => item.id )
                };
                return this.systemset(params);
            },
        },
        components: {
            Add,
        },
        mounted () {
            this.getCitys()
        }
    }
</script>

