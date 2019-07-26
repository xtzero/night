import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: '表态',
      component: Home
    },
    {
      path: '/smoking',
      name: 'smoking',
      meta: '吸烟区',
      component: () => import('./views/Smoking.vue')
    },
    {
      path: '/me',
      name: 'me',
      meta: '自己',
      component: () => import('./views/Me.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: '登录',
      component: () => import('./views/Login.vue')
    }
  ]
})
