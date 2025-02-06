import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import 'virtual:uno.css'
import './assets/css/font.css'

const pinia = createPinia()

pinia.use(persistedState)

createApp(App).use(router).use(Antd).use(pinia).mount('#app')
