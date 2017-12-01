<template>

    <div class="basic">
        <div class="exhibit section" v-if="allQusetions.length">
            <el-table ref="multipleTable" :data="allQusetions"  border tooltip-effect="dark" style="width: 100%" >
            <el-table-column prop="id" label="题型"  align="center"></el-table-column>
            <el-table-column prop="name" label="题型名称"  align="center"></el-table-column>
            <el-table-column prop="type" label="题型分类"  align="center"></el-table-column>
            </el-table>
        </div>
    </div>

</template>

<script>
    import SideNav from '@/components/SideNav'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        name: 'basic',
        data() {
            return {
                // alls:'',
            }
        },
        computed: {
            ...mapGetters({
                allQusetions:'allquestionsTypes'
            })
        },
        methods:{
            ...mapActions({
                quesTypeList: 'getQuestionsTypes'
            })
        },
        mounted:function(){
            this.quesTypeList()
        },
    }

</script>



