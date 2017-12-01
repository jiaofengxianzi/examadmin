<template>
    <!-- 按题目评卷 -->
    <div class="topic-detail">
        <div class="section">
            <div class="sear-tit">评卷<a href="javascript:;" class="go-back" @click="goback">返回</a></div>

            <div class="head_box" v-if="examInfoLists.length">
                <div v-for="item in examInfoLists" :key="item.id">
                    <dl>
                        <dt>题目ID：</dt>
                        <dd>{{ item.id }}</dd>
                        <dt>分值：</dt>
                        <dd>{{ item.grade.value }}分</dd>
                    </dl>
                    <div class="question">{{ item.with_item.with_detail.body }}</div>
                </div>

                <div class="answer_box">
                    <table class="table-s2" :class="'the-table' + index" v-for="(item, index) in examInfoLists" :key="item.id">
                        <tr>
                            <th>学生作答情况</th>
                            <th>得分</th>
                        </tr>
                        <tbody>
                            <tr>
                                <td>
                                    <!-- 5：简答题 6：附件题 -->
                                    <div class="answer" v-if="item.type==5">{{ item.user_answer[0] }}</div>
                                    <div class="answer" v-else><a :href="item.user_answer" download class="link-1">该题为附件题，请点击此处下载查看后评分</a></div>
                                </td>
                                <td>
                                    <div class="opera">
                                        <div class="s1">
                                            <ul class="score-card" v-show="item.isShowCard">
                                                <li v-for="num in scoreList" :key="num" @mousedown="grade(item, num)">{{num}}</li>
                                                <li @mousedown="grade(item, 0)">0</li>
                                            </ul>
                                            <input 
                                                type="text"
                                                class="el-input__inner"
                                                placeholder=""
                                                v-model="item.score"
                                                v-focus="item.isShowCard"
                                                @blur="hideCard(item, index)"
                                                @focus="showCard(item, index)"
                                                @input="limitSubmit(item)"
                                                @keyup.enter="hideCard(item)"
                                                @keyup.up="keyUp($event, item, index)"
                                                @keyup.down="keyDown($event, item, index)"
                                            >
                                        </div>
                                        <!-- <div class="s2">
                                            <el-button type="primary"  @click="submit(item)">提交</el-button>
                                        </div> -->
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <div class="ps-empty" v-else>
                全部试题已评完！
            </div>
        </div>

    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import markApi from '@/api/mark'
    import markMixin from './../mixins/markMixin'
    
    export default {
        name: 'TopicDetail',
        mixins: [markMixin],
        data() {
            return {
                examInfoLists: [],
                // 按题目
                type: 4,
                id: this.$route.query.id,
                ruleForm: {
                    item_id: this.$route.query.itemId,
                    plan_id: this.$route.query.planId,
                    status: this.$route.query.status,
                },
            }
        },
        computed: {
            // 初始化分数数组并翻转
            scoreList () {
                return Array.from({length: this.examInfoLists[0].grade.value}, (k, v) => v + 1).reverse()
            }
        },
        methods:{
            // 返回
            goback () {
                this.$router.push(
                    { path: '/mark/topics'}
                )
            },

            getQuestionItem (parm){
                markApi.getQuestionItem(parm).then((req)=>{
                    var data = req.data;
                    if(data.ret==0){
                        // 0：未评分，1：评卷中，2：已评卷（设置默认分数显示）
                        data.data.lists.forEach((v) => v.score = v.grade_status!=2 ? '' : v.score);

                        this.examInfoLists = data.data.lists.map((item) => {
                            item.isShowCard = false;
                            return item;
                        })
                    }else{
                        layer.msg(data.res_info, {time: 2000, icon: 2})
                    }
                })
            },
        },
        created () {
            this.getQuestionItem(this.ruleForm);
        },
    }
</script>

