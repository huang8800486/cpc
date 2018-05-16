// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store';
import VueRouter from 'vue-router'
import router from './router'
import VueLazyload from 'vue-lazyload' // 引入图片懒加载模块
import '../static/css/reset.css'
import 'animate.css'
import './common/css/index.styl'
import './common/font/font.styl'
import './common/js/rem.js'
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import {Scroll} from 'cube-ui'

Vue.use(Scroll)
Vue.use(AlloyFingerPlugin, {
    AlloyFinger
})
Vue.config.productionTip = false

// error，loading是图片路径, 用require引入
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/404.png'),
    // loading: require('./assets/loading.gif'),
    attempt: 1,
    adapter: {
        loading (listender, Init){
            // console.log(listender);
            listender.el.className += " clearlazy";
        },

        loaded ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }){
            el.className = "";
        },

        error (listender, Init){
            
        }
    }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


