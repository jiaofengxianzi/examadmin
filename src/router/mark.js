import Mark from '@/views/mark/Mark'
import Students from '@/views/mark/students/Students'
import Undecided from '@/views/mark/students/Undecided'
import Resolved from '@/views/mark/students/Resolved'
import StudentsDetail from '@/views/mark/students/Detail'
import Topics from '@/views/mark/topics/Topics'
import TopicsDetail from '@/views/mark/topics/Detail'

export default {
    path: 'mark',
    component: Mark,
    name: 'mark',
    redirect: {
        name: 'students'
    },
    children: [
        {
            path: 'students',
            name: 'students',
            component: Students,
            redirect: {
                name: 'undecided'
            },
            children: [
                {
                    path: 'undecided',
                    name: 'undecided',
                    component: Undecided,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: 'resolved',
                    name: 'resolved',
                    component: Resolved,
                    meta: {
                        requireAuth: true
                    },
                }
            ]
        },
        {
            path: 'students/undecided/detail',
            name: 'undecidedDetail',
            component: StudentsDetail,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'students/resolved/detail',
            name: 'resolvedDetail',
            component: StudentsDetail,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'topics',
            name: 'topics',
            component: Topics,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'topics/detail',
            name: 'topicsDetail',
            component: TopicsDetail,
            meta: {
                requireAuth: true
            }
        }
    ]
}

