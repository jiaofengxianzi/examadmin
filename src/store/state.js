export default {
    userInfo: localStorage.getItem('userInfo') != null ? JSON.parse(localStorage.getItem('userInfo')) : null,
    mainHeight: 0,
    pageTit: '',
    
    isShowManual: false,

    // 页面路由层级信息
    routerMatched: [],

    // load遮罩层
    layerIndex: 0,
    
    citys: [],
    venues: [],
    rooms: [],
    courses: [],
    grades: [],
    majors: [],
    plans: [],
    questionsTypes: [],
    quesTypeList:[],
    addForm:{
        answer:[],
    },
    score:'',
    
    // 权限列表
    roles: []
}