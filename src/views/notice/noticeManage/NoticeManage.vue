<template>
    <div class="notice-manage">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="发布日期：" prop="s_time">
                    <el-date-picker v-model="searchForm.s_time" type="date" :picker-options="pickerStart" placeholder="开始日期" @change="startDateFormat"></el-date-picker>
                </el-form-item>
                <el-form-item prop="e_time">
                    <el-date-picker v-model="searchForm.e_time" type="date" :picker-options="pickerEnd" placeholder="结束日期" @change="endDateFormat"></el-date-picker>
                </el-form-item>
                <el-form-item label="通知标题：" prop="title">
                    <el-input v-model="searchForm.title"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">新增</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="45" align="center"></el-table-column>
                <el-table-column prop="title" label="通知标题" align="center"></el-table-column>
                <el-table-column prop="with_admin.real_name" label="创建者" width="150" align="center"></el-table-column>
                <el-table-column prop="created_at" label="创建时间" width="180" align="center"></el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" @click="detail(scope.row)">详情</el-button>
                        <el-button type="text" @click="remove([scope.row])">删除</el-button>
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
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="small">
                <Add :hand="hand" @reload="init(searchRecord)"></Add>
            </el-dialog>
        </div>

        <!-- 详情弹窗 -->
        <div v-if="noticeItem.dialogVisible">
            <el-dialog :title="noticeItem.title" :visible.sync="noticeItem.dialogVisible" size="small">
                <Detail :noticeItem="noticeItem"></Detail>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import noticeApi from '@/api/notice'
    import Add from './Add'
    import Detail from './Detail'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'notice-manage',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    title: '',
                    s_time: '',
                    e_time: '',
                },
                pickerStart: {
                    disabledDate: (time) => {
                        var endTime = new Date(this.searchForm.e_time).getTime();
                        return time.getTime() > endTime;
                    }
                },
                pickerEnd: {
                    disabledDate: (time) => {
                        var startTime = new Date(this.searchForm.s_time).getTime();
                        return time.getTime() < startTime - 8.64e7;
                    }
                },
                noticeItem: {
                    dialogVisible: false,
                    title: '通知详情'
                },
            }
        },
        components: {
            Add,
            Detail,
        },
        methods: {
            startDateFormat (val) {
                this.searchForm.s_time = val;
            },
            endDateFormat (val) {
                this.searchForm.e_time = val;
            },
            add () {
                this.hand.title = '添加';
                this.hand.data = {};
                this.hand.dialogVisible = true;
            },
            edit (item) {
                this.hand.title = '修改';
                this.hand.data = item;
                this.hand.dialogVisible = true;
            },
            detail(item){
                this.noticeItem.data = item;
                this.noticeItem.dialogVisible = true;
            },
            _privateRemove (items) {
                var params = {
                    id: items.map(item => item.id )
                };
                return noticeApi.deleteNotice(params);
            },
            getInitData (params) {
                params.s_time = params.s_time ? params.s_time + ' 00:00:00' : '';
                params.e_time = params.e_time ? params.e_time + ' 23:59:59' : '';
                return noticeApi.getNoticeList(params)
            },
        },
    }
</script>

