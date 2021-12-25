export default {
    namespaced: true,
    state: {
        team: [],
        teamDetail: [],
    },
    mutations: {
        setTeam: (state, payload) => {
            state.team = payload;
        },
        addTeamDetail: (state, payload) => {
            state.teamDetail.push(payload);
            state.teamDetail = state.teamDetail.filter((element, index, array) => {
                return index === array.findIndex((item) => item.id === element.id);
            });
        },
    },
    actions: {
        setTeam: ({ commit }, value) => {
            commit('setTeam', value);
        },
        setTeamDetail: ({ commit }, payload) => {
            commit('addTeamDetail', payload);
        },
    },
    getters: {
        getTeam: (state) => state.team,
        // getTeamDetail: (state) => state.teamDetail,
        getTeamDetail: (state) => (id) => {
            return state.teamDetail.filter((item) => +item.id === +id);
        },
    },
};
