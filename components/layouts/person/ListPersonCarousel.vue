<template>
    <b-overlay :show="loading" rounded="sm">
        <div class="list-person-carousel carousel-with-poster">
            <hooper :settings="hooperSettings" v-if="!loading">

                <slide v-for="(person, index) in peoples" :key="index" :index="index">
                    <ListPersonCarouselItem :person="person" />
                </slide>

                <slide class="show-all-poster" v-if="!loading">
                    <nuxt-link to="/person/popular">
                        <div class="carousel-with-poster-image">
                            <img src="/show-all-poster.jpg" />
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
    import { Hooper, Slide } from 'hooper';
    import 'hooper/dist/hooper.css';
    import ListPersonCarouselItem from "./ListPersonCarouselItem";

    export default {
        name: 'ListTvCarousel',
        components: {
            Hooper,
            Slide,
            ListPersonCarouselItem
        },
        props: {
            peoples: {
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
            getProfileImage(path) {
                return this.getMediumProfilePath() + path;
            },
            getPersonLink(id) {
                return '/person/' + id;
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
                    playSpeed: 3000,
                    mouseDrag: true,
                    touchDrag: true,
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