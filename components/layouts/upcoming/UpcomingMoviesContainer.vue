<template>
    <div class="upcoming-movies">
        <b-container>
            <b-row>
                <b-col col>
                    <BlockTitle title="Upcoming Movies" />
                    <CarouselSlider :loading="isLoading">
                        <slide v-for="(item, index) in upcoming_movies.results" :key="index">
                            <ListMoviesCarouselItem :movie="item" />
                        </slide>
                    </CarouselSlider>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import { helper } from '../../../mixins/helper.js';
    import BlockTitle from "../../partials/BlockTitle";
    import CarouselSlider from "../../partials/carousel/CarouselSlider";
    import ListMoviesCarouselItem from "../movie/ListMoviesCarouselItem";
    import {Slide} from 'hooper';
    export default {
        name: 'upcomingMoviesContainer',
        mixins: [helper],
        components: {
            BlockTitle,
            CarouselSlider,
            Slide,
            ListMoviesCarouselItem
        },
        computed: {
            ...mapGetters({
                "loadings": "loadings",
                "upcoming_movies": "movies/upcoming"
            }),
            isLoading() {
                return this.loadings.findIndex(e => e === 'getUpcomingMovies') > -1
            }
        },
        methods: {
            ...mapActions({
                "getUpcomingMovies": "movies/getUpcoming"
            })
        },
        mounted() {
            this.getUpcomingMovies();
        }
    }
</script>
