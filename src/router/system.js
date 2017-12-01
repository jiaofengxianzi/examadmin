import System from '@/views/system/System'
import Citys from '@/views/system/citys/Citys'
import Spots from '@/views/system/spots/Spots'
import Rooms from '@/views/system/rooms/Rooms'
import Majors from '@/views/system/majors/Majors'
import Courses from '@/views/system/courses/Courses'

export default {
    path: 'system',
    component: System,
    name: 'system',
    redirect: {
        name: 'citys'
    },
    children: [
        {
            path: 'citys',
            name: 'citys',
            component: Citys,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'spots',
            name: 'spots',
            component: Spots,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'rooms',
            name: 'rooms',
            component: Rooms,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'majors',
            name: 'majors',
            component: Majors,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'courses',
            name: 'courses',
            component: Courses,
            meta: {
                requireAuth: true
            },
        }
    ]
}

