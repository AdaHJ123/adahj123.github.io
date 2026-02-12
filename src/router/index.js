import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../pages/Home.vue"
import MoreWorks from "../pages/MoreWorks.vue"
import SendEmail from "../pages/SendEmail.vue"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/works", name: "MoreWorks", component: MoreWorks },
    { path: "/contact", component: SendEmail },
    // 项目详情页（slug 动态路由）
    {
      path: "/projects/:slug",
      name: "ProjectDetail",
      component: () => import("../pages/ProjectDetail.vue"),
      // props: true 让路由参数以 props 形式传入组件
      props: true,
    },
  ],
})

// 每次路由跳转前先经过这里；若浏览器支持 View Transitions 就用它包裹 next()，否则直接 next()
router.beforeEach((to, from, next) => {
  if (document.startViewTransition) {
    document.startViewTransition(() => next())
  } else {
    next()
  }
})

export default router

