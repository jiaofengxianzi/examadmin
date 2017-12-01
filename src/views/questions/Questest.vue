<style>
</style>
<template>
    <div class="reserve">
        <div class="search clearfix section" >
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="录入时间：" prop="s_time" class="ident">
                    <el-date-picker v-model="searchForm.s_time" type="date" :picker-options="pickerStart" @change="startDateFormat" placeholder="选择开始日期"></el-date-picker>
                </el-form-item>
                <el-form-item prop="e_time" class="ident">
                    <el-date-picker v-model="searchForm.e_time" type="date" :picker-options="pickerEnd" @change="endDateFormat" placeholder="选择结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="试题类型：" prop="type" class="ident">
                    <el-select  placeholder="请选择" filterable clearable v-model="searchForm.type">
                        <el-option v-for="item in questType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="course_id" label="科目：">
                    <el-select  placeholder="请选择" filterable clearable  v-model="searchForm.course_id">
                        <el-option v-for="item in course" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="contents" label="题干：">
                    <el-input v-model="searchForm.contents" placeholder="请输入题干"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                    <el-button icon="fa-plus-square-o" @click="add" class="btn-add">新增试题</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.lists"  border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
                <el-table-column label="试题类型" width="80" align="center">
                    <template scope="scope">
                        {{scope.row.type | txt(questType)}}
                    </template>
                </el-table-column>
                <el-table-column prop="with_course.name" label="科目" width="120" align="center"></el-table-column>
                <el-table-column prop="with_detail.body" label="题干内容" width="450" align="left"></el-table-column>
                <!-- <el-table-column prop="with_detail.options" label="选项" width="280" show-overflow-tooltip align="center"></el-table-column> -->
                <el-table-column prop="with_admin.real_name" label="创建人" width="120" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="created_at" label="创建时间" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="publish" label="出现次数" width="80" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="got" label="被答对次数" width="100" align="center"></el-table-column>
                <el-table-column prop="accuracy" label="正确率" width="70" align="center"></el-table-column>
                <el-table-column label="下载" width="100" show-overflow-tooltip align="center">
                    <template scope="scope">
                        <a :href="scope.row.file_url" download>{{scope.row.file_url}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template scope="scope">
                        <el-button type="text" :disabled="!!scope.row.publish" @click="edit(scope.row)">修改</el-button>
                        <el-button type="text" @click.native="remove([scope.row])">删除</el-button>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="file_url" label="下载" width="60" align="center"></el-table-column>-->
            </el-table>

            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>

            <div class="batch">
                <el-button @click.native="batchRemove(multipleSelection)">删除</el-button>
                <el-button @click.native="linkJump">批量导入</el-button>
            </div>
        </div>

        <!-- 修改弹窗 -->
        <div v-if="hand.dialogVisible">
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="small">
                <!-- 修改 -->
                <change :hand="hand" @reload="init(searchRecord)"></change>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import questionsApi from '@/api/questions'
    import mixin from '@/mixins/mixin'
    import change from './change'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'basic',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    s_time: '',
                    e_time: '',
                    type: '',
                    course_id:'',
                    contents:'',
                    action_type:'search'
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
                hand: {
                    dialogVisible: false,
                    title: '',
                    data: {},
                },
            }
        },
        computed: {
            ...mapGetters({
                questType: 'allquestionsTypes',
                course: 'allCourses',
            }),
        },
        components: {
            change
        },
        filters: {
            txt (val, arr) {
                return arr.find(item => item.id == val).name
            },
        },
        methods: {
            ...mapActions([
                'getCourses',
                'getQuestPerson',
                'getQuestionsTypes',
            ]),
            startDateFormat (val) {
                this.searchForm.s_time = val;
            },
            endDateFormat (val) {
                this.searchForm.e_time = val;
            },
            add () {
                this.hand = {
                    title: '添加',
                    action_type: 'add',
                    data: {},
                    dialogVisible: true,
                }
            },
            edit (item) {
                this.hand = {
                    title: '修改',
                    action_type: 'update',
                    data: item,
                    dialogVisible: true,
                }
            },
            linkJump () {
                this.$router.push({
                    path: 'import',
                    query: {
                        url: '/ticket/import'
                    }
                })
            },
            _privateRemove (items) {
                var params = {
                    action_type: 'delete',
                    id: items.map(item => item.id )
                };
                return this.getQuestPerson(params);
             },
            getInitData (params) {
                params.s_time = params.s_time ? params.s_time + ' 00:00:00' : '';
                params.e_time = params.e_time ? params.e_time + ' 23:59:59' : '';
                return questionsApi.getQuestionTest(params)
            },
        },
        mounted () {
            this.getCourses()
            this.getQuestionsTypes()
        }
    }
</script>



