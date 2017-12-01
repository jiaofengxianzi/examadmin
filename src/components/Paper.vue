<template>
    <div class="exma-paper">
        <!-- <div class="section section-types" :class="{'fixed': isfixed}">
            <ul class="list">
                <li v-for="(item, index) in items" :key="item.type"><a href="javascript:;" @click="goAnchor(item.type)">{{item.type}}</a></li>
            </ul>
        </div> -->
        
        <div class="section section-topics">
            <div class="piece" data-type="单选题" v-if="items['单选题']">
                <h5>单选题</h5>
                <table class="paper-table">
                    <template v-for="(item, index) in items['单选题'].topics">
                        <tr :key="index">
                            <td class="td-num" rowspan="3">{{index +1}}、</td>
                            <td class="td-label">题干：</td>
                            <td class="td-body">{{item.body}}<strong class="stg">（{{item.score}}分）</strong></td>
                            <!-- <td class="td-score">结果</td> -->
                        </tr>
                        <tr :key="index">
                            <td class="td-label">选项：</td>
                            <td class="td-body">
                                <el-radio-group>
                                    <el-radio :label="option" :key="option" v-for="option in item.options" >{{option}}</el-radio>
                                </el-radio-group>
                            </td>
                            <!-- <td class="td-score" rowspan="2">成功</td> -->
                        </tr>
                        <tr :key="index">
                            <td class="td-label">答案：</td>
                            <td class="td-body">{{item.answer[0]}}</td>
                        </tr>
                    </template>
                </table>
            </div>
            
            <div class="piece" data-type="多选题" v-if="items['多选题']">
                <h5>多选题</h5>
                <table class="paper-table">
                    <template v-for="(item, index) in items['多选题'].topics">
                        <tr :key="index">
                            <td class="td-num" rowspan="3">{{index +1}}、</td>
                            <td class="td-label">题干：</td>
                            <td class="td-body">{{item.body}}<strong class="stg">（{{item.score}}分）</strong></td>
                            <!-- <td class="td-score">结果</td> -->
                        </tr>
                        <tr :key="index">
                            <td class="td-label">选项：</td>
                            <td class="td-body">
                                <el-checkbox-group>
                                    <el-checkbox :label="option" :key="option" v-for="option in item.options" >{{option}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                            <!-- <td class="td-score" rowspan="2">成功</td> -->
                        </tr>
                        <tr :key="index">
                            <td class="td-label">答案：</td>
                            <td class="td-body">{{item.answer.join('、')}}</td>
                        </tr>
                    </template>
                </table>
            </div>

            <div class="piece" data-type="判断题" v-if="items['判断题']">
                <h5>判断题</h5>
                <table class="paper-table">
                    <template v-for="(item, index) in items['判断题'].topics">
                        <tr :key="index">
                            <td class="td-num" rowspan="2">{{index +1}}、</td>
                            <td class="td-label">题干：</td>
                            <td class="td-body">{{item.body}}<strong class="stg">（{{item.score}}分）</strong></td>
                            <!-- <td class="td-score">结果</td> -->
                        </tr>
                        <tr :key="index">
                            <td class="td-label">答案：</td>
                            <td class="td-body">{{item.answer[0]}}</td>
                            <!-- <td class="td-score">成功</td> -->
                        </tr>
                    </template>
                </table>
            </div>

            <div class="piece" data-type="填空题" v-if="items['填空题']">
                <h5>填空题</h5>
                <table class="paper-table">
                    <template v-for="(item, index) in items['填空题'].topics">
                        <tr :key="index">
                            <td class="td-num" rowspan="2">{{index +1}}、</td>
                            <td class="td-label">题干：</td>
                            <td class="td-body">{{item.body}}<strong class="stg">（{{item.score}}分）</strong></td>
                            <!-- <td class="td-score">结果</td> -->
                        </tr>
                        <tr :key="index">
                            <td class="td-label">答案：</td>
                            <td class="td-body">{{item.answer[0]}}</td>
                            <!-- <td class="td-score">成功</td> -->
                        </tr>
                    </template>
                </table>
            </div>

            <div class="piece" data-type="简答题" v-if="items['简答题']">
                <h5>简答题</h5>
                <table class="paper-table">
                    <template v-for="(item, index) in items['简答题'].topics">
                        <tr :key="index">
                            <td class="td-num" rowspan="2">{{index +1}}、</td>
                            <td class="td-label" rowspan="2">题干：</td>
                            <td class="td-body" rowspan="2">{{item.body}}<strong class="stg">（{{item.score}}分）</strong></td>
                            <!-- <td class="td-score">结果</td> -->
                        </tr>
                        <tr :key="index">
                            <!-- <td class="td-score">成功</td> -->
                        </tr>
                    </template>
                </table>
            </div>

            <div class="piece" data-type="论述题" v-if="items['论述题']">
                <h5>论述题</h5>
                <table class="paper-table">
                    <template v-for="(item, index) in items['论述题'].topics">
                        <tr :key="index">
                            <td class="td-num" rowspan="2">{{index +1}}、</td>
                            <td class="td-label" rowspan="2">题干：</td>
                            <td class="td-body" rowspan="2">{{item.body}}<strong class="stg">（{{item.score}}分）</strong></td>
                            <!-- <td class="td-score">结果</td> -->
                        </tr>
                        <tr :key="index">
                            <!-- <td class="td-score">成功</td> -->
                        </tr>
                    </template>
                </table>
            </div>
            
            <div class="piece" data-type="实践题" v-if="items['实践题']">
                <h5>实践题</h5>
                <table class="paper-table">
                    <template v-for="(item, index) in items['实践题'].topics">
                        <tr :key="index">
                            <td class="td-num" rowspan="2">{{index +1}}、</td>
                            <td class="td-label">题干：</td>
                            <td class="td-body">{{item.body}}<strong class="stg">（{{item.score}}分）</strong></td>
                            <!-- <td class="td-score">结果</td> -->
                        </tr>
                        <tr :key="index" v-if="item.file_url">
                            <td class="td-label">附件：</td>
                            <td class="td-body">
                                <a class="a-link" :href="item.file_url" download>附件下载</a>
                            </td>
                            <!-- <td class="td-score">成功</td> -->
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'exma-paper',
        props: ['paperItems'],
        data () {
            return {
                isfixed: false,
            }
        },
        computed: {
            items () {
                return this.paperItems.reduce((pre, cur) => {
                    pre[cur.type] = cur
                    return pre;
                }, {})
            },
        },
        methods: {
            // goAnchor (type) {
            //     var anchor = this.$el.querySelector('[data-type= ' + type + ' ]')
            //     document.querySelector('.view').scrollTop = anchor.offsetTop - 68
            // },
            // viewScroll () {
            //     var _this = this;
            //     var view = document.querySelector('.view');
            //     var top = document.querySelector('.exma-paper').offsetTop;
            //     view.onscroll = function() {
            //         _this.isfixed = view.scrollTop > top - 72 ? true : false
            //     }
            // }
        },
        mounted () {
            // this.viewScroll();
        }
    }
</script>

<style>
    /* .exma-paper .section-types{ float: left; width: 60px; text-align: center; border: 1px solid #e7e7e7; border-right: none; }
    .exma-paper .section-types li{ border-bottom: 1px solid #e7e7e7; }
    .exma-paper .section-types li:last-child{ border-bottom: none; }
    .exma-paper .section-types.fixed{ position: absolute; top: 70px; }
    .exma-paper .section-types a{ color: inherit; cursor: pointer; font-size: 14px; line-height: 24px; }
    .exma-paper .section-types a:hover{ text-decoration: none; } */
    .exma-paper .section-topics{ width: 1000px; border: 1px solid #e7e7e7; padding: 10px; overflow: hidden;}
    .exma-paper .piece{ margin-bottom: 15px;}
    .exma-paper .piece h5{ font-size: 15px; font-weight: 700; }
    .paper-table{ width: 100%; background-color: #eefef6; }
    .paper-table td{ line-height: 30px; }
    .paper-table .stg{ font-weight: 700; }
    .paper-table .td-num{ width: 40px; text-align: right; vertical-align: top; }
    .paper-table .td-label{ width: 50px; text-align: right; font-weight: 700; vertical-align: top; }
    .paper-table .td-score{ width: 100px; text-align: center; }
    .paper-table .el-radio-group .el-radio{ line-height: 30px; margin-right: 15px; margin-left: 0;}
    .paper-table .el-checkbox{ line-height: 30px; margin-right: 15px; margin-left: 0;}
</style>

