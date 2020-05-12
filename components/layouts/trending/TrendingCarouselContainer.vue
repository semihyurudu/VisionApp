<template>
    <div class="trending-carousel">
        <b-container>
            <b-row>
                <b-col col>
                    <div class="carousel-tabs-container">
                        <h4>Trending</h4>
                        <b-tabs lazy>
                            <b-tab active>
                                <template v-slot:title>
                                    <b-icon-layers-half></b-icon-layers-half> <strong>Day</strong>
                                </template>
                                <CarouselSlider
                                        :loading="trendsOfDayLoading"
                                >
                                    <slide v-for="(item, index) in day.results" :key="index">
                                        <ListTvCarouselItem :tv="item" v-if="item.media_type === 'tv'" />
                                        <ListMoviesCarouselItem :movie="item" v-if="item.media_type === 'movie'" />
                                    </slide>
                                </CarouselSlider>


                            </b-tab>
                            <b-tab>
                                <template v-slot:title>
                                    <b-icon-layers-half></b-icon-layers-half> <strong>Week</strong>
                                </template>
                                <CarouselSlider
                                        :loading="trendsOfWeekLoading"
                                >
                                    <slide v-for="(item, index) in week.results" :key="index">
                                        <ListTvCarouselItem :tv="item" v-if="item.media_type === 'tv'" />
                                        <ListMoviesCarouselItem :movie="item" v-if="item.media_type === 'movie'" />
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
    import { helper } from '../../../mixins/helper.js';
    import Carousel from "../../partials/carousel/Carousel";
    import CarouselSlider from "../../partials/carousel/CarouselSlider";
    import ListMoviesCarouselItem from "../movie/ListMoviesCarouselItem";
    import ListTvCarouselItem from "../tv/ListTvCarouselItem";
    import {Slide} from 'hooper';
    export default {
        name: 'TrendingCarouselContainer',
        mixins: [helper],
        components: {
            Carousel,
            CarouselSlider,
            Slide,
            ListTvCarouselItem,
            ListMoviesCarouselItem
        },

        computed: {
            ...mapGetters({
                "day": "trends/day",
                "week": "trends/week",
                "loadings": "loadings"
            }),

            trendsOfDayLoading() {
                return this.loadings.findIndex(e => e === 'getTrends_day_all') > -1
            },

            trendsOfWeekLoading() {
                return this.loadings.findIndex(e => e === 'getTrends_week_all') > -1
            }
        },

        methods: {
            ...mapActions({
                "getTrends": "trends/getTrends"
            }),
        },
        mounted() {
            this.getTrends('day');
            this.getTrends('week');
        }
    }
</script>

<style scoped>
    .trending-carousel {
        background-image: url('/images/trending-bg.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        padding-top: 70px;
        background-position: bottom center;
    }
</style>