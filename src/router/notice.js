import Notice from '@/views/notice/Notice'
import NoticeManage from '@/views/notice/noticeManage/NoticeManage'

export default {
    path: 'notice',
    component: Notice,
    name: 'notice',
    redirect: {
        name: 'noticeManage'
    },
    children: [
        {
            path: 'noticeManage',
            name: 'noticeManage',
            component: NoticeManage,
            meta: {
                requireAuth: true
            },
        },
    ]
}

