import Vue from 'vue';

export const state = () => ({
    popular_movies: {},
    upcoming: {}
});

export const getters = {
    popular_movies: state => state.popular_movies,
    upcoming: state => state.upcoming
};

export const mutations = {
    SET_POPULAR_MOVIES(state, data) {
        state.popular_movies = data;
    },
    SET_UPCOMING(state, data) {
        state.upcoming = data;
    },
};

export const actions = {
    getPopularMovies({commit}, page, callback) {
        return this.$service.movies.getPopularMovies(page)
            .then((data) => {
                if(typeof callback === 'function')
                    callback()
                commit('SET_POPULAR_MOVIES', data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    },
    getUpcoming({commit}) {
        return this.$service.movies.getUpcoming()
            .then((data) => {
                commit('SET_UPCOMING', data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}