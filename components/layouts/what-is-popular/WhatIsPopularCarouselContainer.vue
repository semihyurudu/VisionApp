<template>
    <div class="what-is-popular-carousel">
        <b-container>
            <b-row>
                <b-col col>
                    <div class="carousel-tabs-container">
                        <h4>What's Popular</h4>
                        <b-tabs v-model="tabIndex" lazy>
                            <b-tab active>
                                <template v-slot:title>
                                    <b-icon-film></b-icon-film> <strong>{{getSearchTypeText('movie')}}</strong>
                                </template>
                                <Carousel
                                        :items="movies"
                                        :loading="moviesLoading"
                                        show-all-link="/movie/popular"
                                        type="movie"
                                />
                            </b-tab>

                            <b-tab>
                                <template v-slot:title>
                                    <b-icon-tv></b-icon-tv> <strong>{{getSearchTypeText('tv')}}</strong>
                                </template>
                                <Carousel
                                        :items="tvShows"
                                        :loading="tvShowsLoading"
                                        show-all-link="/tv/popular"
                                        type="tv"
                                />
                            </b-tab>

                            <b-tab>
                                <template v-slot:title>
                                    <b-icon-people-fill></b-icon-people-fill> <strong>{{getSearchTypeText('person')}}</strong>
                                </template>
                                <Carousel
                                        :items="peoples"
                                        :loading="peoplesLoading"
                                        show-all-link="/person/popular"
                                        type="person"
                                />
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
    import Carousel from "../../partials/carousel/Carousel";
    export default {
        name: 'WhatIsPopularCarousel',
        mixins: [helper],
        components: {Carousel},
        data() {
            return {
                tabIndex: 0,
                movies: [],
                moviesLoading: true,
                tvShows: [],
                tvShowsLoading: true,
                peoples: [],
                peoplesLoading: true
            }
        },
        methods: {
            getPopularMovies() {
                fetch(this.popularMoviesUrl())
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.movies = res.results.filter((x) => {
                            return x['poster_path'];
                        });
                        this.moviesLoading = false;
                    })
            },
            getPopularTvShows() {
                fetch(this.popularTvShowsUrl())
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.tvShows = res.results.filter((x) => {
                            return x['poster_path'];
                        });
                        this.tvShowsLoading = false;
                    })
            },
            getPopularPeoples() {
                fetch(this.popularPeoplesUrl(1))
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.peoples = res.results.filter((x) => {
                            return x['profile_path'];
                        });
                        this.peoplesLoading = false;
                    })
            }
        },
        mounted() {
            this.getPopularMovies();
            this.getPopularTvShows();
            this.getPopularPeoples()
        }
    }
</script>

<style scoped>
    .what-is-popular-carousel {
        margin-top: 60px;
    }
</style>