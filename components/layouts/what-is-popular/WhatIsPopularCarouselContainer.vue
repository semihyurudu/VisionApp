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
                                <CarouselSlider
                                        :loading="isPopularMoviesLoading"
                                        show-all-link="/movie/popular"
                                >
                                    <slide v-for="(item, index) in popular_movies.results" :key="index">
                                        <ListMoviesCarouselItem :movie="item" />
                                    </slide>
                                </CarouselSlider>
                            </b-tab>

                            <b-tab>
                                <template v-slot:title>
                                    <b-icon-tv></b-icon-tv> <strong>{{getSearchTypeText('tv')}}</strong>
                                </template>
                                <CarouselSlider
                                        :loading="isPopularTvShowsLoading"
                                        show-all-link="/tv/popular"
                                >
                                    <slide v-for="(item, index) in popular_tv_shows.results" :key="index">
                                        <ListTvCarouselItem :tv="item" />
                                    </slide>
                                </CarouselSlider>
                            </b-tab>

                            <b-tab>
                                <template v-slot:title>
                                    <b-icon-people-fill></b-icon-people-fill> <strong>{{getSearchTypeText('person')}}</strong>
                                </template>
                                <CarouselSlider
                                        :loading="isPopularPeoplesLoading"
                                        show-all-link="/person/popular"
                                >
                                    <slide v-for="(item, index) in popular_peoples.results" :key="index">
                                        <ListPersonCarouselItem :person="item" />
                                    </slide>
                                </CarouselSlider>
                            </b-tab>
                        </b-tabs>
                    </div>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ListMoviesCarouselItem from "../movie/ListMoviesCarouselItem";
    import ListTvCarouselItem from "../tv/ListTvCarouselItem";
    import ListPersonCarouselItem from "../person/ListPersonCarouselItem";
    import {Slide} from 'hooper';
    import { helper } from '../../../mixins/helper.js';
    import Carousel from "../../partials/carousel/Carousel";
    import CarouselSlider from "../../partials/carousel/CarouselSlider";
    export default {
        name: 'WhatIsPopularCarousel',
        mixins: [helper],
        components: {
            Carousel,
            ListMoviesCarouselItem,
            ListTvCarouselItem,
            CarouselSlider,
            Slide,
            ListPersonCarouselItem
        },
        data() {
            return {
                tabIndex: 0,
                moviesLoading: true,
                tvShowsLoading: true,
                peoples: [],
                peoplesLoading: true
            }
        },
        computed: {
            ...mapGetters({
                "loadings": "loadings",
                "popular_movies": "movies/popular_movies",
                "popular_tv_shows": "tv_shows/popular_tv_shows",
                "popular_peoples": "peoples/popular",
            }),

            isPopularMoviesLoading() {
                return this.loadings.findIndex(e => e === 'getPopularMovies') > -1
            },

            isPopularTvShowsLoading() {
                return this.loadings.findIndex(e => e === 'getPopularTvShows') > -1
            },

            isPopularPeoplesLoading() {
                return this.loadings.findIndex(e => e === 'getPopularPeoples') > -1
            }
        },
        methods: {
            ...mapActions({
                "getPopularMovies": "movies/getPopularMovies",
                "getPopularTvShows": "tv_shows/getPopularTvShows",
                "getPopularPeoples": "peoples/getPopular",
            })
        },
        mounted() {
            this.getPopularMovies(1);
            this.getPopularTvShows();
            this.getPopularPeoples();
        }
    }
</script>

<style scoped>
    .what-is-popular-carousel {
        margin-top: 60px;
    }
</style>