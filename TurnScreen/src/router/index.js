import Vue from 'vue'
import Router from 'vue-router'
import screenManager from '@/components/main'
import showScreenComponet from '@/components/showScreenComponet.vue'
Vue.use(Router)

export default new Router({
  routes: [
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
