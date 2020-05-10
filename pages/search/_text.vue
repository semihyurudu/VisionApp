<template>
    <main class="search pt-5">
        <b-container>
            <b-row>
                <b-col md="12" lg="3" class="mb-4">
                    <SearchResultsSidebar
                            :text="getText"
                            :multi-count="getCounts.multiCount"
                            :movie-count="getCounts.movieCount"
                            :person-count="getCounts.personCount"
                            :tv-count="getCounts.tvCount"
                    ></SearchResultsSidebar>
                </b-col>
                <b-col md="12" lg="9">
                    <loading :active.sync="isLoading"
                             :can-cancel="false"
                             :is-full-page="false">
                    </loading>

                    <b-alert show variant="danger"
                             v-if="!isLoading && !result.movies.length && !result.tv.length && !result.peoples.length">
                        <h5>We are sad.</h5>
                        We couldn't find any results matching your search.
                    </b-alert>


                    <div v-if="!isLoading">
                        <div class="search-movie-block" v-if="result.movies.length > 0">
                            <h1>Movies</h1>
                            <SearchMovieItem :movies="result.movies"/>
                        </div>

                        <div class="search-tv-block" v-if="result.tv.length > 0">
                            <h1>TV Shows</h1>
                            <SearchTvItem :tv="result.tv"/>
                        </div>

                        <div class="search-peoples-block" v-if="result.peoples.length > 0">
                            <h1>Peoples</h1>
                            <SearchPeoplesItem :peoples="result.peoples"/>
                        </div>

                        <b-pagination
                                v-model="getPage"
                                :total-rows="result.total"
                                per-page="20"
                                aria-controls="my-table"
                                align="center"
                                input="inputTriggered"
                                @change="onPageChanged"
                                v-if="result.total > 0"
                        ></b-pagination>
                    </div>

                </b-col>
            </b-row>
        </b-container>
    </main>
</template>

<script>
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
        data() {
            return {
                isLoading: true,
                result: {
                    movies: [],
                    peoples: [],
                    tv: [],
                    total: 0
                }
            }
        },
        mounted() {
            this.fetchData();
            this.$store.commit('SET_SEARCH_BAR', {
                isShow: true,
                text: this.$route.query.text,
                search_type: this.$route.query.search_type
            });

        },
        watch: {
            '$route': 'fetchData'
        },
        computed: {
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
            getCounts() {
                return {
                    multiCount: this.$route.query.search_type === 'multi' ? this.result.total : 0,
                    movieCount: this.$route.query.search_type === 'movie' ? this.result.total : 0,
                    personCount: this.$route.query.search_type === 'person' ? this.result.total : 0,
                    tvCount: this.$route.query.search_type === 'tv' ? this.result.total : 0
                };
            },
            getPageTitle() {
                return 'Search Results of "' + this.$route.query.text + '"'
            }
        },
        methods: {
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
                this.isLoading = true;
                this.result.total = 0;
                fetch(this.getSearchUrl(this.$route.query.search_type, this.$route.query.text, this.$route.query.page))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {

                        let total = res['total_results'];

                        switch (this.$route.query.search_type) {
                            case 'multi':

                                let movies = res.results.filter((x) => {
                                    return x['media_type'] === 'movie';
                                });

                                let peoples = res.results.filter((x) => {
                                    return x['media_type'] === 'person';
                                });

                                let tv = res.results.filter((x) => {
                                    return x['media_type'] === 'tv';
                                });

                                this.result = {
                                    ...this.result,
                                    movies,
                                    peoples,
                                    tv
                                };

                                break;

                            case 'movie':

                                this.result = {
                                    ...this.result,
                                    movies: res.results,
                                    peoples: [],
                                    tv: []
                                };

                                break;
                            case 'person':

                                this.result = {
                                    ...this.result,
                                    peoples: res.results,
                                    movies: [],
                                    tv: []
                                };

                                break;
                            case 'tv':
                                this.result = {
                                    ...this.result,
                                    tv: res.results,
                                    movies: [],
                                    peoples: [],
                                };
                                break;

                            default:
                                break;
                        }

                        this.isLoading = false;
                        this.result = {
                            ...this.result,
                            total: total
                        }

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
