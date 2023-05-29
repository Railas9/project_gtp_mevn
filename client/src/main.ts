import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import App from './App.vue'
import './assets/index.css'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const router  =createRouter({
    history: createWebHistory(),
    routes
})



createApp(App).component('VueDatePicker', VueDatePicker).use(router).mount('#app')
