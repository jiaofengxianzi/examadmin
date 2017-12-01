<template>
    <div class="answer">
        <el-form-item label="正确答案：">
            <el-radio-group v-model="answer[0]">
                <el-radio v-for="item in options" :key="item.id" :label="item.id">{{item.value}}</el-radio>
            </el-radio-group>
        </el-form-item>
    </div>
</template>

<script>
export default {
    props:['resultForm'],
    data(){
        return{
            answer: this.resultForm.answer,
            options:[
                {id:'对', value:'对'},
                {id:'错', value:'错'},
            ]
        }
    },
    created () {
        this.resultForm.options = this.options
    }
}
</script>

