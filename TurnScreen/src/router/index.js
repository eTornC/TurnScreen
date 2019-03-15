import Vue from 'vue'
import Router from 'vue-router'
import screenManager from '@/components/main'
import showScreenComponet from '@/components/showScreenComponet.vue'
import home from '@/components/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/screenManager',
      name: 'screenManager',
      component: screenManager
    },
    {
      path: '/showScreenComponet',
      name: 'showScreenComponet',
      component: showScreenComponet
    },

  ]
})

