import axios from "@/config/axiosConfig"

export default {
    // 登录
    login(params) {
        return axios.post('/login', params)
    },

    // 登出
    logout(params) {
        return axios.post('/logout', params)
    }
}
