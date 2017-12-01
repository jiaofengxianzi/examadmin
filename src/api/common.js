import axios from "@/config/axiosConfig"

export default {
     // 设置密码
     modifypassword (params) {
        return axios.post('/user/modifypassword', params)
    },

    // 报考城市
    getCitys (params) {
        return axios.post('/datalist/citylist', params)
    },

    // 考点
    getVenues (params) {
        return axios.post('/datalist/placelist', params)
    },

    // 考场
    getRooms (params) {
        return axios.post('/datalist/roomlist', params)
    },

    // 科目
    getCourses (params) {
        return axios.post('/datalist/courselist', params)
    },

    // 层次
    getGrades (params) {
        return axios.post('/datalist/levellist', params)
    },
    
    // 专业
    getMajors (params) {
        return axios.post('/datalist/specialtylist', params)
    },

    // 考试计划
    getPlans (params) {
        return axios.post('/datalist/getreservelist', params)
    },

    // 获取试题类型列表
    getQuestionsTypes(params) {
        return axios.post('/item/itemlist', params)
    },

    // 权限列表
    getRoles(params) {
        return axios.post('/rbac/get_role', params)
    },
}
