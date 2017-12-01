
import Paging from '@/components/Paging'

export default {
    data () {
        return {
            //  搜索的表单
            searchForm: {
                count: 1,           // 总条数
                page_no: 1,         // 当前页
                page_size: 15       // 每页条数
            },

            // 列表页面数据
            initData: {},

            // 保存搜索条件信息
            searchRecord: {},

            // 批量选择结果
            multipleSelection: [],

            // 弹层数据传递
            hand: {
                dialogVisible: false,
                title: '添加',
                data: {},
            },
        }
    },
    components: {
        Paging
    },
    methods: {
        // 保存一份搜索条件，用于分页跳转时提交
        saveSearchParams () {
            this.searchRecord = JSON.parse(JSON.stringify(this.searchForm));
        },
        // 搜索
        submitForm (params) {
            params.page_no = 1;
            params.page_size = 15;
            this.init(params);
        },
        // 重置搜索表单
        resetForm (formName) {
            this.$refs[formName].resetFields();
        },
        // 全选
        handleSelectionChange (val) {
            this.multipleSelection = val;
        },
        // 删除，调用各模块自己的删除方法
        remove (items) {
            var _this = this;
            layer.confirm('确定要删除吗？', {
                icon: 7,
                btn: ['确定', '取消']
            }, function(){
                _this._privateRemove(items).then((res)=>{
                    if(res.data.ret == 0) {
                        layer.msg("删除成功", {time: 1500, icon: 1})
                        _this.init(_this.searchRecord);
                    }else{
                        layer.msg(res.data.res_info, {time: 2500, icon: 2})
                    }
                })
            });
        },
        // 批量删除
        batchRemove (items) {
            if(!items.length){
                return;
            }
            this.remove(items);
        }, 
        // 数据初始化
        init (params) {
            this.getInitData(params).then((res)=>{
                if(res.data.ret == 0){
                    this.initData = res.data.data
                    this.searchForm.page_no = this.initData.page_no
                    this.searchForm.count = this.initData.count
                    this.searchForm.page_size = this.initData.page_size
                    this.saveSearchParams();
                }else{
                    layer.msg(res.data.res_info, {time: 2000, icon: 2})
                }
            })
        }
    },
    filters: {
        txt (val, arr) {
            return arr.find(item => item.value == val).label
        }
    },
    created () {
        this.init(this.searchForm);
    }
 }