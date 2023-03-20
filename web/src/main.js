import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import 'animate.css'
import './css/variable.css'
import './css/element-variables.scss'
import './css/common.css'
import infiniteScroll from 'vue-infinite-scroll'

Vue.config.productionTip = false

// ElementUI
Vue.use(ElementUI)
Vue.prototype.$loading = ElementUI.Loading.service
Vue.prototype.$msgbox = ElementUI.MessageBox
Vue.prototype.$alert = ElementUI.MessageBox.alert
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$notify = ElementUI.Notification
Vue.prototype.$message = ElementUI.Message

Vue.use(infiniteScroll)

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
}).$mount('#app')