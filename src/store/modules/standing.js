export default {
    namespaced: true,
    state: {
        standing: [],
    },
    mutations: {
        set: (state, payload) => {
            state.standing = payload;
        },
    },
    actions: {
        set: ({ commit }, value) => {
            commit('set', value);
        },
    },
    getters: {
        getStanding: (state) => state.standing,
    },
};
