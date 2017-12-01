<template>
    <div class="system-roles">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="" prop="condition" class="ident">
                    <el-select v-model="searchForm.condition" placeholder="请选择">
                        <el-option  v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="badge">
                    <el-input class="inpt" v-model="searchForm.badge" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="ownSubmitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">新增</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="45" align="center"></el-table-column> -->
                <el-table-column prop="username" label="用户名" width="150" align="center"></el-table-column>
                <el-table-column prop="real_name" label="真实姓名" width="150" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="180" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="resetPassword(scope.row)">重置密码</el-button>
                        <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                        <el-button type="text" @click="remove([scope.row])">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>

            <div class="batch">
                <span class="total">总计条目：{{initData.count}}条</span>
            </div>
        </div>
        
        <!-- 增改弹窗 -->
        <div v-if="hand.dialogVisible">
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="tiny">
                <Add :hand="hand" @reload="init(searchRecord)"></Add>
            </el-dialog>
        </div>

        <!-- 重置密码 -->
        <div v-if="resetHand.dialogVisible">
            <el-dialog :title="resetHand.title" :visible.sync="resetHand.dialogVisible" size="tiny">
                <Reset :hand="resetHand" @reload="init(searchRecord)"></Reset>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import rolesApi from '@/api/roles'
    import Add from './Add'
    import Reset from './Reset'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'SystemRoles',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    condition: '',
                    username: '',
                    real_name: '',
                    role_name: '',
                    badge: '',
                },
                conditions: [
                    {
                        value: 'username',
                        label: '用户名'
                    }, 
                    {
                        value: 'real_name',
                        label: '真实姓名'
                    }, 
                    {
                        value: 'role_name',
                        label: '角色'
                    }, 
                ],
                resetHand: {},
                initData: {}
            }
        },
        computed: {
            // 动态设置查询字段
            indeed () {
                this.indeedReset(this.conditions)
                return this.searchForm.condition
            }
        },
        components: {
            Add, Reset
        },
        methods: {
            ownSubmitForm (params) {
                params[this.indeed] = params.badge
                this.submitForm(params)
            },
            // 重置动态条件的信息
            indeedReset (arr) {
                arr.forEach((item) => {
                    this.searchForm[item.value] = ''
                })
            },
            add () {
                this.hand = {
                    title: '添加账号',
                    type: 'add',
                    data: {},
                    dialogVisible: true
                }
            },
            edit (item) {
                this.hand = {
                    title: '添加账号',
                    type: 'edit',
                    data: item,
                    dialogVisible: true
                }
            },
            resetPassword (item) {
                this.resetHand = {
                    title: '重置密码',
                    data: item,
                    dialogVisible: true
                }
            },
            _privateRemove (items) {
                var params = {
                    admin_id: items.map(item => item.id ),
                };
                return rolesApi.deleteAccount(params);
            },
            getInitData (params) {
                return rolesApi.getAccountList(params)
            },
        },
    }
</script>

