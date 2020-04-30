<template>
    <b-overlay :show="loading" rounded="sm">
        <div class="list-tv-carousel carousel-with-poster">
            <hooper :settings="hooperSettings" v-if="!loading">
                <slide v-for="(tv, index) in tvShows" :key="index" :index="index">
                    <ListTvCarouselItem :tv="tv" />
                </slide>

                <slide class="show-all-poster" v-if="!loading">
                    <nuxt-link to="/tv-shows/popular">
                        <div class="carousel-with-poster-image">
                            <img src="/show-all-poster.jpg" />
                        </div>
                        <h4>
                            Show All
                            <b-icon-caret-right-fill></b-icon-caret-right-fill>
                        </h4>
                    </nuxt-link>
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
        </div>
    </b-overlay>
</template>



<script>
    import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';
    import 'hooper/dist/hooper.css';
    import ListTvCarouselItem from "./ListTvCarouselItem";

    export default {
        name: 'ListTvCarousel',
        components: {
            Hooper,
            Slide,
            ListTvCarouselItem,
            HooperNavigation
        },
        props: {
            tvShows: {
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
                            itemsToSlide: 5
                        }
                    }
                },
            }
        }
    }
</script>