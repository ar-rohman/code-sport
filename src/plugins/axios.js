import axios from 'axios';

export default {
    install: (app) => {
        app.config.globalProperties.$axios = (param, ip = false) => {
            const config = {
                url: param,
                baseURL: process.env.VUE_APP_API_URL,
                headers: { 'X-Auth-Token': process.env.VUE_APP_API_KEY },
                timeout: 10000,
            };
            const data = ip ? param : config;
            return axios(data);
        };
    },
};
