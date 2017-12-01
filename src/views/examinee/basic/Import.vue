<template>
    <div class="import">
        <div class="section">
            <div class="sear-tit">导入说明<a href="javascript:history.go(-1);" class="go-back">返回</a></div>
            <ul class="explain">
                <li>1、导入“xlsx”格式的excel文件。</li>
                <li>2、模板文件格式请参考“<a href="javascript:;" class="sp" @click="download">考生个人基本信息模板.xlsx</a>”。</li>
                <li>3、导入过程中请耐心等待，不要进行其他操作或者关闭浏览器，以免影响数据完整性。</li>
                <li>4、请保证每行数据中身份证的准确性和完整性，以免导入数据错误。</li>
                <li>5、如果该学员身份证为空，则导入不成功。</li>
            </ul>
            <div class="control">
                <form class="file-form">
                    模板文件：
                    <el-input :readonly="true" v-model="fileName" @click.native="fileSelect" style="width: 200px"></el-input>
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
                        <td colspan="4">失败导入（行）：<span class="err">{{totalRows}}</span></td>
                    </tr>
                    <tr class="tr-hd">
                        <td width="25%">准考证</td>
                        <td width="25%">身份证</td>
                        <td width="25%">姓名</td>
                        <td width="25%">失败原因</td>
                    </tr>
                    <template>
                        <tr v-for="item in items" :key="item.ticket_id">
                            <td>{{item.ticket_id}}</td>
                            <td>{{item.user_card_id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.msg}}</td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import examineeApi from '@/api/examinee'

    export default {
        name: 'import',
        data () {
            return {
                fileName: '',
                file: '',
                sucRows: 0,
                totalRows: 0,
                items: [],
            }
        },
        methods: {
            fileSelect () {
                $('.fileContr').click();
            },
            upload () {
                var _this = this;
                var formData = new FormData();
                formData.append('file', this.file)
                examineeApi.studentsImport(formData).then((req)=>{
                    if(req.data.ret == 0){
                        _this.items = req.data.data.err;
                        _this.sucRows = req.data.data.suc;
                        _this.totalRows = req.data.data.total - req.data.data.suc;
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
            download () {
                examineeApi.studentDownload().then((req)=>{
                    if(req.data.ret == 0){
                        window.open(req.data.data.url);
                    }
                })
            }
        },
    }
</script>

