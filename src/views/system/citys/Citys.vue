<template>
    <div class="citys">
        <div class="section">
            <div class="sear-tit">报考城市</div>
            <div class="city-tag">
                <div class="empty" v-if="!citys.length">
                    还没有添加城市！
                </div>
                <el-tag v-else v-for="city in citys" :key="city.id" :closable="true" @close="remove(city)">
                    {{city.city_name}}
                </el-tag>
            </div>
        </div>

        <div class="section">
            <div class="sear-tit">添加城市</div>
            <el-input v-model="ruleForm.city_name" @keyup.enter.native="add"></el-input>
            <el-button type="primary" @click="add">添加</el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'citys',
        data() {
            return {
                ruleForm: {
                    city_name: ''
                },
                dictType: 'city',
            }
        },
        methods: {
            ...mapActions([
                'getCitys',
                'systemset'
            ]),
            add () {
                if(!this.ruleForm.city_name){
                    layer.msg('城市名字不能为空！', {time: 2000, icon: 2})
                    return;
                }
                this.systemset({
                    action_type: 'add',
                    city_name: this.ruleForm.city_name,
                    dict_type: this.dictType
                }).then(()=>{
                    this.ruleForm.city_name = '';
                    this.getCitys();
                    layer.msg('添加成功', {time: 2000, icon: 1})
                })
            },
            remove (city) {
                this.systemset({
                    action_type: 'delete',
                    city_id: [city.id],
                    dict_type: this.dictType
                }).then(()=>{
                    this.getCitys();
                    layer.msg('删除成功', {time: 2000, icon: 1})
                })
            },
        },
        computed: {
            ...mapGetters({
                citys: 'allCitys'
            })
        },
        mounted () {
            this.getCitys()
        }
    }
</script>

<style>
    .citys .empty{ font-size: 15px; text-indent: 20px; padding-bottom: 15px;}
</style>

