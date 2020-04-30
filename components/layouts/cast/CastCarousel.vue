<template>
    <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
        <div class="list-movies-carousel carousel-with-poster" v-if="!loading && cast.length > 0">
            <hooper :settings="hooperSettings">
                <slide v-for="(castItem, index) in cast" :key="index" :index="index">
                    <CastCarouselItem :cast-item="castItem" />
                </slide>
                <hooper-navigation slot="hooper-addons"></hooper-navigation>
            </hooper>
        </div>
        <span class="text-dark" v-if="!loading && cast.length < 1">
            We don't have any cast.
        </span>
    </b-overlay>
</template>


<script>
    import {Hooper, Slide, Navigation as HooperNavigation} from 'hooper';
    import 'hooper/dist/hooper.css';
    import CastCarouselItem from "./CastCarouselItem";

    export default {
        name: 'CastCarousel',
        components: {
            Hooper,
            Slide,
            CastCarouselItem,
            HooperNavigation
        },
        props: {
            cast: {
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