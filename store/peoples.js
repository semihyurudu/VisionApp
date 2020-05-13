import Vue from 'vue';

export const state = () => ({
    popular: {},
});

export const getters = {
    popular: state => state.popular,
};

export const mutations = {
    SET_POPULAR(state, data) {
        state.popular = data;
    },
};

export const actions = {
    getPopular({commit}) {
        return this.$service.peoples.getPopular()
            .then((data) => {
                commit('SET_POPULAR', data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}