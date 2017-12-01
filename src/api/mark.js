import axios from "@/config/axiosConfig"
const t = 'markpaper';

export default {

    // 下一份试卷详情
    nextExaminfo(params) {
        return axios.post(t + '/nextstudentpaper', params)
    },

    // 根据试卷id获取试题详情
    getExamInfo(params) {
        return axios.post(t + '/getstudentpapersitem', params)
    },

    // 给试题打分
    postScore(params) {
        return axios.post(t + '/markpapersbyitem', params)
    },

    // 获取试卷列表
    getExamlist(params) {
        return axios.post(t + '/getpapersbystudent', params)
    },

    // 解锁试卷及试题
    unlock(params) {
        return axios.post(t + '/backstatus', params)
    },

    // 获取考试计划列表
    getExamplan(params) {
        return axios.post('/exam_plan/get', params)
    },

    // 获取考点列表
    getVenues (params) {
        return axios.post('/datalist/placelist', params)
    },

    // 按照试题打分
    logout(params) {
        return axios.post(t + '/markpapersbyitem', params)
    },

    // 获取试题列表
    getQuestionlist(params) {
        return axios.post(t + '/getpapersbyitemtype', params)
    },

    // 获取试题详情
    getQuestionItem(params) {
        return axios.post(t + '/getpapersitem', params)
    },

}
