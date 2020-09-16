import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import erpAxios from './common/axios'
import plugins from './utils/globalComponents'   //全局组件
import './assets/css/reset.css'


Vue.use(plugins)


Vue.use(ElementUI)
// import Cookies from 'js-cookie'



Vue.$http = Vue.prototype.$http = erpAxios


Vue.$changeIndex = Vue.prototype.$changeIndex = (index) => {

    const list = {'0': '零','1': '一','2': '二','3': '三','4': '四','5': '五','6': '六','7': '七','8': '八','9': '九'};
    return list[index]


}

moment.locale('zh-cn');


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
