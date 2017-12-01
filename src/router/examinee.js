import Examinee from '@/views/examinee/Examinee'
import Basic from '@/views/examinee/basic/Basic'
import Reserve from '@/views/examinee/reserve/Reserve'
import BasicImport from '@/views/examinee/basic/Import'
import ReserveImport from '@/views/examinee/reserve/Import'

export default {
    path: 'examinee',
    component: Examinee,
    name: 'examinee',
    redirect: {
        name: 'basic'
    },
    children: [
        {
            path: 'basic',
            name: 'basic',
            component: Basic,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'reserve',
            name: 'reserve',
            component: Reserve,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'basic/import',
            component: BasicImport,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'reserve/import',
            component: ReserveImport,
            meta: {
                requireAuth: true
            },
        }
    ]
}

