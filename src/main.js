import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from './plugins/axios';
import './assets/styles/index.css';
import stringFormat from './helpers/stringFormat';

// createApp(App).use(store).use(router).use(axios).mount('#app');
const app = createApp(App);
app.use(store);
app.use(router);
app.use(axios);
app.provide('stringFormat', stringFormat);
app.mount('#app');
