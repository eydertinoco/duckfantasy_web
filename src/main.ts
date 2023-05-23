import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import './assets/scss/app.scss';

const pinia = createPinia();

createApp(App)
    .use(router)
    .use(pinia)
    .component('QuillEditor', QuillEditor)
    .mount('#app');
