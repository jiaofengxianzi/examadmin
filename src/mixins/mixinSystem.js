

export default {
    data () {
        return {
            
            
            // 页面初始数据
            initData: {},
        }
    },
    methods: {
        add () {
            this.hand.title = '添加';
            this.hand.dialogVisible = true;
            this.hand.data = {
                action_type: 'add',
                dict_type: this.searchForm.dict_type
            };
        },

        edit (item) {
            this.hand.title = '修改';
            this.hand.dialogVisible = true;
            this.hand.data = {
                ...item,
                action_type: 'update',
                dict_type: this.searchForm.dict_type
            };
        },
        
        init (params) {
            this.systemset({
                action_type: 'search',
                ...params
            }).then((res)=>{
                this.initData = res.data.data;
                this.searchForm.page_no = this.initData.page_no
                this.searchForm.count = this.initData.count
                this.searchForm.page_size = this.initData.page_size
                this.saveSearchParams();
            })
        }
    },
 }