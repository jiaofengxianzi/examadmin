<template>
    <!-- 按考生评卷 -->
    <div class="section relative">
        <div class="examineeList clearfix">
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline">
                <el-form-item label="准考证号码：" prop="ticket_number">
                    <el-input v-model="searchForm.ticket_number" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="考点：" prop="place_id">
                    <el-select v-model="searchForm.place_id" filterable clearable>
                        <el-option label="全部" value="0"></el-option>
                        <el-option v-for="item in venues" :label="item.place_name" :key="item.id" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试计划："  prop="plan_id">
                    <el-select v-model="searchForm.plan_id" filterable clearable>
                        <el-option label="全部" value="0"></el-option>
                        <el-option v-for="item in plans" :label="item.plan_name" :key="item.id" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="submitForm(searchForm)">搜索</el-button>
                    <el-button icon="fa-refresh" @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div class="exhibit section" v-if="initData.lists">
            <el-table
                :data="initData.lists"
                border
                style="width: 100%">
                <el-table-column
                    prop="with_ticket.name"
                    align="center"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="with_ticket.number"
                    align="center"
                    label="准考证">
                </el-table-column>
                <el-table-column
                    prop="with_plan.plan_name"
                    align="center"
                    label="考试计划">
                </el-table-column>
                <el-table-column
                    prop="with_ticket.with_city.city_name"
                    align="center"
                    label="报考城市">
                </el-table-column>
                <el-table-column
                    prop="with_ticket.reserve.examplace.place_name"
                    align="center"
                    label="考点">
                </el-table-column>
                <el-table-column
                    prop="with_ticket.reserve.examroom.room_name"
                    align="center"
                    label="考场">
                </el-table-column>
                <el-table-column
                    label="试卷状态"
                    align="center">
                    <template scope="scope">{{ scope.row.status | statusTotxt }}</template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align="center">
                    <template scope="scope">
                        <a href="javascript:;" class="link-1" @click="showDetail(scope.row)">{{ scope.row.status | statusTobtn }}</a>
                    </template>
                </el-table-column>
            </el-table>

            <Paging :searchRecord="searchRecord" @reload="init(searchRecord)"></Paging>
        </div>
    </div>
</template>

<script>
    import mixin from '@/mixins/mixin'
    import {mapGetters, mapActions} from 'vuex'
    import markApi from '@/api/mark'
    import commonApi from '@/api/common'

    export default {
        name: 'Undecided',
        mixins: [mixin],
        data() {
            return {
                status:{
                    0: '全部',
                    2: '未评',
                    4: '已评',
                },
                searchForm: {
                    name: '',
                    place_id: '',
                    plan_id: '',
                    status: 2,
                    ticket_number: '',
                },
            }
        },
        computed: {
            ...mapGetters({
                curid : 'getcurid',
                venues: 'allVenues',
                plans: 'allPlans',
            })

        },
        methods:{
            ...mapActions([
                'getVenues',
                'getPlans',
                'setcurid',
            ]),
            showDetail (item){
                this.$router.push({
                    path: 'undecided/detail',
                    query: {
                        id: item.id,
                        status: this.searchForm.status
                    }
                })
            },
            getInitData (params) {
                return markApi.getExamlist(params)
            },
        },
        created (){
            this.getVenues();
            this.getPlans();
        },
        filters: {
            statusTotxt: function (v) {
                if (!v) return '';
                switch(+v){
                    case 0:
                        return '初始化';
                        break;
                    case 1:
                        return '进行中';
                        break;
                    case 2:
                        return '未评分'; // 评卷
                        break;
                    case 3:
                        return '评分中';   // 锁定中
                        break;
                    case 4:
                        return '评分完成';  // 详情
                        break;
                    case 5:
                        return '公布成绩';
                        break;
                }
            },
            statusTobtn: function (v) {
                if (!v) return '';
                switch(+v){
                    case 0:
                        return '初始化';
                        break;
                    case 1:
                        return '进行中';
                        break;
                    case 2:
                        return '评卷';
                        break;
                    case 3:
                        return '锁定中';
                        break;
                    case 4:
                        return '详情';
                        break;
                    case 5:
                        return '公布成绩';
                        break;
                }

            }
        },

    }
</script>