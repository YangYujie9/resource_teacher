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
import xss from 'xss';


Vue.use(plugins)


Vue.use(ElementUI)
// import Cookies from 'js-cookie'



Vue.$http = Vue.prototype.$http = erpAxios
Vue.prototype.xss = xss

Vue.$changeIndex = Vue.prototype.$changeIndex = (str) => {

	 str = str+'';
	 var len = str.length-1;
	 var idxs = ['','十','百','千','万','十','百','千','亿','十','百','千','万','十','百','千','亿'];
	 var num = ['零','一','二','三','四','五','六','七','八','九'];
	 return str.replace(/([1-9]|0+)/g,function( $, $1, idx, full) {
	  var pos = 0;
	  if( $1[0] != '0' ){
	   pos = len-idx;
	   if( idx == 0 && $1[0] == 1 && idxs[len-idx] == '十'){
	    return idxs[len-idx];
	   }
	   return num[$1[0]] + idxs[len-idx];
	  } else {
	   var left = len - idx;
	   var right = len - idx + $1.length;
	   if( Math.floor(right/4) - Math.floor(left/4) > 0 ){
	    pos = left - left%4;
	   }
	   if( pos ){
	    return idxs[pos] + num[$1[0]];
	   } else if( idx + $1.length >= len ){
	    return '';
	   }else {
	    return num[$1[0]]
	   }
	  }
	 });



}



moment.locale('zh-cn');


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
