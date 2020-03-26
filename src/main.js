import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  render: createElement => createElement(App)
}).$mount('#app');
