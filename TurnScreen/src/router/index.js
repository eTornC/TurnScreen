import Vue from 'vue'
import Router from 'vue-router'
import showScreenComponet from '@/components/showScreenComponet.vue'
import home from '@/components/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:id',
      name: 'home',
      component: home
    },
    {
      path: '/showScreenComponet',
      name: 'showScreenComponet',
      component: showScreenComponet
    },

  ]
})

