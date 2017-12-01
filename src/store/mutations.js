import * as types from './mutation-types'

export default {
    [types.SET_USER_INFO] (state, val){
        localStorage.setItem('userInfo', JSON.stringify(val))
        state.userInfo = val || '';
    },

    [types.SET_MAIN_HEIGHT] (state, val){
        state.mainHeight = val || '';
    },

    [types.IS_SHOW_MANUAL] (state, val){
        state.isShowManual = val || false;
    },

    [types.SET_PAGE_TIT] (state, val){
        state.pageTit = val || '';
    },

    [types.SET_CITYS] (state, {data}){
        state.citys = data || [];
    },

    [types.SET_VENUES] (state, {data}){
        state.venues = data || [];
    },

    [types.SET_ROOMS] (state, {data}){
        state.rooms = data || [];
    },

    [types.SET_COURSES] (state, {data}){
        state.courses = data || [];
    },

    [types.SET_GRADES] (state, {data}){
        state.grades = data || [];
    },

    [types.SET_MAJORS] (state, {data}){
        state.majors = data || [];
    },

    [types.SET_PLANS] (state, {data}){
        state.plans = data || [];
    },

    [types.SET_QUESTIONS_TYPES] (state, {data}){
        state.questionsTypes = data || [];
    },

    [types.SET_ROLES] (state, data){
        state.roles = data || [];
    },
}



