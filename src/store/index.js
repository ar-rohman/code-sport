import { createStore } from 'vuex';
import scorer from './modules/scorer';
import match from './modules/match';
import standing from './modules/standing';
import team from './modules/team';

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        match,
        scorer,
        standing,
        team,
    },
});
