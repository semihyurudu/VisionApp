<template>
    <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
        <div class="carousel carousel-with-poster">
            <hooper :settings="hooperSettings" v-if="!loading">
                <slot />
                <slide class="show-all-poster" v-if="!loading && this.showAllLink">
                    <nuxt-link :to="this.showAllLink">
                        <div class="carousel-with-poster-image">
                            <img :src="showAllPoster" />
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
    import { helper } from '../../../mixins/helper.js';
    import {Hooper, Slide, Navigation as HooperNavigation} from 'hooper';
    import 'hooper/dist/hooper.css';
    import ListMoviesCarouselItem from "../../layouts/movie/ListMoviesCarouselItem";
    import ListTvCarouselItem from "../../layouts/tv/ListTvCarouselItem";
    import ListPersonCarouselItem from "../../layouts/person/ListPersonCarouselItem";
    import VideoCarouselItem from "../../layouts/video/VideoCarouselItem";
    import CastCarouselItem from "../../layouts/cast/CastCarouselItem";

    export default {
        name: 'CarouselSlider',
        mixins: [helper],
        components: {
            Hooper,
            Slide,
            HooperNavigation,
            ListMoviesCarouselItem,
            ListTvCarouselItem,
            ListPersonCarouselItem,
            VideoCarouselItem,
            CastCarouselItem
        },
        computed: {
            showAllPoster() {
                return this.getShowAllPoster()
            }
        },
        props: {

            loading: {
                type: Boolean,
                required: true,
                default() {
                    return true;
                }
            },
            showAllLink: {
                type: String,
                required: false
            },
            centerMode: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            },
            infiniteScroll: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            },
            autoPlay: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            },
            playSpeed: {
                type: Number,
                required: false,
                default() {
                    return 3000;
                }
            },
            mouseDrag: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            },
            touchDrag: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            },
            wheelControl: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            },
            trimWhiteSpace: {
                type: Boolean,
                required: false,
                default() {
                    return true;
                }
            },
            breakpoints: {
                type: Object,
                required: false,
                default() {
                    return {
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
                        1025: {
                            itemsToShow: 4.3,
                            itemsToSlide: 4
                        }
                    }
                }
            }
        },
        data() {
            return {
                hooperSettings: {
                    centerMode: this.centerMode,
                    infiniteScroll: this.infiniteScroll,
                    autoPlay: this.autoPlay,
                    playSpeed: this.playSpeed,
                    mouseDrag: this.mouseDrag,
                    touchDrag: this.touchDrag,
                    wheelControl: this.wheelControl,
                    trimWhiteSpace: this.trimWhiteSpace,
                    breakpoints: this.breakpoints
                },
            }
        }
    }
</script>