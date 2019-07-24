import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/smoking',
      name: 'smoking',
      component: () => import(/* webpackChunkName: "about" */ './views/Smoking.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import(/* webpackChunkName: "about" */ './views/Me.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    }
  ]
})
