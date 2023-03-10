import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';

import './assets/scss/app.scss';

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app');
