<template>
    <b-overlay :show="loading" rounded="sm">
        <div class="list-movies-carousel carousel-with-poster">
            <hooper :settings="hooperSettings" v-if="!loading">

                <slide v-for="(movie, index) in movies" :key="index" :index="index">
                    <nuxt-link :to="getMovieLink(movie['id'])">
                        <div class="carousel-with-poster-image">
                            <img :src="getMoviePoster(movie['poster_path'])"/>
                        </div>

                        <div class="carousel-with-poster-content">
                            <h4>{{movie['title']}}</h4>
                            <h6>{{movie['release_date']}}</h6>
                            <PercentageCircle
                                    :percent="getPercentage(movie['vote_average'])"
                                    size="small"
                                    active-color="orange"
                            />
                        </div>
                    </nuxt-link>
                </slide>

                <slide class="show-all-poster" v-if="!loading">
                    <nuxt-link to="/movies/popular">
                        <div class="carousel-with-poster-image">
                            <img src="/show-all-poster.jpg"/>
                        </div>
                        <h4>
                            Show All
                            <b-icon-caret-right-fill></b-icon-caret-right-fill>
                        </h4>
                    </nuxt-link>
                </slide>

            </hooper>
        </div>
    </b-overlay>
</template>


<script>
    import {Hooper, Slide} from 'hooper';
    import 'hooper/dist/hooper.css';
    import {helper} from '../../../mixins/helper.js';
    import PercentageCircle from '../../../node_modules/vue-css-percentage-circle';

    export default {
        name: 'ListMoviesCarousel',
        mixins: [helper],
        components: {
            Hooper,
            Slide,
            PercentageCircle
        },
        props: {
            movies: {
                type: Array,
                required: true,
                default() {
                    return [];
                }
            },
            loading: {
                type: Boolean,
                required: true,
                default() {
                    return true;
                }
            }
        },
        methods: {
            getMoviePoster(path) {
                return this.getSmallPosterPath() + path;
            },
            getMovieLink(id) {
                return '/movie/' + id;
            },
            getPercentage(ratio) {
                return ratio * 10;
            }
        },
        data() {
            return {
                hooperSettings: {
                    centerMode: false,
                    infiniteScroll: false,
                    autoPlay: true,
                    playSpeed: 2000,
                    mouseDrag: true,
                    touchDrag: true,
                    trimWhiteSpace: true,
                    pagination: 'fraction',
                    breakpoints: {
                        0: {
                            itemsToShow: 1.2
                        },
                        320: {
                            itemsToShow: 2.2
                        },
                        768: {
                            itemsToShow: 3.2
                        },
                        960: {
                            itemsToShow: 4.3
                        },
                        1140: {
                            itemsToShow: 5.5,
                        }
                    }
                },
            }
        }
    }
</script>

<style scoped>

</style>