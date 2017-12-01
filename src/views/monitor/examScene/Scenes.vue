<template>
    <div class="sys-scenes">
        <div class="search clearfix section">
            <div class="sear-tit">条件筛选</div>
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
                <el-form-item label="考试计划名称：" prop="plan_id">
                    <el-select v-model="searchForm.plan_id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in plans" :key="item.value" :label="item.plan_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="报考城市：" prop="city_id">
                    <el-select v-model="searchForm.city_id" filterable clearable placeholder="请选择" @change="changeVenues">
                        <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考点：" prop="exam_place">
                    <el-select v-model="searchForm.exam_place" filterable clearable placeholder="请选择" @change="changeRooms">
                        <el-option  v-for="item in venues" :key="item.value" :label="item.place_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考场：" prop="room_id">
                    <el-select v-model="searchForm.room_id" filterable clearable placeholder="请选择">
                        <el-option  v-for="item in rooms" :key="item.value" :label="item.room_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名：" prop="real_name">
                    <el-input class="inpt" v-model="searchForm.real_name"></el-input>
                </el-form-item>
                <el-form-item label="附件上传状态：" prop="is_practicality_done">
                    <el-select v-model="searchForm.is_practicality_done" filterable clearable placeholder="请选择" name="place_id">
                        <el-option  v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="exhibit section">
            <el-table ref="multipleTable" :data="initData.list" border tooltip-effect="dark" style="width: 100%">
                <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
                <el-table-column prop="id" label="序号" width="90" align="center"></el-table-column>
                <el-table-column prop="with_ticket.name" label="姓名" width="150" align="center"></el-table-column>
                <el-table-column prop="with_ticket.mobile" label="手机号码" width="120" align="center"></el-table-column>
                <el-table-column prop="with_plan.plan_name" label="考试计划名称" align="center"></el-table-column>
                <el-table-column prop="city_name" label="报考城市" width="150" align="center"></el-table-column>
                <el-table-column prop="place_name" label="考点" width="150" align="center"></el-table-column>
                <el-table-column prop="room_name" label="考场" width="120" align="center"></el-table-column>
                <el-table-column label="附件上传状态" width="120" align="center">
                    <template scope="scope">
                        {{scope.row.is_practicality_done | txt(status)}}
                    </template>
                </el-table-column>
                <el-table-column label="试卷详情" width="100" align="center">
                    <template scope="scope">
                        <el-button @click="details(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150" align="center">
                    <template scope="scope">
                        <el-button type="text" @click="upload(scope.row)">上传附件</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>
        </div>
        
        <!-- 上传 -->
        <div v-if="hand.dialogVisible">
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="tiny">
                <Upload :hand="hand" @reload="init(searchRecord)"></Upload>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import monitorApi from '@/api/monitor'
    import mixin from '@/mixins/mixin'
    import Upload from './Upload'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'sys-scenes',
        mixins: [mixin],
        data() {
            return {
                searchForm: {
                    plan_id: '',
                    city_id: '',
                    exam_place: '',
                    room_id: '',
                    real_name: '',
                    is_practicality_done: '',
                },
                hand: {
                    dialogVisible: false,
                    title: '上传附件'
                },
                status: [
                    {
                        value: '0',
                        label: '否'
                    },
                    {
                        value: '1',
                        label: '是'
                    }
                ],
            }
        },
        computed: {
            // 使用对象展开运算符将 getters 混入 computed 对象中
            ...mapGetters({
                citys: 'allCitys',
                venues: 'allVenues',
                rooms: 'allRooms',
                plans: 'allPlans',
            }),
        },
        components: {
            Upload,
        },
        methods: {
            ...mapActions([
                'getCitys',
                'getVenues',
                'getRooms',
                'getPlans',
            ]),
            changeVenues (val) {
                this.searchForm.exam_place = '';
                this.getVenues(val);
            },
            changeRooms (val) {
                this.searchForm.room_id = '';
                this.getRooms(val);
            },
            details(item){
                this.$router.push({
                    path: this.$route.path + '/detail',
                    query: {
                        id: item.id
                    }
                })
            },
            upload (item) {
                this.hand.dialogVisible = true;
                this.hand.data = item;
            },
            getInitData (params) {
                return monitorApi.examPapers(params)
            },
        },
        mounted () {
            this.getCitys()
            this.getPlans()
        }
    }
</script>

