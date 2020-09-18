import Vue from 'vue';
import router from './router/index';
import App from './App.vue';
import Mint from 'mint-ui'; 
import 'mint-ui/lib/style.css'
import './assets/css/mixIn.css';
// import './assets/css/commonTitle.styl';
import { T } from './utils/util';
import iconfont from '@/assets/font/iconfont.css';
import '@/assets/css/my-mint.stylus';

Vue.use(Mint);
Vue.use(iconfont)

// debug
import Vconsole from 'vconsole'
// if(process.env.NODE_ENV !== 'production'){
//     var VConsole = new Vconsole()
// }


// Vue.use(Swiper)
const t = new T();
Vue.config.productionTip = true;
// 注册全局方法
Vue.prototype.$t = t;
// 页面适配
t.getRem(750, 100);
window.onresize = function () {
  t.getRem(750, 100)
}

// 判断页面回退事件
Vue.prototype.$setgoindex = function () {
    if (window.history.length <= 1) {
        console.log(9999)
        if (location.href.indexOf('?') === -1) {
        window.location.href = location.href + '?goindex=true'
        } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
        window.location.href = location.href + '&goindex=true'
        }
    }
}

new Vue({
  el: '#app',
  render(h) {
    return h(App);
  },
  router
})