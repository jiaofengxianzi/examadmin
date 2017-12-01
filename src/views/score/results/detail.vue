
<template>
    <div class="sys-scenes score" v-if="JSON.stringify(detailData) != '{}'">
        <div class="clearfix section">
            <div class="sear-tit">
                <a href="javascript:history.go(-1);" class="go-back">返回</a>
                试卷详情
            </div>
            <div class="details">
                <header>
                    <table width="800" height="30px">
                        <tr>
                            <td>考生姓名：{{detailData.name}}</td>
                            <td align="center">准考证号码：{{detailData.number}}</td>
                            <td align="right">考试计划名称：{{detailData.plan_name}}</td>
                        </tr>
                    </table>
                </header>
                <main>
                    <div class="jishi">
                        <div class="total-score">
                            <table width="800" height="50px">
                                <tr class="tr-tit">
                                    <td width="50%">机试分数：{{detailData.paper_score}}分</td>
                                    <td width="50%" align="right">考生得分：{{detailData.get_paper_score}}分</td>
                                </tr>
                            </table>
                        </div>
                        <section class="radio-topic" v-if="detailData.items_list.type1 && detailData.items_list.type1.item.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">单选题（共{{detailData.items_list.type1.item.length}}题，每题{{detailData.items_list.type1.item[0].sc_score}}分）</td>
                                    <td width="50%" align="right">题型得分：{{detailData.items_list.type1.total_score}}分</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in detailData.items_list.type1.item" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}：</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <el-radio-group v-if="item.user_answer" v-model="item.user_answer[0]" :title="item.user_answer[0] + 'kk'">
                                        <el-radio :label="option" :key="option"   v-for="option in item.with_item.with_detail.options" >{{option}}</el-radio>
                                    </el-radio-group>
                                    <el-radio-group v-else>
                                        <el-radio :label="option" :key="option"   v-for="option in item.with_item.with_detail.options" >{{option}}</el-radio>
                                    </el-radio-group>
                                </tr>
                            </table>
                        </section>

                        <section class="checkbox-topic" v-if="detailData.items_list.type2 && detailData.items_list.type2.item.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">多选题（共{{detailData.items_list.type2.item.length}}题，每题{{detailData.items_list.type2.item[0].sc_score}}分）</td>
                                    <td width="50%" align="right">题型得分：{{detailData.items_list.type2.total_score}}分</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in detailData.items_list.type2.item" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}：</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <el-checkbox-group v-if="item.user_answer" v-model="item.user_answer" :title="item.user_answer">
                                        <el-checkbox :label="option"  :key="option"   v-for="option in item.with_item.with_detail.options" >{{option}}</el-checkbox>
                                    </el-checkbox-group>
                                    <el-checkbox-group v-else>
                                        <el-checkbox :label="option"  :key="option"   v-for="option in item.with_item.with_detail.options" >{{option}}</el-checkbox>
                                    </el-checkbox-group>
                                </tr>
                            </table>
                        </section>

                        <section class="fill-topic" v-if="detailData.items_list.type3 && detailData.items_list.type3.item.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">填空题（共{{detailData.items_list.type3.item.length}}题，每题{{detailData.items_list.type3.item[0].sc_score}}分）</td>
                                    <td width="50%" align="right">题型得分：{{detailData.items_list.type3.total_score}}分</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in detailData.items_list.type3.item" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}：</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <td >答：{{item.user_answer && item.user_answer.toString()}}</td>
                                </tr>
                            </table>
                        </section>

                        <section class="short-topic" v-if="detailData.items_list.type4 && detailData.items_list.type4.item.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">判断题（共{{detailData.items_list.type4.item.length}}题，每题{{detailData.items_list.type4.item[0].sc_score}}分）</td>
                                    <td width="50%" align="right">题型得分：{{detailData.items_list.type4.total_score}}分</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in detailData.items_list.type4.item" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}：</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <td>答：{{item.user_answer.toString()}}</td>
                                </tr>
                            </table>
                        </section>

                        <section class="short-topic" v-if="detailData.items_list.type5 && detailData.items_list.type5.item.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">简答题（共{{detailData.items_list.type5.item.length}}题，每题{{detailData.items_list.type5.item[0].sc_score}}分）</td>
                                    <td width="50%" align="right">题型得分：{{detailData.items_list.type5.total_score}}分</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in detailData.items_list.type5.item" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}：</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <td>答：{{item.user_answer && item.user_answer.toString()}}</td>
                                </tr>
                            </table>
                        </section>

                        <section class="short-topic" v-if="detailData.items_list.type6 && detailData.items_list.type6.item.length">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td width="50%">论述题（共{{detailData.items_list.type6.item.length}}题，每题{{detailData.items_list.type6.item[0].sc_score}}分）</td>
                                    <td width="50%" align="right">题型得分：{{detailData.items_list.type6.total_score}}分</td>
                                </tr>
                            </table>
                            <table class="subject" width="800" v-for="(item,index) in detailData.items_list.type6.item" :key="index">
                                <tr>
                                    <td>{{index+1}}.{{item.with_item.with_detail.body}}：</td>
                                    <td align="right">题目得分：{{item.score}}分</td>
                                </tr>
                                <tr>
                                    <td>答：{{item.user_answer && item.user_answer.toString()}}</td>
                                </tr>
                            </table>
                        </section>
                    </div>
                    
                    <div class="shijian" v-if="detailData.items_list.type7 && detailData.items_list.type7.item.length">
                        <div class="total-score">
                            <table width="800" height="50px">
                                <tr class="tr-tit">
                                    <td width="50%">实践分数：100分</td>
                                    <td width="50%" align="right">考生得分：{{detailData.items_list.type7.total_score}}分</td>
                                </tr>
                            </table>
                        </div>
                        <section class="short-topic">
                            <table width="800">
                                <tr class="tr-tit">
                                    <td>一、附件题（共{{detailData.items_list.type7.item.length}}题，每题{{detailData.items_list.type7.item[0].sc_score}}分）</td>
                                    <td align="right">题型得分：{{detailData.items_list.type7.total_score}}分</td>
                                </tr>
                            </table>
                            <table class="subject" width="800">
                                <tr>
                                    <td>1.{{detailData.items_list.type7.item[0].with_item.with_detail.body}}？</td>
                                    <td align="right">题目得分：{{detailData.items_list.type7.item[0].score}}分</td>
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
    import scoreApi from '@/api/score'
    import Paging from '@/components/Paging'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'detail',
        data () {
            return {
                id : this.$route.query.id,
                detailData: {},
            }
        },
        methods: {
            getDetail(){
                var _this = this
                this.$axios.post('score/score_detail',{id : _this.id}).then(function(scoreDetail){
                    if(scoreDetail.data.ret == 0){
                        _this.detailData = scoreDetail.data.data
                    }
                })
            }
        },
        mounted () {
            this.getDetail()
        }
    }
</script>
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
    p.answer{
        text-decoration: underline;
        width: 600px
    }
</style>

