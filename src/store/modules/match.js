export default {
    namespaced: true,
    state: {
        match: [],
    },
    mutations: {
        set: (state, payload) => {
            state.match = payload;
        },
    },
    actions: {
        set: ({ commit }, value) => {
            commit('set', value);
        },
    },
    getters: {
        getMatch: (state) => state.match,
    },
};
