import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import header from './self-components/header/header.vue'
Vue.component('header-bar', header)
import tabbar from './self-components/tabbar/tabbar.vue'
Vue.component('tab-bar', tabbar)

const app = new Vue({
	...App
})
app.$mount()
