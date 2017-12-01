import axios from "axios";
import store from '@/store/index'
import router from '@/router/index'

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = api_host;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // load效果添加
        if (store.state.layerIndex == 0){
            store.state.layerIndex = layer.load(1, {
                shade: [0.1, '#fff']
            })
        }

        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            // if(new Date().getTime() > parseInt(store.state.userInfo.expires_in)*1000  + store.state.userInfo.loginTime){
            //     router.replace({
            //         path: '/user/login',
            //         query: {redirect: router.currentRoute.fullPath}
            //     })
            // }

            DEBUG && console.log('已登录')
            config.headers.Authorization = `Bearer ${store.state.token}`;
        }
        DEBUG && console.log('加载中...');
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        DEBUG && console.log('加载成功');
        // load效果关闭
        if (store.state.layerIndex != 0){
            layer.close(store.state.layerIndex);
            store.state.layerIndex = 0;
        }
        
        // 服务器错误(登录超时等)
        if( response.data.ret == '-2' ){
            layer.msg('服务器错误！', {time: 2500, icon: 2})
            store.dispatch('setUserInfo', '');
            var len = router.currentRoute.fullPath.split('redirect').length
            if(len < 2){
                router.replace({
                    path: '/user/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
        }
        return response;
    },
    error => {
        layer.closeAll();
        // 请求被执行，服务器以2xx状态吗响应
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break
                case 401:
                    error.message = '未授权，请登录'
                    break
                case 403:
                    error.message = '拒绝访问'
                    break
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break
                case 408:
                    error.message = '请求超时'
                    break
                case 500:
                    error.message = '服务器内部错误'
                    break
                case 501:
                    error.message = '服务未实现'
                    break
                case 502:
                    error.message = '网关错误'
                    break
                case 503:
                    error.message = '服务不可用'
                    break
                case 504:
                    error.message = '网关超时'
                    break
                case 505:
                    error.message = 'HTTP版本不受支持'
                    break
                default:
                    break
            }
        }
        if(error.code == 'ECONNABORTED'){
            layer.msg( error.message, {time: 2500, icon: 2})
            store.dispatch('setUserInfo', '');
            var len = router.currentRoute.fullPath.split('redirect').length
            if(len < 2){
                router.replace({
                    path: '/user/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
        }else{
            layer.msg( error.message, {time: 2500, icon: 2})
        }
        return Promise.reject(error)   // 返回接口返回的错误信息
    }
)

export default axios