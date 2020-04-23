<template>
    <div class="what-is-popular">
        <b-container>
            <b-row>
                <b-col col>
                    <div class="carousel-tabs-container">
                        <h4>What's Popular</h4>
                        <b-tabs v-model="tabIndex">
                            <b-tab active>
                                <template v-slot:title>
                                    <b-icon-film></b-icon-film> <strong>{{getSearchTypeText('movie')}}</strong>
                                </template>
                                <ListMoviesCarousel :movies="movies" :loading="moviesLoading" />
                            </b-tab>

                            <b-tab lazy>
                                <template v-slot:title>
                                    <b-icon-tv></b-icon-tv> <strong>{{getSearchTypeText('tv')}}</strong>
                                </template>
                                <ListTvCarousel :tv-shows="tvShows" :loading="tvShowsLoading" />
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import { helper } from '../../../mixins/helper.js';
    import ListMovies from "../movie/ListMovies";
    import ListMoviesCarousel from "../movie/ListMoviesCarousel";
    import ListTvCarousel from "../tv/ListTvCarousel";
    export default {
        name: 'WhatIsPopular',
        mixins: [helper],
        components: {ListMoviesCarousel, ListMovies, ListTvCarousel},
        data() {
            return {
                tabIndex: 0,
                movies: [],
                moviesLoading: true,
                tvShows: [],
                tvShowsLoading: true
            }
        },
        methods: {
            getPopularMovies() {
                fetch(this.popularMoviesUrl(1))
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.movies = res.results.filter((x) => {
                            return x['poster_path'];
                        });
                        this.moviesLoading = false;
                    })
            },
            getPopularTvShows() {
                fetch(this.popularTvShowsUrl(1))
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.tvShows = res.results.filter((x) => {
                            return x['poster_path'];
                        });
                        this.tvShowsLoading = false;
                    })
            }
        },
        mounted() {
            this.getPopularMovies();
            this.getPopularTvShows();
        }
    }
</script>

<style scoped>
    .what-is-popular {
        margin-top: 20px;
        margin-bottom: 50px;
    }
    .carousel-tabs-container {
        position: relative;
    }

    .carousel-tabs-container > h4 {
        position: absolute;
        top: 0;
        right: 0;
        font-style: italic;
        font-weight: bold;
        color: #dc4545;
    }
</style>