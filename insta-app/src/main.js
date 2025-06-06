import { createApp } from 'vue'
import App from './App.vue'
import store from "./insta/index"
import router from "./router"

createApp(App).use(store).use(router).mount('#app')