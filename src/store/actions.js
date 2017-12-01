import axios from "@/config/axiosConfig"
import commonApi from '@/api/common'
import * as types from './mutation-types'

export const setUserInfo = ({commit}, val) => {
    commit(types.SET_USER_INFO, val);
}

export const setMainHeight = ({commit}, val) => {
    commit(types.SET_MAIN_HEIGHT, val);
}

export const setIsShowManual = ({commit}, val) => {
    commit(types.IS_SHOW_MANUAL, val);
}

export const setPageTit = ({commit}, val) => {
    commit(types.SET_PAGE_TIT, val);
}

export const getCitys = ({commit}, params) => {
    return new Promise(function(resolve, reject){
        commonApi.getCitys().then((res)=>{
            resolve(res);
            commit(types.SET_CITYS, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getVenues = ({commit}, val) => {
    return new Promise(function(resolve, reject){
        commonApi.getVenues({id: val}).then((res)=>{
            resolve(res);
            commit(types.SET_VENUES, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getRooms = ({commit}, val) => {
    return new Promise(function(resolve, reject){
        commonApi.getRooms({id: val}).then((res)=>{
            resolve(res);
            commit(types.SET_ROOMS, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getCourses = ({commit}, params) => {
    return new Promise(function(resolve, reject){
        commonApi.getCourses().then((res)=>{
            resolve(res);
            commit(types.SET_COURSES, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getGrades = ({commit}, params) => {
    return new Promise(function(resolve, reject){
        commonApi.getGrades().then((res)=>{
            resolve(res);
            commit(types.SET_GRADES, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getMajors = ({commit}, val) => {
    return new Promise(function(resolve, reject){
        commonApi.getMajors({id: val}).then((res)=>{
            resolve(res);
            commit(types.SET_MAJORS, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getPlans = ({commit}, params) => {
    return new Promise(function(resolve, reject){
        commonApi.getPlans(params).then((res)=>{
            resolve(res);
            commit(types.SET_PLANS, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getQuestionsTypes = ({commit}, params) => {
    return new Promise(function(resolve, reject){
        commonApi.getQuestionsTypes(params).then((res)=>{
            resolve(res);
            commit(types.SET_QUESTIONS_TYPES, res.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}

export const getRoles = ({commit}, params) => {
    return new Promise(function(resolve, reject){
        commonApi.getRoles(params).then((res)=>{
            resolve(res);
            commit(types.SET_ROLES, res.data.data);
        })
    }).catch((err)=>{
        reject(err);
    })
}
