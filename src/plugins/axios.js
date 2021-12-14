import axios from 'axios';

let installed = false;

export default {
    install(Vue) {
        if (installed) return;
        Vue.prototype.$axios = (param) => {
            const instance = axios.create({
                url: param,
                baseURL: process.env.VUE_APP_API_URL,
                headers: { 'X-Auth-Token': process.env.VUE_APP_API_KEY },
            });
            return instance;
        };
        installed = true;
    },
};
