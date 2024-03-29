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
  },
  {
    path: '/novaturma',
    name: 'novaturma',
    component: () => import(/* webpackChunkName: "user" */ '../views/CriarTurmaView.vue'),
    meta: {
      auth: true,
    }
  },
  {
    path: '/minhaturma',
    name: 'minhaturma',
    component: () => import(/* webpackChunkName: "user" */ '../views/MinhaTurmaView.vue'),
    meta: {
      auth: true,
    }
  },
  {
    path: '/turma/:id',
    name: 'turma',
    props: true,
    component: () => import(/* webpackChunkName: "user" */ '../views/TurmaView.vue'),
    meta: {
      auth: true,
    }
  },
  {
    path: '/turma/:id/vincularturma',
    name: 'vincularturma',
    component: () => import(/* webpackChunkName: "user" */ '../views/VincularTurma.vue'),
    meta: {
      auth: true,
    }
  },
  {
    path: '/minhatrilha',
    name: 'minhatrilha',
    component: () => import(/* webpackChunkName: "user" */ '../views/MinhaTrilhaView.vue'),
    meta: {
      auth: true,
    }
  },
  {
    path: '/novatrilha',
    name: 'novatrilha',
    component: () => import(/* webpackChunkName: "user" */ '../views/CriarTrilhaView.vue'),
    meta: {
      auth: true,
    }
  },
  {
    path: '/trilha/:id',
    name: 'trilha',
    component: () => import(/* webpackChunkName: "user" */ '../views/TrilhaView.vue'),
    meta: {
      auth: true,
    }
  },
  {
    path: '/trilha/:id/novoconteudo',
    name: 'novoconteudo',
    component: () => import(/* webpackChunkName: "user" */ '../views/CriarCapituloView.vue'),
    props: true,
    meta: {
      auth: true,
    }
  },
  {
    path: '/conteudo/:id',
    name: 'conteudo',
    component: () => import(/* webpackChunkName: "user" */ '../views/CapituloView.vue'),
    props: true,
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
