<template>
    <!-- 按考生评卷 -->
    <div class="markE">
        <div class="section examineeInfo">
            <div class="sear-tit">考生信息<a href="javascript:;" class="go-back" @click="goback">返回</a></div>

            <el-table
                :data="[examInfo]"
                border
                style="width: 100%">
                <el-table-column
                    align="center"
                    prop="number"
                    label="准考证号码">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="place"
                    label="考点">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="room"
                    label="考场">
                </el-table-column>
            </el-table>
        </div>

        <div class="section" v-if="examInfoLists.length">
            <div class="sear-tit notFirst">答卷</div>
            <div class="answer_box">
                <table class="table-s2" v-for="(item, index) in examInfoLists" :key="item.id">
                    <tr>
                        <th>题目ID：{{ item.id }}</th>
                        <th>分值：{{ item.grade.value }}分</th>
                    </tr>
                    <tbody>
                    <tr>
                        <td>
                            <div class="ques">
                                <div class="question">{{ item.with_item.with_detail.body }}</div>
                                <div class="answer">
                                    <p>学员答题情况：</p>
                                    <!-- 5：简答题 6：附件题 -->
                                    <div class="answer" v-if="item.type==5">{{ item.user_answer[0] }}</div>
                                    <div class="answer" v-else><a :href="item.user_answer" download class="link-1">该题为附件题，请点击此处下载查看后评分</a></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="opera">
                                <div class="s1">
                                    <ul class="score-card" v-show="item.isShowCard">
                                        <li v-for="num in item.scoreList" :key="num" @mousedown="grade(item, num)">{{num}}</li>
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
                                        @keyup.enter="hideCard(item, index)"
                                        @keyup.up="keyUp($event, item, index)"
                                        @keyup.down="keyDown($event, item, index)"
                                    >
                                </div>
                                <!-- <div class="s1">
                                    <el-input placeholder="" v-model="item.score"></el-input>
                                </div> -->
                                <!-- <div class="s2">
                                    <el-button type="primary" @click="submit({'id': item.id, 'score': item.score})">提交</el-button>
                                </div> -->
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="center">
                <el-button type="primary" @click="next(ruleForm)">提交并转至下一位</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import markApi from '@/api/mark'
    import markMixin from './../mixins/markMixin'

    export default {
        mixins: [markMixin],
        data() {
            return {
                ruleForm: {
                    id: this.$route.query.id,
                    status: this.$route.query.status,
                },
                // 按考生
                type: 2,

                examInfo: {},
                // 试题列表
                examInfoLists: [],
            }
        },
        methods:{
            // 返回
            goback () {
                this.$router.push(
                    { path: '/mark/students'}
                )
            },
            // 回调
            examCallBack (data) {
                data.lists.forEach((v) => v.score = v.grade_status != 2 ? '' : v.score);
                this.examInfo = data
                this.examInfoLists = data.lists.map((item) => {
                    // 给每道题添加分数卡片显隠字段，默认不显示
                    item.isShowCard = false;
                    // 给每道题生成分数卡数组
                    item.scoreList = Array.from({length: item.grade.value}, (k, v) => v + 1).reverse();
                    return item;
                });
            },
            // 获取页面详情
            getExamInfo(ruleForm){
                markApi.getExamInfo(ruleForm).then((req)=>{
                    var data = req.data;
                    if(data.ret==0){
                        this.examCallBack(data.data)
                    }else{
                        layer.msg(data.res_info, { time: 2000, icon: 2 })
                    }
                })
            },
            // 下一题
            next(ruleForm){
                markApi.nextExaminfo(ruleForm).then((req)=>{
                    var data = req.data;
                    if(data.ret==0){
                        this.examCallBack(data.data)
                        // 下一题时更新存储ID
                        this.ruleForm.id = data.data.where.id;

                        // 更新路由
                        this.$router.push({
                            path: this.$route.path,
                            query: {
                                id: this.ruleForm.id,
                                status: this.ruleForm.status
                            }
                        });
                    }else{
                        layer.msg(data.res_info, { time: 2000, icon: 2 })
                    }
                })
            },
        },
        created () {
            this.getExamInfo(this.ruleForm);
        }
    }
</script>