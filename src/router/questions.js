import questions from '@/views/questions/Questions'
import questionType from '@/views/questions/Questype'
import questionTest from '@/views/questions/Questest'
import Import from '@/views/questions/Import'

export default {
    path: 'questions',
    component: questions,
    name: 'questions',
    redirect: {
        name: 'questype'
    },
    children: [
        // 题型管理
        {
            path: 'questype',
            name: 'questype',
            component: questionType,
            meta: {
                requireAuth: true
            }
        },
        // 题库列表
        {
            path: 'questest',
            name: 'questest',
            component: questionTest,
            meta: {
                requireAuth: true
            }
        },
        // 导入题库
        {
            path: 'import',
            component: Import,
            meta: {
                requireAuth: true
            },
        }
    ]
}

