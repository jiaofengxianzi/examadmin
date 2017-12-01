<template>
    <div class="basic">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="考生：" prop="condition" class="ident">
                    <el-select v-model="searchForm.condition" filterable placeholder="请选择">
                        <el-option  v-for="item in conditions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="badge">
                    <el-input class="inpt" v-model="searchForm.badge" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="城市：" prop="city_id">
                    <el-select v-model="searchForm.city_id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="层次：" prop="level_id">
                    <el-select v-model="searchForm.level_id" filterable clearable placeholder="请选择" @change="changeMajors">
                        <el-option  v-for="item in grades" :key="item.id" :label="item.level_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业：" prop="specialty_id">
                    <el-select v-model="searchForm.specialty_id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in majors" :key="item.id" :label="item.specialty_name" :value="item.id"></el-option>
                    </el-select>
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
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="teaching_place" label="教学点" show-overflow-tooltip width="120" align="center"></el-table-column>
                <el-table-column prop="number" label="准考证" width="160" align="center"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120" align="center"></el-table-column>
                <el-table-column prop="users.user_card_id" label="身份证号码" width="180" align="center"></el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="140" align="center"></el-table-column>
                <el-table-column prop="with_city.city_name" label="城市" width="120" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="with_level.level_name" label="层次" width="100" align="center"></el-table-column>
                <el-table-column prop="specialty.specialty_name" label="专业" width="150" align="center"></el-table-column>
                <el-table-column prop="remark" label="备注" show-overflow-tooltip align="center"></el-table-column>
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
                <el-button @click.native="linkJump">批量导入</el-button>
                <el-button @click.native="exportDoc">批量导出</el-button>
                <span class="total">总计人数：{{initData.count}}人</span>
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
    import examineeApi from '@/api/examinee'
    import Add from './Add'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'basic',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    condition: '',
                    badge: '',
                    city_id: '',
                    level_id: '',
                    specialty_id: '',
                },
                conditions: [
                    {
                        value: 'name',
                        label: '姓名'
                    }, 
                    {
                        value: 'number',
                        label: '准考证'
                    }, 
                    {
                        value: 'user_card_id',
                        label: '身份证'
                    }, 
                    {
                        value: 'mobile',
                        label: '手机号'
                    }
                ],
            }
        },
        computed: {
            ...mapGetters({
                citys: 'allCitys',
                grades: 'allGrades',
                majors: 'allMajors',
            }),
            // 动态设置查询字段
            indeed () {
                this.indeedReset(this.conditions)
                return this.searchForm.condition
            }
        },
        components: {
            Add,
        },
        methods: {
            ...mapActions([
                'getCitys',
                'getGrades',
                'getMajors',
            ]),
            changeMajors (val) {
                this.searchForm.specialty_id = '';
                this.getMajors(val);
            },
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
                this.hand.title = '添加';
                this.hand.data = {};
                this.hand.data.action_type = 'add';
                this.hand.dialogVisible = true;
            },
            edit (item) {
                this.hand.title = '修改';
                this.hand.data = item;
                this.hand.data.action_type = 'update';
                this.hand.dialogVisible = true;
            },
            linkJump () {
                this.$router.push({
                    path: 'basic/import',
                })
            },
            exportDoc () {
                var _this = this;
                layer.confirm('确定要导出当前筛选条件下的所有数据吗？', {
                    icon: 7,
                    btn: ['确定', '取消']
                }, function(index){
                    examineeApi.studentsExport(_this.searchRecord).then((req)=>{
                        layer.close(index)
                        if(req.data.ret == 0){
                            window.open(req.data.data.url);
                        }else{
                            layer.msg(res.data.res_info, {time: 2500, icon: 2})
                        }
                    })
                });
            },
            _privateRemove (items) {
                var params = {
                    action_type: 'delete',
                    id: items.map(item => item.id )
                };
                return examineeApi.studentsManage(params);
            },
            getInitData (params) {
                return examineeApi.studentsSearch(params)
            },
        },
        mounted () {
            this.getCitys()
            this.getGrades()
        }
    }
</script>

