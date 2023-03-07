import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import PrimeVue from 'primevue/config';

import './assets/scss/app.scss';

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(PrimeVue).mount('#app')
