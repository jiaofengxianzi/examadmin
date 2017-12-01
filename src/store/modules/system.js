import systemApi from '@/api/system'
import * as types from '../mutation-types'

const state = {}

const getters = {}

const actions = {
    systemset ({commit}, params) {
        return new Promise(function(resolve, reject) {
            systemApi.systemset(params).then((res)=>{
                if(res.data.ret == 0) {
                    resolve(res)
                }else{
                    layer.msg(res.data.res_info, {time: 2500, icon: 2})
                }
            })
        }).catch((err)=>{
            reject(err);
        })
    },
}

const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}
