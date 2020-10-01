import Vue from "vue";
import App from "./App.vue";

// 导入element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 导入路由
import router from "./router";
// 导入全局样式表
import "./assets/css/normalize.css";
import "./assets/css/global.css";

// 导入axios
import axios from "axios";
Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
