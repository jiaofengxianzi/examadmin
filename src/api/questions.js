/**
 * Created by Administrator on 2017/9/16.
 */
import axios from "@/config/axiosConfig"

export default {
   // 获取试题
    getQuestionTest(params){
        return axios.post('/item/itemmanage', params)
    },
    
    // 试题增删改
    getQuestionPerson(params){
        return axios.post('/item/itemmanage', params)
    },
}
