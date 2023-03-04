import { createApp } from 'vue'

import './assets/styles/index.css'

import store from './store'
import App from './App.vue'

export const app = createApp(App);

app.use(store);

app.mount('#app')
