import Vue from 'vue';

export const state = () => ({
    searchBar: {
        isShow: false,
        text: ''
    }
});

export const getters = {
    searchBar: state => state.searchBar,

};

export const mutations = {
    SET_SEARCH_BAR(state, data) {
        state.searchBar = data;
    }
};