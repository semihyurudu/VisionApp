<template>
    <main class="movie-genres-item">
        <b-container>
            <b-row>
                <b-col col>
                    <BlockTitle :title="getPageTitle" />
                    <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
                        <div v-if="!loading && movies.length > 0">
                            <ListMovies :movies="movies" />
                            <b-pagination
                                    v-model="page"
                                    :total-rows="total"
                                    :per-page="length"
                                    aria-controls="my-table"
                                    align="center"
                                    input="inputTriggered"
                                    @change="getMovies"
                                    v-if="total > 0"
                                    class="mt-3"
                            ></b-pagination>
                        </div>
                        <span class="text-dark" v-if="!loading && movies.length < 1">
                            We don't have any movies.
                        </span>
                    </b-overlay>

                </b-col>
            </b-row>
        </b-container>
    </main>
</template>

<script>
    import BlockTitle from "../../../components/partials/BlockTitle";
    import {helper} from '../../../mixins/helper.js';
    import ListMovies from "../../../components/layouts/movie/ListMovies";

    export default {
        name: 'MovieGenresItem',
        mixins: [helper],
        components: {
            BlockTitle,
            ListMovies
        },
        computed: {
            getPageTitle() {
                let name = '';

                if(this.$route.query.name) {
                    name = this.$route.query.name + ' ';
                }

                name += 'Movies';

                return name;
            }
        },
        methods: {
            getMovies(page) {
                this.loading = true;

                fetch(this.getWithGenresUrl('movie', this.$route.params.id, page))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.movies = res.results;
                        this.loading = false;
                        this.total = res['total_results'];
                        this.length = (res['total_results'] / res['total_pages']);
                        this.page = page;
                    })
            },
        },
        data() {
            return {
                loading: true,
                movies: [],
                page: 1,
                total: 0,
                length: 0
            }
        },
        created() {
            this.getMovies(1);
        }
    }
</script>