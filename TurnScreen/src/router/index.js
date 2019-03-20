import Vue from 'vue'
import Router from 'vue-router'
import showScreenComponet from '@/components/showScreenComponet.vue'
import screenManager from '@/components/screenManager.vue'
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

