// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import rowGenerator from './components/layoutManager/rowGenerator.vue';
import colGenerator from './components/layoutManager/colGenerator.vue';
import contentGenerator from './components/layoutManager/contentGenerator.vue';
import storeList from "./components/layoutManager/storeList.vue";

import showRowGenerator from './components/showScreen/showRowGenerator.vue';
import showColGenerator from './components/showScreen/showColGenerator.vue';
import showContentGenerator from './components/showScreen/showContentGenerator.vue';

Vue.component('select-store', storeList);
Vue.component('row-component', rowGenerator);
Vue.component('col-component', colGenerator);
Vue.component('content-component', contentGenerator);

Vue.component('show-row-component', showRowGenerator);
Vue.component('show-col-component', showColGenerator);
Vue.component('show-content-component', showContentGenerator);


Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
