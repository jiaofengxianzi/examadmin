import axios from "@/config/axiosConfig"

export default {
    // 考试计划详细信息列表
    plansInfo(params) {
        return axios.post('/exam_plan/get', params)
    },
    
    // 添加考试计划
    plansAdd(params) {
        return axios.post('/exam_plan/add', params)
    },

    // 更新考试计划
    plansUpdate(params) {
        return axios.post('/exam_plan/update', params)
    },

    // 删除考试计划
    plansDelete(params) {
        return axios.post('/exam_plan/delete', params)
    },

    // 考试计划配置详情
    plansPaperDetail(params) {
        return axios.post('/exam_plan/detail', params)
    },

    // 审核考试计划
    plansRelease(params) {
        return axios.post('/exam_plan/release', params)
    },

    // 考试计划配置考场
    planconfigRoom(params) {
        return axios.post('/exam_plan/configRoom', params)
    },

    // 更新考试计划配置
    paperConfUpdate(params) {
        return axios.post('/exam_paper_config/add', params)
    },

    // 固定出题模板下载
    download(params) {
        return axios.post('/makeitems/getdemourl', params)
    },

    // 固定出题上传和预览
    uploadfile(params) {
        return axios.post('/makeitems/uploadfile', params)
    },

    // 固定出题附件上传
    accessoryUpload(params) {
        return axios.post('/makeitems/fasten_upload', params)
    },

    // 试卷详情
    paperDetail(params) {
        return axios.post('/makeitems/getpaperlist', params)
    },

    // 试卷范本
    paperExample(params) {
        return axios.post('/makeitems/getrandpaperlist', params)
    },

}

