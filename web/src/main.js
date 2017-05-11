/**
 * @file 电子书爬虫入口界面
 *
 * @author thu（thufelixc@gmail.com）
 */
import Vue from 'vue';
import App from './App';
import router from './router';
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});

