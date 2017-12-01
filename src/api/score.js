import axios from "@/config/axiosConfig"

export default {
    // 考试计划（平时成绩）列表
    scoreInfo(params) {
        return axios.post('/score/plan_list', params)
    },
    
    // 考试计划添加/修改平时成绩
    scoreAdd(params) {
        return axios.post('/score/add_score', params)
    },

    // 考试计划删除平时成绩
    scorePeacetimeDelete(params) {
        return axios.post('/score/delete_hm_score', params)
    },
    
    // 按照考试计划查询成绩列表
    scoreLists(params) {
        return axios.post('/score/score_list', params)
    },

    // 成绩修改
    scoreUpdate(params) {
        return axios.post('/score/update_score', params)
    },

    // 成绩删除
    scoreDelete(params) {
        return axios.post('/score/delete_score', params)
    },

    // 成绩详情
    scoreDetail(params) {
        return axios.post('/score/score_detail', params)
    },
    
    // 发布考试计划成绩
    scorePublish(params) {
        return axios.post('/score/publish_score', params)
    },
}

