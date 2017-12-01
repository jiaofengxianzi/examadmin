<template>
    <div class="room-conf">
        <div class="conf-room section">
            <div class="sear-tit">步骤二：配置考场信息(已配置考场人数：{{total}})</div>
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="报考城市：" prop="city_id" label-width="120px">
                    <el-select placeholder="请选择" v-model="ruleForm.city_id" @change="changeVenues" name="citys">
                        <el-option  v-for="item in citys" :key="item.id" :label="item.city_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item> 
                <el-form-item label="考点：" prop="spot_id" label-width="60px">
                    <el-select placeholder="请选择" v-model="ruleForm.spot_id" @change="changeRooms" name="spots">
                        <el-option  v-for="item in venues" :key="item.id" :label="item.place_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考场：" prop="room_ids" label-width="60px">
                    <el-select placeholder="考场" v-model="ruleForm.room_ids" name="rooms" multiple>
                        <el-option  v-for="item in rooms" :key="item.id" :label="item.room_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="add('ruleForm')">确认添加</el-button>
                </el-form-item>
            </el-form>

            <div class="room-lists">
                <el-table ref="multipleTable" :data="room_lists" border tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="city" label="报考城市" width="150" align="center"></el-table-column>
                    <el-table-column prop="place_name" label="考点" width="150" align="center"></el-table-column>
                    <el-table-column label="考场" align="center">
                        <template scope="scope">
                            {{scope.row.list.map(item => item.room_name).join('，')}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                        <template scope="scope">
                            <el-button type="text" @click.native="remove(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
            <div class="btn-item">
                <el-button type="primary" @click="submitForm()">保存</el-button>
            </div>
        </div>


    </div>
</template>

<script>
import schemeApi from '@/api/scheme'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'room-conf',
    props: ['planPaper', 'plan_id'],
    data() {
        return {
            ruleForm: {
                plan_id: this.plan_id,
                city_id: '',
                spot_id: '',
                room_ids: [],
            },
            room_lists: [],
            rules: {
                city_id: [
                    { required: true, message: '请选择城市', },
                ],
                spot_id: [
                    { required: true, message: '请选择考点', },
                ],
                room_ids: [
                    { required: true, message: '请选择考场', },
                ],
            },
            // 判断数据是否有添加或删除
            isUpdate: false,
        };
    },
    computed: {
        ...mapGetters({
            citys: 'allCitys',
            venues: 'allVenues',
            rooms: 'allRooms',
        }),
        // 查找城市名
        cityLabel () {
            if(!this.ruleForm.city_id) return ''
            return this.citys.find(city => city.id == this.ruleForm.city_id).city_name
        },
        // 查找考点名
        spotLabel () {
            if(!this.ruleForm.spot_id) return ''
            return this.venues.find(spot => spot.id == this.ruleForm.spot_id).place_name
        },
        // 返回所选考场的对象数组
        roomLabelLists () {
            if(!this.ruleForm.room_ids.length) return [];
            this.isUpdate = true
            return this.ruleForm.room_ids.map((id, index)=>{
                return this.rooms.find(room => room.id == id)
            })
        },
        // 已保存的考场列表
        roomIdList () {
            return this.room_lists.reduce((pre, cur)=>{
                return pre.concat(cur.list)
            }, [])
        },
        // 配置的考场总人数
        total () {
            return this.roomIdList.reduce((pre, cur) => {
                return pre + cur.seating_total
            }, 0);
        }
    },
    watch: {
        planPaper (curVal, oldVal) {
            this.room_lists = curVal.room_info
        }
    },
    methods: {
        ...mapActions([
            'getCitys',
            'getVenues',
            'getRooms',
        ]),
        changeVenues (val) {
            this.ruleForm.spot_id = '';
            this.getVenues(val);
        },
        changeRooms (val) {
            this.ruleForm.room_ids = [];
            this.getRooms(val);
        },
        add (formName) {
            // 判断是否有重复添加考场
            var isRepeatAdd = false;
            this.ruleForm.room_ids.forEach((id) => {
                if(this.roomIdList.find(room => room.id == id)){
                    isRepeatAdd = true;
                    return;
                }
            })
            if(isRepeatAdd){
                layer.msg('同一个考场不能重复添加', {icon: 2, time: 2000})
                return;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.room_lists.push({
                        city: this.cityLabel,
                        place_name: this.spotLabel,
                        list: this.roomLabelLists
                    })
                } else {
                    return false;
                }
            });
        },
        remove (index) {
            this.room_lists.splice(index, 1)
            this.isUpdate = true
        },
        submitForm() {
            if(!this.isUpdate){
                layer.msg('考场信息没有变动！', {time: 2500, icon: 2})
                return;
            }
            schemeApi.planconfigRoom({
                plan_id: this.ruleForm.plan_id,
                room_ids: this.roomIdList.map(room => room.id),
            }).then((res)=>{
                if(res.data.ret == 0) {
                    this.isUpdate = false
                    layer.msg('保存成功', {time: 2500, icon: 1})
                }else{
                    layer.msg(res.data.res_info, {time: 2500, icon: 2})
                }
            });
        }
    },
    mounted () {
        this.getCitys();  
    }
}
</script>

<style>
.room-conf{ margin-bottom: 10px; }
.room-conf .room-lists{ margin-top: 10px; margin-bottom: 15px; }
.room-conf [name=rooms]{ width: 300px; }
</style>