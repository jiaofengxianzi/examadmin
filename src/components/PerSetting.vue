<template>
    <div class="per-setting">
        <a href="javascript:;" class="per-ser-btn" @click="hand.dialogVisible = true">个人设置</a>
        
        <!-- 弹窗 -->
        <div v-if="hand.dialogVisible">
            <el-dialog :title="hand.title" :visible.sync="hand.dialogVisible" size="tiny">
                <div class="sys-add">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="旧密码：" prop="password">
                            <el-input type="password" v-model="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="new_password">
                            <el-input type="password" v-model="ruleForm.new_password"></el-input>
                        </el-form-item>
                        <el-form-item class="btn-form-item">
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import commonApi from '@/api/common'
    export default {
        name: 'PerSetting',
        data () {
            return {
                ruleForm: {
                    password: '',
                    new_password: '',
                },
                rules: {
                    password: [
                        { required: true, message: '请输入旧密码', },
                    ],
                    new_password: [
                        { required: true, message: '请输入新密码', },
                    ],
                },
                hand: {
                    title: '个人设置',
                    dialogVisible: false
                }
            }
        },
        methods: {
            submitForm (formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        commonApi.modifypassword(_this.ruleForm).then((res)=>{
                            if(res.data.ret == 0){
                                layer.msg('设置成功！', {time: 2000, icon: 1})
                                var timer = setTimeout(()=>{
                                    clearTimeout(timer);
                                    _this.hand.dialogVisible = false;
                                }, 2000)
                            }else{
                                layer.msg(res.data.res_info, {time: 2500, icon: 2})
                            }
                        })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
.per-setting{ float: right; padding-left: 10px; margin-right: 10px; margin-top: 10px; border-left: 1px solid #004149; line-height: 1; }
.per-setting .per-ser-btn{ color: #fff;}
</style>

