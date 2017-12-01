import axios from "@/config/axiosConfig"

export default {
    // 个人基本信息查询 
    studentsSearch(params) {
        return axios.post('/ticket/get', params)
    },

    // 个人基本信息增删改
    studentsManage(params) {
        return axios.post('/ticket/manage', params)
    },

    // 个人基本信息批量导入
    studentsImport(params) {
        return axios.post('/ticket/import', params)
    },

    // 个人基本信息导出
    studentsExport(params) {
        return axios.post('/student/export', params)
    },

    // 个人基本信息模板下载
    studentDownload(params) {
        return axios.post('/reserve/get_demo_url', params)
    },

    // 考生预约报考信息
    reserveSearch(params) {
        return axios.post('/reserve/search', params)
    },

    // 考生预约报考信息增删改
    reserveManage(params) {
        return axios.post('/reserve/manage', params)
    },

    // 考生预约信息批量导入
    reserveImport(params) {
        return axios.post('/reserve/importreserve', params)
    },

    // 考生预约信息导出
    reserveExport(params) {
        return axios.post('/reserve/export', params)
    },

    // 考生预约信息模板下载
    reserveDownload(params) {
        return axios.post('/reserve/reserve_url', params)
    },

    // 考生预约报考订单详情
    orderDetails(params) {
        return axios.post('/order/detail', params)
    },
    
    // 根据准考证号码获取报考城市ID
    getCityId(params) {
        return axios.post('/reserve/getcityid', params)
    },
}
