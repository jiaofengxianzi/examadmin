import axios from "@/config/axiosConfig"

export default {
    // 获取考卷列表
    examPapers(params) {
        return axios.post('/exam_paper/list', params)
    },
    
    // 上传实践题
    examPaperUpload(params) {
        return axios.post('/exam_paper/upload', params)
    },
    
    // 获取试卷详情
    examPaperDetail(params) {
        return axios.post('/exam_paper/detail', params)
    },

}

