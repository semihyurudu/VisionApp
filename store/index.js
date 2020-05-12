import Vue from 'vue';

export const state = () => ({
    searchBar: {
        isShow: false,
        text: '',
        search_type: 'multi'
    },
    search_results: {
        page: 1,
        total_results: 0,
        total_pages: 0,
        results: []
    },
    persons: [],
    genres: [],
    loadings: []
});

export const getters = {
    searchBar: state => state.searchBar,
    search_results: state => state.search_results,
    persons: state => state.persons,
    genres: state => state.genres,
    loadings: state => state.loadings,
    is_loading: state => state.loadings.length > 0
};

export const mutations = {
    SET_SEARCH_BAR(state, data) {
        state.searchBar = data;
    },
    SET_SEARCH_RESULTS(state, data) {
        state.search_results = data;
    },
    SET_PERSONS(state, data) {
        state.persons = data;
    },
    SET_GENRES(state, data) {
        state.genres = data;
    },
    ADD_LOADING(state, data) {
        Vue.set(state.loadings, state.loadings.length, data)
    },
    REMOVE_LOADING(state, data) {
        const index = state.loadings.findIndex(e => e === data);
        if(index > -1) {
            state.loadings.splice(index, 1);
        }
    }
};

export const actions = {
    setLoading({commit}, params) {
        if(params.type === 'add') {
            commit('ADD_LOADING', params.name)
        } else if(params.type === 'remove') {
           commit('REMOVE_LOADING', params.name)
        }
    },
    getSearchResults({commit}, params) {
        commit('SET_SEARCH_BAR', {
            isShow: true,
            text: params.query,
            search_type: params.search_type
        });
        return this.$service.search.getSearchResults(params)
           .then((data) => {
               commit('SET_SEARCH_RESULTS', data)
           })
           .catch((error) => {
               return Promise.reject(error)
           })
    }
}