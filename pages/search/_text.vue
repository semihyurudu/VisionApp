<template>
    <main class="search pt-5">
        <b-container>
            <b-row>
                <b-col md="12" lg="3" class="mb-4">
                    <SearchResultsSidebar
                            :text="getText"
                            :multi-count="searchBar.search_type === 'multi' ? search_results.total_results : 0"
                            :movie-count="searchBar.search_type === 'movie' ? search_results.total_results : 0"
                            :person-count="searchBar.search_type === 'person' ? search_results.total_results : 0"
                            :tv-count="searchBar.search_type === 'tv' ? search_results.total_results : 0"
                    ></SearchResultsSidebar>
                </b-col>
                <b-col md="12" lg="9">
                    <template v-if="completed && isLoading">
                        <loading active
                                :can-cancel="false"
                                 :is-full-page="false">
                        </loading>
                    </template>
                    <template v-else>
                        <b-alert show variant="danger" v-if="!search_results.results.length">
                            <h5>We are sad.</h5>
                            We couldn't find any results matching your search.
                        </b-alert>


                        <div v-else>
                            <div class="search-movie-block" v-if="moviesResults.length > 0">
                                <h1>Movies</h1>
                                <SearchMovieItem :movies="moviesResults"/>
                            </div>

                            <div class="search-tv-block" v-if="tvShowsResults.length > 0">
                                <h1>TV Shows</h1>
                                <SearchTvItem :tv="tvShowsResults"/>
                            </div>

                            <div class="search-peoples-block" v-if="personResults.length > 0">
                                <h1>Peoples</h1>
                                <SearchPeoplesItem :peoples="personResults"/>
                            </div>

                            <b-pagination
                                    v-model="getPage"
                                    :total-rows="search_results.total_results"
                                    per-page="20"
                                    aria-controls="my-table"
                                    align="center"
                                    input="inputTriggered"
                                    @change="onPageChanged"
                                    v-if="search_results.total_results > 0"
                            ></b-pagination>
                        </div>
                    </template>
                </b-col>
            </b-row>
        </b-container>
    </main>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    import Header from "../../components/layouts/Header";
    import SearchMovieItem from "../../components/layouts/search/SearchMovieItem";
    import SearchTvItem from "../../components/layouts/search/SearchTvItem";
    import SearchPeoplesItem from "../../components/layouts/search/SearchPeoplesItem";
    import SearchResultsSidebar from "../../components/layouts/search/SearchResultsSidebar";
    import {helper} from '@/mixins/helper.js';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        name: 'Search',
        mixins: [helper],
        components: {
            Header,
            SearchMovieItem,
            SearchTvItem,
            SearchPeoplesItem,
            Loading,
            SearchResultsSidebar
        },

        async asyncData({ app, route }) {
          await app.store.dispatch("getSearchResults", {
              search_type: route.query.search_type,
              query: route.query.text,
              page: route.query.page
          })
        },

        data() {
            return {
                completed: false
            }
        },

        mounted() {
            this.completed = true;
        },
        watch: {
            '$route': 'fetchData'
        },
        computed: {
            ...mapGetters({
                "searchBar": "searchBar",
                "search_results": "search_results",
                "loadings": "loadings"
            }),

            isLoading(){
                return this.loadings.findIndex(e => e === 'getSearchResults') > -1
            },

            getText() {
                return this.$route.query.text;
            },
            getPage: {
                get() {
                    return this.$route.query.page;
                },
                set(page) {

                    if(parseInt(page) !== parseInt(this.$route.query.page)) {
                        this.$router.push({
                            name: 'search-text',
                            query: {
                                text: this.$route.query.text,
                                search_type: this.$route.query.search_type,
                                page: page
                            }
                        });
                    }

                }
            },
            moviesResults() {
                if (this.$route.query.search_type === 'multi') {
                    return this.search_results.results.filter(e => e.media_type === 'movie')
                }else if (this.$route.query.search_type === 'movie') {
                    return this.search_results.results
                }

                return []
            },
            tvShowsResults() {
                if (this.$route.query.search_type === 'multi') {
                    return this.search_results.results.filter(e => e.media_type === 'tv')
                }else if (this.$route.query.search_type === 'tv') {
                    return this.search_results.results
                }

                return []
            },
            personResults() {
                if (this.$route.query.search_type === 'multi') {
                    return this.search_results.results.filter(e => e.media_type === 'person')
                } else if (this.$route.query.search_type === 'person') {
                    return this.search_results.results
                }

                return []
            },

            getPageTitle() {
                return 'Search Results of "' + this.$route.query.text + '"'
            },
        },
        methods: {
            ...mapActions({
                "getSearchResults": "getSearchResults"
            }),
            onPageChanged(page) {
                this.$router.push({
                    name: 'search-text',
                    query: {
                        text: this.$route.query.text,
                        search_type: this.$route.query.search_type,
                        page: page
                    }
                });

            },
            fetchData() {
                this.getSearchResults({
                    search_type: this.$route.query.search_type,
                    query: this.$route.query.text,
                    page: this.$route.query.page
                })
            }
        },
        head() {
            return {
                title: this.getHeadTitle(this.getPageTitle)
            }
        }
    }
</script>

<style scoped>
    .search-movie-block h1,
    .search-tv-block h1,
    .search-person-block h1 {
        margin-bottom: 20px;
    }
</style>
