import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/home.vue'),
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/login',
            component: () => import('@/views/login.vue'),
        },
    ],
})

router.beforeEach(async (to) => {
    // routes with `meta: { requiresAuth: true }` will check for the users, others won't
    if (to.meta.requiresAuth) {
        const currentUser = await getCurrentUser()
        // if the user is not logged in, redirect to the login page
        if (!currentUser) {
            return {
                path: '/login',
                query: {
                    // we keep the current path in the query so we can redirect to it after login
                    redirect: to.fullPath,
                },
            }
        }
    }
})
export default router