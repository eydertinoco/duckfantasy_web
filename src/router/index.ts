import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from "@/store/auth";

import * as jwt from 'jsonwebtoken';

import {isJWT, IsJWT} from "class-validator";

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

class UserToken
{
  @IsJWT()
  token: string | undefined;

  constructor(token: string | undefined) {
    this.token = isJWT(token) ? token : undefined;
  }

}

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuthStore();

    const verify = new UserToken(auth?.token || undefined);

    if (verify.token) {
      next();
    } else {
      next({name:'login'});
    }
  } else {
    next();
  }
})

export default router
