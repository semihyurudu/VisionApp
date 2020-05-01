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
                                <ListMoviesCarousel :movies="trendsOfDay" :loading="trendsOfDayLoading" :show-all="true" show-all-link="trending/day" />
                            </b-tab>
                            <b-tab>
                                <template v-slot:title>
                                    <b-icon-layers-fill></b-icon-layers-fill> <strong>Week</strong>
                                </template>
                                <ListMoviesCarousel :movies="trendsOfWeek" :loading="trendsOfWeekLoading" :show-all="true" show-all-link="trending/week" />
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
    import ListMoviesCarousel from "../movie/ListMoviesCarousel";
    export default {
        name: 'TrendingCarouselContainer',
        mixins: [helper],
        components: {
            ListMoviesCarousel
        },
        data() {
            return {
                trendsOfDay: [],
                trendsOfDayLoading: true,
                trendsOfWeek: [],
                trendsOfWeekLoading: true,
            }
        },
        methods: {
            getTrendsOfDay() {
                fetch(this.trendingUrl('all', 'day'))
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.trendsOfDay = res.results.filter((x) => {
                            return (x['poster_path'] || x['profile_path'])
                        });
                        this.trendsOfDayLoading = false;
                    })
            },
            getTrendsOfWeek() {
                fetch(this.trendingUrl('all', 'week'))
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.trendsOfWeek = res.results;
                        this.trendsOfWeekLoading = false;
                    })
            },
        },
        mounted() {
            this.getTrendsOfDay();
            this.getTrendsOfWeek();
        }
    }
</script>

<style scoped>
    .trending-carousel {
        background-image: url('/trending-bg.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        padding-top: 70px;
        background-position: bottom center;
    }
</style>