import axios from "@/config/axiosConfig"

export default {
    // 系统配置管理查、增、删
    systemset(params) {
        return axios.post('/systemset', params)
    },
}