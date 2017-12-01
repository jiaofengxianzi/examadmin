// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from "./App"
import router from "./router"
import store from "./store"
import axios from "@/config/axiosConfig"
import common from "@/assets/js/common"

Vue.use(ElementUI)
Vue.prototype.$common = common;
Vue.prototype.$axios = axios;

window.DEBUG = false;

// Vue.config.performance = false;

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

