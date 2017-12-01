<template>
    <div class="import">
        <div class="section">
            <div class="sear-tit">导入说明<a href="javascript:history.go(-1);" class="go-back">返回</a></div>
            <ul class="explain">
                <li>1、导入“xlsx”格式的excel文件。</li>
                <li>2、模板文件格式请参考“<a :href="domeUrl" class="sp">试题批量导入模板.xlsx</a>”。</li>
                <li>3、导入过程中请耐心等待，不要进行其他操作或者关闭浏览器，以免影响数据完整性。</li>
                <li>4、请保证每行数据的准确性和完整性，以免导入数据错误。</li>
            </ul>
            <div class="control">
                <form class="file-form">
                    题目类型：
                    <el-select v-model="select" filterable  placeholder="请选择">
                        <el-option
                            v-for="item in questionType"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.id == 6">
                        </el-option>
                    </el-select>
                    <div class="selectNumber" v-if="select ==2">
                        选项个数：
                        <el-input placeholder="请选择"  v-model="option_number"></el-input>
                    </div>
                    模板文件：
                    <el-input :readonly="true" v-model="fileName" style="width: 200px"></el-input>
                    <el-button id="fileSelect" @click="fileSelect">选择文件</el-button>
                    <el-button type="primary" @click="upload">上传</el-button>
                    <div class="hide">
                        <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="fileContr" @change="fileChange($event)">
                    </div>
                </form>
            </div>
        </div>

        <div class="section">
            <div class="sear-tit">导入结果</div>
            <div class="result">
                <table border="1">
                    <tr class="tr-suc">
                        <td colspan="4">成功导入（行）：{{sucRows}}</td>
                    </tr>
                    <tr class="tr-total">
                        <td colspan="4">失败导入（行）：<span class="err">{{totalRows - sucRows}}</span></td>
                    </tr>
                    <tr class="tr-hd">
                        <td width="25%">题目ID</td>
                        <td width="25%">科目</td>
                        <td width="25%">试题内容</td>
                        <td width="25%">失败原因</td>
                    </tr>
                    <template>
                        <tr v-for="item in items" :key="item.ticket_id">
                            <td>{{item.row}}</td>
                            <td>{{item.course_name}}</td>
                            <td>{{item.body}}</td>
                            <td>{{item.msg}}</td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
    import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
    export default {
        components: {ElInput, ElFormItem}, name: 'import',
        data () {
            return {
                fileName: '',
                file: '',
                url:　this.$route.query.url,
                sucRows: 0,
                totalRows: 0,
                items: [],
                questionType : [],
                select : '',
                domeUrl:'',
                option_number:'',
            }
        },
        methods: {
            fileSelect () {
                $('.fileContr').click();
            },
            upload () {
                var _this = this;
                var formData = new FormData();
                formData.append('file',this.file);
                formData.append('type',this.select);
                if( _this.select == '' ){
                    layer.msg('请选择题目类型', { time: 2500, icon: 2});
                    return ;
                };
                if( _this.select == 2){
                    if(this.option_number<4){
                        layer.msg('请输入大于等于4的整数', { time: 2500, icon: 2});
                        return ;
                    }
                    formData.append('option_number',this.option_number)
                }

                this.$axios.post('item/importitem', formData).then((req)=>{
                    if(req.data.ret == 0){
                        _this.items = req.data.data.err;
                        _this.sucRows = req.data.data.suc;
                        _this.totalRows = req.data.data.total;
                        layer.msg('上传成功！', { time: 2500, icon: 1})
                    }else{
                        layer.msg(req.data.res_info, { time: 2500, icon: 1})
                    }
                })
            },
            fileChange (e) {
                this.fileName = e.target.files[0].name
                this.file = e.target.files[0]
            },
            itemlist (){
                var _this = this ;
                this.$axios.post('item/itemlist').then(function(data){
                    _this.questionType = data.data.data
                })
            },
            Download(){
                var _this = this ;
                _this.$axios.post('item/download_item_demo_url').then(function(data){
                    _this.domeUrl = data.data.data.url
                })
            }

        },
        mounted : function(){
            this.$nextTick(function(){
                this.itemlist();
                this.Download();
            })
        }
    }
</script>

<style>
    .import{ font-size: 14px; color: #606060; }
    .import .explain .sp{ color: #f20606;}
    .import .control{ margin-top: 36px; margin-bottom: 38px; }
    .import .hide{ width: 0; height: 0; opacity: 0; overflow: hidden;}
    .import table{ width: 100%; border: 1px solid #e0e3e3; text-align: center;}
    .import table td{ border-color: #e0e3e3; line-height: 34px; color: #808080; }
    .import .tr-suc td,
    .import .tr-total td{ text-align: left; padding-left: 10px; color: #606060; }
    .import .tr-hd td{ color: #404040; }
    .import .err{ color: #f20606;}
    .import .selectNumber{display: inline-block}
</style>

