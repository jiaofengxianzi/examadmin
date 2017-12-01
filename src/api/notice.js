import axios from "@/config/axiosConfig"

export default {
    // 通知列表
    getNoticeList(params) {
        return axios.post('/notice/get_notice_list', params)
    },
    
    // 通知详情
    getNoticeDetail(params) {
        return axios.post('/notice/notice_detail', params)
    },
    
    // 添加通知
    addNotice(params) {
        return axios.post('/notice/add_notice', params)
    },

    // 修改通知
    updateNotice(params) {
        return axios.post('/notice/update_notice', params)
    },

    // 删除通知
    deleteNotice(params) {
        return axios.post('/notice/delete_notice', params)
    },

}

