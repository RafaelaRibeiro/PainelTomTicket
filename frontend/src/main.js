import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./config/router";
import "./config/axios";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,

  render: (h) => h(App),
}).$mount("#app");
