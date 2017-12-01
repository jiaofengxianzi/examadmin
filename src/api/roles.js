import axios from "@/config/axiosConfig"

export default {
    // 用户列表
    getAccountList(params) {
        return axios.post('/rbac_admin/list_admin', params)
    },

    // 添加用户
    addAccount(params) {
        return axios.post('/rbac_admin/add_admin', params)
    },

    // 修改用户
    updateAccount(params) {
        return axios.post('/rbac_admin/update_admin', params)
    },

    // 重置密码
    resetPassword(params) {
        return axios.post('/rbac_admin/reset_password', params)
    },

    // 删除用户
    deleteAccount(params) {
        return axios.post('/rbac_admin/delete_admin', params)
    },

    // 用户角色列表
    getUserRolesList(params) {
        return axios.post('/rbac/role_user_list', params)
    },

   // 添加用户角色
   addUserRole(params) {
        return axios.post('/rbac/add_role_to_user', params)
    },
    
    // 删除角色列表
    deleteUserRole(params) {
        return axios.post('/rbac/delete_role_to_user', params)
    },
}
