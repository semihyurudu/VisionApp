import Vue from 'vue';

export const state = () => ({
    popular_tv_shows: {},
    top_rated_tv_shows: {}
});

export const getters = {
    popular_tv_shows: state => state.popular_tv_shows,
    top_rated_tv_shows: state => state.top_rated_tv_shows
};

export const mutations = {

    SET_POPULAR_TV_SHOWS(state, data) {
        state.popular_tv_shows = data;
    },
    SET_TOP_RATED_TV_SHOWS(state, data) {
        state.top_rated_tv_shows = data;
    },
};

export const actions = {
    getPopularTvShows({commit}) {
        return this.$service.tv_shows.getPopularTvShows()
            .then((data) => {
                commit('SET_POPULAR_TV_SHOWS', data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}