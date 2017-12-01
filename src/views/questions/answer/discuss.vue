<template>
    <div class="answer">
        <el-form-item label="参考答案：">
            <textarea  id="editor2" name="editor2">{{answer[0]}}</textarea>
        </el-form-item>
    </div>
</template>

<script>
export default {
    props:['resultForm'],
    data(){
        return {
            answer: this.resultForm.answer,
        }
    },
    mounted () {
        CKEDITOR.replace("editor2", {height: "100px", width: "100%", });
    }
}
</script>

