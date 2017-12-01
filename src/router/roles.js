import Roles from '@/views/roles/Roles'
import Account from '@/views/roles/account/Account'
import SystemRoles from '@/views/roles/systemRoles/SystemRoles'

export default {
    path: 'roles',
    component: Roles,
    name: 'roles',
    redirect: {
        name: 'account'
    },
    children: [
        {
            path: 'account',
            name: 'account',
            component: Account,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'systemRoles',
            name: 'systemRoles',
            component: SystemRoles,
            meta: {
                requireAuth: true
            }
        },
    ]
}

