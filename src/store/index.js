import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import * as actions from './actions'

import examinee from './modules/examinee'
import system from './modules/system'
import scheme from './modules/scheme'
import monitor from './modules/monitor'
import score from './modules/score'
import mark from './modules/mark'
import questions from './modules/questions'
import notice from './modules/notice'

Vue.use( Vuex );

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        examinee,
        system,
        scheme,
        monitor,
        score,
        mark,
        questions,
        notice
    }
})


