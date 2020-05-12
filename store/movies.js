import Vue from 'vue';

export const state = () => ({
    popular_movies: {},
    upcoming_movies: {}
});

export const getters = {
    popular_movies: state => state.popular_movies,
    upcoming_movies: state => state.upcoming_movies
};

export const mutations = {

    SET_POPULAR_MOVIES(state, data) {
        state.popular_movies = data;
    },
    SET_UPCOMING_MOVIES(state, data) {
        state.upcoming_movies = data;
    },
};

export const actions = {
    getPopularMovies({commit}) {
        return this.$service.movies.getPopularMovies()
            .then((data) => {
                commit('SET_POPULAR_MOVIES', data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}