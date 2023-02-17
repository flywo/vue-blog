import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // 用户端
    {
        path: "/user-layout",
        component: () =>
            import ("@/views/front/layout/Layout.vue"),
        children: [{
            path: "/home",
            component: () =>
                import ("@/views/front/home/Home.vue")
        }, {
            path: "/content",
            component: () =>
                import ("@/views/front/content/Content.vue")
        }]
    },
    // 重定向到首页
    {
        path: "/",
        redirect: "/home",
    },
    // 404
    {
        path: "*",
        component: () =>
            import ("@/views/404/404.vue"),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router