export default {
    namespaced: true,
    state: {
        scorer: [],
    },
    mutations: {
        set: (state, payload) => {
            state.scorer = payload;
        },
    },
    actions: {
        set: ({ commit }, value) => {
            commit('set', value);
        },
    },
    getters: {
        getScorer: (state) => state.scorer,
    },
};
