import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from './plugins/axios';
import './assets/styles/index.css';

createApp(App).use(store).use(router).use(axios).mount('#app');
