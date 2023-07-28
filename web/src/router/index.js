import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // 用户端
    {
        path: "/user-layout",
        component: () =>
            import ("@/views/front/layout/Layout.vue"),
        children: [
            // 首页
            {
                path: "/home",
                component: () =>
                    import ("@/views/front/home/Home.vue"),
                meta: {
                    keepAlive: true
                }
            },
            // 博客内容
            {
                path: "/content",
                component: () =>
                    import ("@/views/front/content/Content.vue"),
                children: [
                    // three.js
                    {
                        path: "/threejs1",
                        component: () =>
                            import ("@/views/front/threejs/blog1.vue")
                    },
                    {
                        path: "/threejs2",
                        component: () =>
                            import ("@/views/front/threejs/blog2.vue")
                    },
                    {
                        path: "/threejs3",
                        component: () =>
                            import ("@/views/front/threejs/blog3.vue")
                    },
                    {
                        path: "/threejs4",
                        component: () =>
                            import ("@/views/front/threejs/blog4.vue")
                    },
                    {
                        path: "/threejs5",
                        component: () =>
                            import ("@/views/front/threejs/blog5.vue")
                    },
                    {
                        path: "/threejs6",
                        component: () =>
                            import ("@/views/front/threejs/blog6.vue")
                    },
                    // glsl
                    {
                        path: "/glsl1",
                        component: () =>
                            import ("@/views/front/glsl/glsl1.vue")
                    },
                    {
                        path: "/glsl2",
                        component: () =>
                            import ("@/views/front/glsl/glsl2.vue")
                    },
                ]
            },
            // 毒鸡汤
            {
                path: "/soup",
                component: () =>
                    import ("@/views/front/more/soup/soup.vue")
            },
            // 表情包
            {
                path: "/emoticons",
                component: () =>
                    import ("@/views/front/more/emoticons/emoticons.vue")
            },
            // 关于我
            {
                path: "/me",
                component: () =>
                    import ("@/views/front/me/Me.vue")
            },
            // 关于博客
            {
                path: "/blog",
                component: () =>
                    import ("@/views/front/blog/Blog.vue")
            },
            // 测试页面
            {
                path: "/test",
                component: () =>
                    import ("@/views/front/test/test.vue")
            },
        ]
    },
    // 下雨
    {
        path: "/rainy",
        component: () =>
            import ("@/views/front/more/rainy/rainy.vue")
    },
    // 暗黑城市
    {
        path: "/dark-city",
        component: () =>
            import ("@/views/front/more/dark-city/dark-city.vue")
    },
    // 星系
    {
        path: "/solar",
        component: () =>
            import ("@/views/front/more/solar/solar.vue")
    },
    // 国王大厅
    {
        path: "/king",
        component: () =>
            import ("@/views/front/more/king/king.vue")
    },
    // 心动声音
    {
        path: "/heart",
        component: () =>
            import ("@/views/front/more/heart/heart.vue")
    },
    // 管理登录
    {
        path: "/admin-login",
        component: () =>
            import ("@/views/admin/login/Login.vue")
    },
    // 管理列表
    {
        path: "/admin-list",
        component: () =>
            import ("@/views/admin/list/List.vue")
    },
    // markdown帮助页面
    {
        path: "/help",
        component: () =>
            import ("@/views/admin/help/Help.vue")
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

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router