import Vue from "vue";
import App from "./App.vue";
import parseColors from './parseColor.js';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

parseColors()