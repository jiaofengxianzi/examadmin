<style scoped>
    .score .details header{
        width:800px;
        background: #EAECED;
        padding:0 20px;
    }
    .score .jishi .total-score,.score .shijian .total-score{
        width:800px;
        padding:0 20px;
        background: #f9f9f9;
    }
    .score main section{
        padding:0 20px;
        margin: 20px 0;
    }
    .score main section table tr{
        width:800px;
        margin-bottom: 20px;
        display: table;
    }
    .score .tr-tit{ font-weight: 700;}
    .score-detail .el-radio-group .el-radio{ line-height: 30px; margin-right: 15px; margin-left: 0;}
    .score-detail .el-checkbox{ line-height: 30px; margin-right: 15px; margin-left: 0;}
</style>
<template>
    <div class="sys-scenes score score-detail" v-if="JSON.stringify(testInfo) != '{}'">
        <div class="clearfix section">
            <div class="sear-tit">
                <a href="javascript:history.go(-1);" class="go-back">返回</a>试卷详情
            </div>
            <div class="details">
                <header>
                    <table width="800" height="30px">
                        <tr>
                            <td>考生姓名：{{testInfo.ticket.name}}</td>
                            <td align="center">准考证号码：{{testInfo.ticket.number}}</td>
                            <td align="right">考试计划名称：{{testInfo.plan.plan_name}}</td>
                        </tr>
                    </table>
                </header>
                <main>
                    <div class="jishi">
                        <div class="total-score">
                            <table width="800" height="50px">
                                <tr class="tr-tit">
                                    <td width="50%">机试分数：100分</td>
                                    <td width="50%" align="right">考生得分：{{testInfo.computer_grade}}分</td>
                                </tr>
                            </table>
                        </div>
                        <section class="radio-topic" v-if="testInfo.detail.type1 && testInfo.detail.type1.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">单选题（共{{testInfo.detail.type1.length}}题，每题{{testInfo.detail.type1[0].item_score}}分）</td>
                                    <!-- <td width="50%" align="right">题型得分：{{item.score}}分</td> -->
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in testInfo.detail.type1" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <el-radio-group v-if="item.user_answer" v-model="item.user_answer[0]" >
                                        <el-radio v-for="items in item.with_item.with_detail.options" :key="items" :label="items">{{items}}</el-radio>
                                    </el-radio-group>
                                    <el-radio-group v-else>
                                        <el-radio v-for="items in item.with_item.with_detail.options" :key="items" :label="items">{{items}}</el-radio>
                                    </el-radio-group>
                                </tr>
                            </table>
                        </section>

                        <section class="checkbox-topic" v-if="testInfo.detail.type2 && testInfo.detail.type2.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">多选题（共{{testInfo.detail.type2.length}}题，每题{{testInfo.detail.type2[0].item_score}}分）</td>
                                    <!-- <td width="50%" align="right">题型得分：{{item.score}}分</td> -->
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in testInfo.detail.type2" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <el-checkbox-group v-if="item.user_answer" v-model="item.user_answer">
                                        <el-checkbox v-for="items in item.with_item.with_detail.options" :key="items" :label="items"></el-checkbox>
                                    </el-checkbox-group>
                                    <el-checkbox-group v-else>
                                        <el-checkbox v-for="items in item.with_item.with_detail.options" :key="items" :label="items"></el-checkbox>
                                    </el-checkbox-group>
                                </tr>
                            </table>
                        </section>

                        <section class="fill-topic" v-if="testInfo.detail.type3 && testInfo.detail.type3.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">填空题（共{{testInfo.detail.type3.length}}题，每题{{testInfo.detail.type3[0].item_score}}分）</td>
                                    <!-- <td width="50%" align="right">题型得分：{{item.score}}分</td> -->
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in testInfo.detail.type3" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <td v-if="item.user_answer">{{item.user_answer[0]}}</td>
                                    <td v-else></td>
                                    <td align="right"></td>
                                </tr>
                            </table>
                        </section>

                        <section class="judge-topic" v-if="testInfo.detail.type4 && testInfo.detail.type4.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">判断题（共{{testInfo.detail.type4.length}}题，每题{{testInfo.detail.type4[0].item_score}}分）</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in testInfo.detail.type4" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <el-radio-group v-if="item.user_answer" v-model="item.user_answer[0]" >
                                        <el-radio v-for="items in item.with_item.with_detail.options" :key="items" :label="items">{{items}}</el-radio>
                                    </el-radio-group>
                                    <el-radio-group v-else>
                                        <el-radio v-for="items in item.with_item.with_detail.options" :key="items" :label="items">{{items}}</el-radio>
                                    </el-radio-group>
                                </tr>
                            </table>
                        </section>

                        <section class="short-topic" v-if="testInfo.detail.type5 && testInfo.detail.type5.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">简答题（共{{testInfo.detail.type5.length}}题，每题{{testInfo.detail.type5[0].item_score}}分）</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in testInfo.detail.type5" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <td v-if="item.user_answer">{{item.user_answer[0]}}</td>
                                    <td v-else></td>
                                </tr>
                            </table>
                        </section>

                        <section class="short-topic" v-if="testInfo.detail.type6 && testInfo.detail.type6.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">论述题（共{{testInfo.detail.type6.length}}题，每题{{testInfo.detail.type6[0].item_score}}分）</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in testInfo.detail.type6" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <td v-if="item.user_answer">{{item.user_answer[0]}}</td>
                                    <td v-else></td>
                                </tr>
                            </table>
                        </section>
                    </div>
                    
                    <div class="shijian" v-if="testInfo.detail.type7 && testInfo.detail.type7.length">
                        <div class="total-score">
                            <table width="800" height="50px">
                                <tr class="tr-tit">
                                    <td width="50%">实践分数：100分</td>
                                    <td width="50%" align="right">考生得分：{{testInfo.practicality_grade}}分</td>
                                </tr>
                            </table>
                        </div>
                        <section class="short-topic">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td><h3>附件题（共{{testInfo.detail.type7.length}}题，每题{{testInfo.detail.type7[0].item_score}}分）</h3></td>
                                    <!-- <td align="right">题型得分：85分</td> -->
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in testInfo.detail.type7" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr v-if="item.user_answer">
                                    <td>答：<a :href="item.user_answer.toString()" download>{{item.user_answer.toString()}}</a></td>
                                </tr>
                            </table>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
    import monitorApi from '@/api/monitor'
    import Paging from '@/components/Paging'
    import {mapGetters, mapActions} from 'vuex'
    
    export default {
        name: 'sys-scenes',
        data() {
            return {
                //考生信息
                paper_id: this.$route.query.id,
                //试题信息
                testInfo:{}
            }
        },
        methods: {
            upload () {
                var _this = this;
                monitorApi.examPaperDetail({paper_id: this.$route.query.id}).then((req)=>{
                    if(req.data.ret == 0){
                        this.testInfo = req.data.data;
                    }else{
                        layer.msg(req.data.res_info, { time: 2500, icon: 2})
                    }
                })
            },
        },
        mounted () {
            this.upload()
        }
    }
</script>

