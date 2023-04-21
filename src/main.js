import Vue from 'vue'
import App from './App.vue'
import router from './route/router'
import store from './store'

// 這邊掛全域，但是 component 沒有吃到
import "./scss/global.import.scss";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')