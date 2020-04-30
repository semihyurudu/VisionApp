<template>
    <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
        <div class="list-movies-carousel carousel-with-poster">
            <hooper :settings="hooperSettings" v-if="!loading && movies.length > 0">
                <slide v-for="(movie, index) in movies" :key="index">
                    <ListMoviesCarouselItem :movie="movie" />
                </slide>

                <slide class="show-all-poster" v-if="!loading && this.showAll">
                    <nuxt-link :to="getShowAllLink(this.showAllLink)">
                        <div class="carousel-with-poster-image">
                            <img src="/show-all-poster.jpg"/>
                        </div>
                        <h4>
                            Show All
                            <b-icon-caret-right-fill></b-icon-caret-right-fill>
                        </h4>
                    </nuxt-link>
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
            <span class="text-dark" v-if="!loading && movies.length < 1">
                We don't have any movies.
            </span>
        </div>
    </b-overlay>
</template>


<script>
    import {Hooper, Slide, Navigation as HooperNavigation} from 'hooper';
    import 'hooper/dist/hooper.css';
    import ListMoviesCarouselItem from "./ListMoviesCarouselItem";

    export default {
        name: 'ListMoviesCarousel',
        components: {
            Hooper,
            Slide,
            ListMoviesCarouselItem,
            HooperNavigation
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
            },
            showAll: {
                type: Boolean,
                required: true,
                default() {
                    return false;
                }
            },
            showAllLink: {
                type: String,
                required: false,
                default() {
                    return 'popular';
                }
            }
        },
        methods: {
            getShowAllLink(link) {
                return '/movies/' + link;
            }
        },
        data() {
            return {
                hooperSettings: {
                    centerMode: false,
                    infiniteScroll: false,
                    autoPlay: true,
                    playSpeed: 3000,
                    mouseDrag: false,
                    touchDrag: false,
                    wheelControl: false,
                    trimWhiteSpace: true,
                    pagination: 'fraction',
                    breakpoints: {
                        0: {
                            itemsToShow: 1.2,
                            itemsToSlide: 1
                        },
                        320: {
                            itemsToShow: 2.2,
                            itemsToSlide: 2
                        },
                        768: {
                            itemsToShow: 3.2,
                            itemsToSlide: 3
                        },
                        960: {
                            itemsToShow: 4.3,
                            itemsToSlide: 4
                        },
                        1140: {
                            itemsToShow: 5.5,
                            itemsToSlide: 5,
                        }
                    }
                },
            }
        }
    }
</script>

<style scoped>

</style>