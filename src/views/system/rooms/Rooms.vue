<template>
    <div class="sys-rooms">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="报考城市：" prop="city_id">
                    <el-select v-model="searchForm.city_id" filterable clearable placeholder="请选择" @change="changeVenues">
                        <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考点：" prop="place_id">
                    <el-select v-model="searchForm.place_id" filterable clearable placeholder="请选择" name="place_id">
                        <el-option  v-for="item in venues" :key="item.value" :label="item.place_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考场代号：" prop="room_code">
                    <el-input v-model="searchForm.room_code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">新增考场</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="90" align="center"></el-table-column>
                <el-table-column prop="created_at" label="创建日期" width="180" align="center"></el-table-column>
                <el-table-column prop="with_place.with_city.city_name" label="报考城市" width="150" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="with_place.place_name" label="考点名称" width="180" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="room_code" label="考场代号" width="180" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="seating_total" label="考场人数" width="80" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="with_place.address" label="具体位置" show-overflow-tooltip align="center"></el-table-column>
                <!-- <el-table-column prop="remark" label="备注" align="center"></el-table-column> -->
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

        <!-- 增加弹窗 -->
        <div v-if="addHand.dialogVisible">
            <el-dialog :title="addHand.title" :visible.sync="addHand.dialogVisible" size="tiny">
                <Add :hand="addHand" @reload="init(searchRecord)"></Add>
            </el-dialog>
        </div>

        <!-- 修改弹窗 -->
        <div v-if="editHand.dialogVisible">
            <el-dialog :title="editHand.title" :visible.sync="editHand.dialogVisible" size="tiny">
                <Edit :hand="editHand" @reload="init(searchRecord)"></Edit>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import mixinSystem from '@/mixins/mixinSystem'
    import Add from './Add'
    import Edit from './Edit'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'sys-rooms',
        mixins: [mixin, mixinSystem],
        data() {
            return {
                searchForm: {
                    city_id: '',
                    place_id: '',
                    room_code: '',
                    dict_type: 'room',
                },
                addHand: {
                    dialogVisible: false,
                    title: '添加',
                    data: {},
                },
                editHand: {
                    dialogVisible: false,
                    title: '修改',
                    data: {},
                },
            }
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters({
                citys: 'allCitys',
                venues: 'allVenues'
            }),
        },
        methods: {
            ...mapActions([
                'systemset',
                'getCitys',
                'getVenues'
            ]),
            changeVenues (val) {
                this.searchForm.place_id = '';
                this.getVenues(val);
            },
            add () {
                this.addHand.title = '添加';
                this.addHand.dialogVisible = true;
                this.addHand.data = {
                    action_type: 'add',
                    dict_type: this.searchForm.dict_type
                };
            },
            edit (item) {
                this.editHand.title = '修改';
                this.editHand.dialogVisible = true;
                this.editHand.data = {
                    ...item,
                    action_type: 'update',
                    dict_type: this.searchForm.dict_type
                };
            },
            _privateRemove (items) {
                var params = {
                    action_type: 'delete',
                    dict_type: this.searchForm.dict_type,
                    room_id: items.map(item => item.id )
                };
                return this.systemset(params);
            },
        },
        components: {
            Add, Edit
        },
        mounted () {
            this.getCitys()
        }
    }
</script>

