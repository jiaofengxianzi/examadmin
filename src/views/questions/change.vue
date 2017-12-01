<style scoped>
    /*.el-dialog{width:800px;}*/
</style>
<template>
    <div class="sys-add">
        <el-form ref="resultForm" :model="resultForm" label-width="80px">
            <el-form-item label="科目名称：" prop="name">
                <el-select  placeholder="请选择" filterable clearable :disabled="!!publish" v-model="resultForm.course_id">
                    <el-option v-for="item in courses" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="题型选择：" prop="type">
                <el-select  placeholder="请选择" filterable clearable :disabled="!!this.resultForm.id[0]" v-model="resultForm.type">
                    <el-option v-for="item in questType" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="题干：" prop="body">
                <textarea v-model="resultForm.body" id="editor" name="body22"></textarea>
            </el-form-item>

            <!-- 组件切换（题型） -->
            <component @loadone="loadtwo" :resultForm="resultForm" :is="indeed"></component>

            <el-form-item v-if="resultForm.type!=6">
                <el-button type="primary" @click="upDateInfo('resultForm')">提 交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import radioAnswer from './answer/raido'
    import checkAnswer from './answer/checkbox'
    import fillAnswer from './answer/fill'
    // import shortAnswer from './answer/short'
    import judgeAnswer from './answer/judge'
    import accessoryAnswer from './answer/accessory'
    // import discussAnswer from './answer/discuss'

    import questionsApi from '@/api/questions'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        props:['hand'],
        data() {
            return {
                // 发布次数，若大于0，则该题已分配，不能修改科目、题型
                publish: 0,
                
                resultForm: {
                    id: [this.hand.data.id],
                    type: '',
                    course_id: '',
                    // 默认不填入数据，富文本就没有数据？
                    body: this.hand.data.with_detail && this.hand.data.with_detail.body,
                    answer: [],
                    options: Array.from({length: 6}, (k, v) => '备选项' + (v + 1)),
                    action_type: this.hand.action_type,
                },
            };
        },
        components:{
            radioAnswer,checkAnswer,fillAnswer,
            judgeAnswer,accessoryAnswer,
            // 简答题、论述题同填空题
            // shortAnswer, discussAnswer
        },
        computed:{
            ...mapGetters({
                courses: 'allCourses',
                questType: 'allquestionsTypes',
            }),
            indeed () {
                var indeedType = '';
                switch (this.resultForm.type) {
                    case 1:
                        indeedType = radioAnswer;
                        break;
                    case 2:
                        indeedType = checkAnswer;
                        break;
                    case 3:
                        indeedType = fillAnswer;
                        break;
                    case 4:
                        indeedType = judgeAnswer;
                        break;
                    case 5:
                        indeedType = fillAnswer;
                        break;
                    case 6:
                        indeedType = accessoryAnswer;
                        break;
                    case 7:
                        indeedType = fillAnswer;
                        break;
                    default:
                        indeedType = '';
                }
                return indeedType
            },
        },
        methods: {
            ...mapActions([
                'getCourses',
                'getQuestionsTypes',
            ]),
            getPaperDetail (id) {
                var _this = this;
                if( id[0] ){
                    questionsApi.getQuestionPerson({
                        action_type: 'find',
                        id: id
                    }).then((res) => {
                        var data = res.data.data
                        _this.publish = data.publish

                        // 合并需要的数据到响应属性上
                        _this.resultForm = Object.assign({}, _this.resultForm, {
                            type: data.type,
                            course_id: data.course_id,
                            body: data.with_detail.body,
                            options: data.with_detail.options,
                            answer: data.answer,
                        })
                    })
                }
            },
            loadtwo(){
                this.hand.dialogVisible = false;
                this.$emit('reload')
            },
            upDateInfo(params){
                var _this = this;
                _this.resultForm.body = CKEDITOR.instances.editor.getData();
                // 填空题 简答题
                if(_this.resultForm.type == 3 || _this.resultForm.type == 5 || _this.resultForm.type == 7){
                    _this.resultForm.answer = [CKEDITOR.instances.editor2.getData()];
                }
                if( !_this.resultForm.course_id ){
                    layer.msg('请选择科目！', { time: 2500, icon: 2})
                    return;
                }
                if( !_this.resultForm.type ){
                    layer.msg('请选择试题类型！', { time: 2500, icon: 2})
                    return;
                }
                if( !_this.resultForm.body ){
                    layer.msg('试题题干必须填写！', { time: 2500, icon: 2})
                    return;
                }
                if( !_this.resultForm.answer.toString() ){
                    layer.msg('试题答案必须填写！', { time: 2500, icon: 2})
                    return;
                }
                questionsApi.getQuestionPerson(_this.resultForm).then(function(res){
                    if(res.data.ret == 0){
                        _this.hand.dialogVisible = false;
                        layer.msg('提交成功！', {time: 2000, icon: 1})
                        _this.$emit('reload');
                    }else{
                        layer.msg(res.data.res_info, { time: 2500, icon: 2})
                    }
                });
            },
        },
        created () {
            this.getPaperDetail(this.resultForm.id)
            this.getCourses();
            this.getQuestionsTypes();
        },
        mounted () {
            CKEDITOR.replace("body22", {height: "150px", width: "100%", });
        }
    }
</script>

