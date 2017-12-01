import Score from '@/views/score/Score'
import ResultsConfig from '@/views/score/resultsConfig/ResultsConfig'
import Results from '@/views/score/results/Results'
import Unpublished from '@/views/score/results/Unpublished'
import Published from '@/views/score/results/Published'
import Detail from '@/views/score/results/Detail'

export default {
    path: 'score',
    component: Score, 
    name: 'score',
    redirect: {
        name: 'resultsConfig'
    },
    children: [
        {
            path: 'resultsConfig',
            name: 'resultsConfig',
            component: ResultsConfig,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'results',
            name: 'results',
            component: Results,
            redirect: {
                name: 'unpublished'
            },
            children: [
                {
                    path: 'unpublished',
                    name: 'unpublished',
                    component: Unpublished,
                    meta: {
                        requireAuth: true
                    },
                },
                {
                    path: 'published',
                    name: 'published',
                    component: Published,
                    meta: {
                        requireAuth: true
                    },
                }
            ]
        },
        {
            path:'results/unpublished/detail',
            name : 'unpublishedDetail',
            component : Detail ,
            meta : {
                requireAuth : true
            }
        },
        {
            path:'results/published/detail',
            name : 'publishedDetail',
            component : Detail ,
            meta : {
                requireAuth : true
            }
        },
    ]
}

