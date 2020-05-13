import Vue from 'vue';

export const state = () => ({
    genres_of_movie: {},
    genres_of_tv: {}
});

export const getters = {
    genres_of_movie: state => state.genres_of_movie,
    genres_of_tv: state => state.genres_of_tv
};

export const mutations = {
    SET_GENRES_OF_MOVIE(state, data) {
        state.genres_of_movie = data;
    },
    SET_GENRES_OF_TV(state, data) {
        state.genres_of_tv = data;
    },
};

export const actions = {
    getGenres({commit}, type) {
        return this.$service.genres.getGenres(type)
            .then((data) => {
                commit('SET_GENRES_OF_' + type.toUpperCase(), data)
            })
            .catch((error) => {
                return Promise.reject(error)
            })
    }
}