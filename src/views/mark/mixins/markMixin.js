
import markApi from '@/api/mark'

export default {
    data () {
        return {
            // 试题列表
            examInfoLists: [],
            
            // 限制提交频率
            timer: 0,
        }
    },
    methods: {
        // 解除试卷锁定
        unLock (type) {
            // 试题id数组
            var timuIdArr = this.examInfoLists.map((val) => val.id);
            var parm = {
                id: this.ruleForm.id,
                items: timuIdArr,
                type: type,
            };
            return markApi.unlock(parm).then((res) => {
                return res;
            })
        },

        // 分数选取
        grade (item, num) {
            item.score = num
            item.isShowCard = false
        },
        // 显示分数卡
        showCard (item, index) {
            item.isShowCard = true
            this.$set(this.examInfoLists, index, item)
        },
        // 隐藏分数卡
        hideCard (item, index) {
            item.isShowCard = false
            this.$set(this.examInfoLists, index, item)
            this.submit(item)
        },
        // 上一题
        keyUp (e, item, index) {
            // e.target.blur();
            // if(this.examInfoLists[index - 1]){
            //     this.examInfoLists[index - 1].isShowCard = true;
            // }else{
            //     layer.msg('没有题目了！')
            // }
        },
        // 下一题
        keyDown (e, item, index) {
            // e.target.blur();
            // if(this.examInfoLists[index + 1]){
            //     this.examInfoLists[index + 1].isShowCard = true;
            // }else{
            //     layer.msg('没有题目了！')
            // }
        },

        // 评分
        submit(item){
            this.timer = 0
            if(isNaN(item.score)){
                layer.msg('请输入正确的分数', {time: 2000, icon: 2})
                return;
            }
            if(item.score > item.grade.value || item.score < 0){
                layer.msg('得分不能大于该题目分数', {time: 2000, icon: 2})
                return;
            }
            markApi.postScore({
                id: item.id,
                score: item.score || 0
            }).then((req)=>{
                var data = req.data;
                if(data.ret==0){
                    layer.msg('评分成功!', { time: 1000 })
                }else{
                    layer.msg(data.res_info, { time: 1000 })
                }
            })
        },
        
        // 限制提交频率
        limitSubmit (item) {
            // if(!this.timer) {
            //     this.timer = setTimeout(() => {
            //         this.submit(item)
            //     }, 500)
            // }
        }
    },
    directives: {
        // 值为true获取焦点
        focus: {
            // 指令的定义
            update: function (el, {value}) {
                if(value){
                    el.focus()
                }
            }
        }
    },
    // 只要离开路由就解除试卷或试题锁定
    beforeRouteLeave (to, from, next){
        this.unLock(this.type).then((res) => {
            if(res.data.ret ==0){
                next();
            }else{
                layer.msg(res.data.res_info, {time: 2000, icon: 2})
            }
        })
    },
 }