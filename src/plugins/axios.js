import axios from 'axios';

export default {
    install: (app) => {
        app.config.globalProperties.$axios = (param) => {
            const config = {
                url: param,
                baseURL: process.env.VUE_APP_API_URL,
                headers: { 'X-Auth-Token': process.env.VUE_APP_API_KEY },
            };
            return axios(config);
        };
    },
};
