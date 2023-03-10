import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from "@/store/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue'),
    meta: {
      auth: true,
  }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuthStore();
    const isAuthenticated = auth.checkToken();
    console.log(isAuthenticated);
    if (auth.token && isAuthenticated) {
      next();
    } else {
      next({name:'login'});
    }
  } else {
    next();
  }
})

export default router
