import Vue from "vue";
import VueRouter from "vue-router"
import store from "@/store"

import NotFound from "@/components/NotFound"
import SideNav from '@/components/SideNav'
import Login from "@/views/user/Login"
import Home from '@/views/home/Home'
import examinee from './examinee'
import scheme from './scheme'
import mark from './mark'
import score from './score'
import monitor from './monitor'
import questions from './questions'
import system from './system'
import notice from './notice'
import roles from './roles'

Vue.use(VueRouter)

var routes = [
    {path: '/', redirect: examinee, component: Home, name: 'home', children: [
        examinee, scheme, mark, score, monitor, questions, system, notice, roles
    ]},
    {path: '/user/login', component: Login},
    {path: '*', name: 'noFound', component: NotFound},
];
const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {       // 判断该路由是否需要登录权限
        var getToken = () => {
            if (localStorage.getItem('userInfo')) {
                let info = JSON.parse(localStorage.getItem('userInfo'));
                //检查token有效期
                let nowTime = Math.round(new Date().getTime() / 1000)
                let overTime = nowTime - info.responseTime
                if (overTime > info.expires_in) {
                    next({
                        path: '/user/login'
                    });
                    //token过期了
                    throw '会话已过期，请重新登录！'
                } else {
                    // 设置token
                    return info.access_token;
                }
            }
        };
        store.state.token = getToken();
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        } else {
            next({
                path: '/user/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});

router.afterEach(route => {
    store.state.routerMatched = route.matched
});

export default router
