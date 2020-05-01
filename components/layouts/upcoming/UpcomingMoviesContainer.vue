<template>
    <div class="upcoming-movies">
        <b-container>
            <b-row>
                <b-col col>
                    <div class="carousel-tabs-container">
                        <h4>Upcoming Movies</h4>
                        <b-tabs lazy>
                            <b-tab active>
                                <template v-slot:title>
                                    <b-icon-layers-half></b-icon-layers-half> <strong>Day</strong>
                                </template>
                                <ListMoviesCarousel :movies="upcomingMoviesOfDay" :loading="upcomingMoviesOfDayLoading" :show-all="true" show-all-link="upcoming" />
                            </b-tab>
                            <b-tab>
                                <template v-slot:title>
                                    <b-icon-layers-fill></b-icon-layers-fill> <strong>Week</strong>
                                </template>
                                <ListMoviesCarousel :movies="upcomingMoviesOfWeek" :loading="upcomingMoviesOfWeekLoading" :show-all="true" show-all-link="upcoming" />                            </b-tab>
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
        name: 'upcomingMoviesOfWeekContainer',
        mixins: [helper],
        components: {
            ListMoviesCarousel,
        },
        data() {
            return {
                upcomingMoviesOfDay: [],
                upcomingMoviesOfDayLoading: true,
                upcomingMoviesOfWeek: [],
                upcomingMoviesOfWeekLoading: true,
            }
        },
        methods: {
            getUpcomingMovies(type, period) {
                fetch(this.trendingUrl(type, period))
                    .then((res) => { return res.json() })
                    .then((res) => {
                        switch (period) {
                            case 'day':
                                this.upcomingMoviesOfDay = res.results;
                                this.upcomingMoviesOfDayLoading = false;
                                break;
                            case 'week':
                                this.upcomingMoviesOfWeek = res.results;
                                this.upcomingMoviesOfWeekLoading = false;
                                break;
                            default:
                                break;
                        }
                    })
            },
        },
        mounted() {
            this.getUpcomingMovies('all', 'day');
            this.getUpcomingMovies('all', 'week');
        }
    }
</script>
