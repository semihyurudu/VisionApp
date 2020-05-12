import Vue from 'vue';

export const state = () => ({
    day: {},
    week: {}
});

export const getters = {
    day: state => state.day,
    week: state => state.week
};

export const mutations = {
    SET_DAY(state, data) {
        state.day = data;
    },
    SET_WEEK(state, data) {
        state.week = data;
    },
};

export const actions = {
    getTrends({commit}, period, media_type = 'all') {
        return this.$service.trends.getTrends(period, media_type)
            .then((data) => {
                commit('SET_' + period.toUpperCase(), data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}