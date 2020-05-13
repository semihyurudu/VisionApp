<template>
    <main class="movie-genres-item">
        <b-container>
            <ListItems name="Popular Movies" :loading="isLoading">
                <b-col md="6" lg="3" v-for="(item, index) in popular_movies.results" :key="index">
                    <ListMovieItem :movie="item" />
                </b-col>

                <template v-slot:pagination>
                    <b-pagination
                            v-model="page"
                            :total-rows="popular_movies.total_results"
                            :per-page="length"
                            aria-controls="my-table"
                            align="center"
                            input="inputTriggered"
                            @change="getPopularMovies"
                            v-if="popular_movies.total_results > 0"
                            class="mt-3"
                    ></b-pagination>
                </template>
            </ListItems>
        </b-container>
    </main>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ListItems from "../../components/layouts/list/ListItems";
    import { helper } from '@/mixins/helper.js';
    import ListMovieItem from "../../components/layouts/movie/ListMovieItem";

    export default {
        name: 'MovieGenresItem',
        mixins: [helper],
        components: {
            ListItems,
            ListMovieItem
        },
        computed: {
            ...mapGetters({
                "loadings": "loadings",
                "popular_movies": "movies/popular_movies"
            }),

            isLoading() {
                return this.loadings.findIndex(e => e === 'getPopularMovies') > -1
            }
        },
        methods: {
            ...mapActions({
                "getPopularMovies": "movies/getPopularMovies",
            })
        },
        data() {
            return {
                page: 1,
                length: 20
            }
        },
        mounted() {
            this.getPopularMovies()
        }
    }
</script>