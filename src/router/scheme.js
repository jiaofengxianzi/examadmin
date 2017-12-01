import Scheme from '@/views/scheme/Scheme'
import Plans from '@/views/scheme/examPlan/Plans'
import Add from '@/views/scheme/examPlan/Add'
import Detail from '@/views/scheme/examPlan/Detail'
import Upload from '@/views/scheme/examPlan/Upload'

export default {
    path: 'scheme',
    component: Scheme,
    name: 'scheme',
    redirect: {
        name: 'plans'
    },
    children: [
        {
            path: 'plans',
            name: 'plans',
            component: Plans,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'plans/add',
            name: 'add',
            component: Add,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'plans/detail',
            name: 'detail',
            component: Detail,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'plans/upload',
            name: 'upload',
            component: Upload,
            meta: {
                requireAuth: true
            },
        }
    ]
}

