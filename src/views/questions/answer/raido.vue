<template>
    <div class="value">
        <el-form-item v-if="!id[0]" label="选项个数：">
            <el-select v-model="num" @change="changeOptions">
                <el-option v-for="item in nums" :value="item" :key="item" :label="item"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item v-for="(item,index) in options" :key="index" :label="'备选项'+(index+1)+'：'">
            <textarea :id="'editor'+index" :name="'editor'+index" cols="20" rows="2" class="ckeditor2">{{item}}</textarea>
        </el-form-item>

        <el-form-item label="正确答案：">
            <el-radio-group v-model="answer[0]" >
                <el-radio v-for="item in options" :key="item" :label="item" :value="item"></el-radio>
            </el-radio-group>
        </el-form-item>
    </div>
</template>

<script>
export default {
    props:['resultForm'],
    data(){
        return{
            id: this.resultForm.id,
            answer: this.resultForm.answer,
            nums: [4, 5, 6],
            num: this.resultForm.options.length,
            optionsArr: this.resultForm.options,
        }
    },
    computed: {
        options () {
            return this.optionsArr.slice(0, this.num)
        }
    },
    methods:{
        changeOptions (val) {
            // 重置答案
            this.answer.splice(0, 1, '');
            // 重置选项
            this.resultForm.options = this.optionsArr.slice(0, val);
        },
        createEd(){
            var _this = this;
            var ckeName = '';
            for(let j = 0; j<_this.optionsArr.length; j++) {
                ckeName = 'editor' + j;
                if(document.querySelector('#' + ckeName)) {
                    CKEDITOR.replace(ckeName, {height: "60px", width: "100%"});
                    CKEDITOR.instances[ckeName].on('change', function (event) {
                        _this.answer = _this.resultForm.answer = []
                        _this.optionsArr.splice(j, 1, this.getData())
                    })
                }
            }
        }
    },
    mounted(){
        this.createEd()
    }
}
</script>

