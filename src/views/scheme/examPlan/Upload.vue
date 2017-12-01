<template>
    <div class="upload">
        <div class="section import">
            <div class="sear-tit">导入说明<a href="javascript:history.go(-1);" class="go-back">返回</a></div>
            <ul class="explain">
                <li>1、试卷模板文件格式请参考“<a href="javascript:;" class="sp" @click="download">试题批量导入模板.xlsx</a>”。</li>
                <li>2、如果该考试科目中，模板内的题型没有题目，留空即可，请勿删除。</li>
                <li>3、机试试题总分值为100分方可成功导入；实践题有且仅能一道题，分数默认为100分。</li>
                <li>4、如果有附件，请按要求上传附件；如无附件，无需操作。</li>
                <li>5、导入过程中请耐心等待，不要进行其他操作或者关闭浏览器，以免影响数据完整性。</li>
                <li>6、请保证每行数据的准确性和完整性，以免导入数据错误。</li>
            </ul>
            <div class="control">
                <div class="file-form">
                    <span class="label">试题模板文件：</span>
                    <el-input :readonly="true" v-model="fixed.name" @click.native="fileSelect($event)" style="width: 200px"></el-input>
                    <el-button id="fileSelect" @click="fileSelect">选择文件</el-button>
                    <el-button type="primary" @click="preview('view')">预览</el-button>
                    <div class="hide">
                        <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="fileContr" @change="fileChange($event, fixed)">
                    </div>
                </div>
            </div>
        </div>
        
        <div class="section preview" v-if="items.data">
            <div class="sear-tit">导入试卷预览</div>

            <Paper v-if="items.code && items.code == 200" :paperItems="items.data"></Paper>

            <div class="import">
                <div class="file-form">
                    <span class="label">附件上传：</span>
                    <el-input :readonly="true" v-model="accessory.name" @click.native="fileSelect($event)" style="width: 200px"></el-input>
                    <el-button id="fileSelect" @click="fileSelect">选择附件</el-button>
                    <!-- <el-button type="primary" @click="accessoryUpload">上传</el-button> -->
                    <div class="hide">
                        <input type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" class="fileContr" @change="fileChange($event, accessory)">
                    </div>
                </div>
            </div>

            <div class="result" v-if="items.code && items.code == 500">
                <div class="ps-empty">试卷导入错误！</div>
                <el-table ref="multipleTable" :data="items.data" border tooltip-effect="dark" style="width: 800px">
                    <el-table-column prop="type" label="题型" width="100" align="center"></el-table-column>
                    <el-table-column prop="rows" label="行数" width="100" align="center"></el-table-column>
                    <el-table-column prop="info" label="失败原因" align="left"></el-table-column>
                </el-table>
            </div>
            
            <div class="btn-wrap" v-if="items.code && items.code == 200">
                <el-button type="primary" @click="uploadFile('upload')">确认导入</el-button>
                <el-button @click="goBack">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import schemeApi from '@/api/scheme'
    import Paper from '@/components/Paper'

    export default {
        name: 'Upload',
        data () {
            return {
                id: this.$route.query.planId,
                items: {},
                fixed: {
                    name: '',
                    file: '',
                },
                accessory: {
                    name: '',
                    file: '',
                }
            }
        },
        components: {
            Paper,
        },
        methods: {
            fileSelect (e) {
                $(e.target).closest('.file-form').find('.fileContr').click();
            },
            getParams (type) {
                if(!this.fixed.file){
                    layer.msg('请先选择文件', { time: 2500, icon: 2})
                    return;
                }
                var formData = new FormData();
                formData.append('plan_id', this.id)
                formData.append('file', this.fixed.file)
                if( type == 'upload'){
                    formData.append('upload_file', this.accessory.file)
                }
                formData.append('type', type)
                return formData
            },
            // 固定出题上传
            uploadFile (type) {
                var params = this.getParams(type);
                schemeApi.uploadfile(params).then((res) => {
                    if(res.data.ret == 0){
                        layer.msg('上传成功！', { time: 2500, icon: 1})
                        this.goBack()
                    }else{
                        layer.msg(res.data.res_info, { time: 2500, icon: 2})
                    }
                });
            },
            // 固定出题预览
            preview (type) {
                var params = this.getParams(type);
                schemeApi.uploadfile(params).then((res) => {
                    if(res.data.ret == 0){
                        this.items = res.data.data;
                    }else{
                        layer.msg(res.data.res_info, { time: 2500, icon: 2})
                    }
                });
            },
            fileChange (e, obj) {
                obj.name = e.target.files[0].name
                obj.file = e.target.files[0]
            },
            download () {
                schemeApi.download().then((res)=>{
                    window.open(res.data.url);
                })
            },
            goBack () {
                this.$router.go(-1)
            }
        },
    }
</script>

<style scoped>
    .preview { margin-top: 20px; }
    .preview .btn-wrap{ margin-top: 20px; text-align: center; }
    .preview .ps-empty{ color: #f20606;}
    .preview .import{ margin-top: 10px; }
</style>

