import Monitor from '@/views/monitor/Monitor'
import Scenes from '@/views/monitor/examScene/Scenes'
import ScenesDetail from '@/views/monitor/examScene/scenesdetail'
import Invigilator from '@/views/monitor/Invigilator/Invigilator'

export default {
    path: 'monitor',
    component: Monitor,
    name: 'monitor',
    redirect: {
        name: 'scenes'
    },
    children: [
        {
            path: 'scenes',
            name: 'scenes',
            component: Scenes,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'scenes/detail',
            name: 'scenesDetail',
            component: ScenesDetail,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'invigilator',
            name: 'invigilator',
            component: Invigilator,
            meta: {
                requireAuth: true
            },
        },
    ]
}

