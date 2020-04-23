<template>
    <div class="search-bar">
        <div class="search-bar-icon search-bar-icon-close" v-show="searchBar.isShow" @click="toggleSearch(false)">
            <b-icon-x></b-icon-x>
        </div>
        <div class="search-bar-icon search-bar-icon-open" v-show="!searchBar.isShow" @click="toggleSearch(true)">
            <b-icon-search></b-icon-search>
        </div>
        <div class="search-bar-form" id="search-bar-form" v-show="searchBar.isShow">
            <b-container>
                <b-row>
                    <b-col col>
                        <b-input-group :prepend="getPrependDescription">
                            <b-form-input
                                    placeholder="Search for a movie, tv show, person..."
                                    v-model="query"
                                    @keypress.enter="Search"
                                    autocomplete="off"
                                    id="search-bar-input"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button variant="info" @click="Search">SEARCH</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    import { helper } from '../../../mixins/helper.js';
    import { mapGetters } from 'vuex';

    export default {
        name: 'SearchBar',
        mixins: [helper],
        computed: {
            getPrependDescription() {
                return this.getSearchTypeText(this.search_type);
            },
            ...mapGetters({
                searchBar: 'searchBar'
            }),
        },
        watch: {
          'searchBar': 'cameSearchFromStore'
        },
        methods: {
            Search() {
                if(this.query) {
                    this.$router.push({
                        name: 'search-text',
                        query: {
                            text: this.query,
                            search_type: (typeof this.search_type !== 'undefined') ? this.search_type : 'multi',
                            page: 1
                        }
                    });
                }
            },
            toggleSearch(is_show) {
                this.$store.commit('SET_SEARCH_BAR', {
                    isShow: is_show,
                    text: this.$route.query.text
                });
            },
            cameSearchFromStore(search) {
                this.query = search.text;
                this.search_type = search.search_type;
            }
        },
        data() {
            return {
                search_type: 'multi',
                query: ''
            }
        },
        mounted() {
            this.search_type = this.$route.query.search_type;
        }
    }
</script>

<style scoped>
    .search-bar {
        float: right;
        width: 30px;
        height: 30px;
        margin-left: 15px;
        position: relative;
        margin-top: 10px;
    }

    .search-bar .search-bar-icon {text-align: center;line-height: 30px;color: white;cursor: pointer;}
    .search-bar .search-bar-form {
        position: fixed;
        top: 70px;
        width: 100%;
        right: 0;
        left: 0;
        z-index: 9999;
    }
</style>