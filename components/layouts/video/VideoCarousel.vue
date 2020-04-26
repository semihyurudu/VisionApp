<template>
    <div class="videos-carousel">
        <hooper :settings="hooperSettings">
            <slide v-for="(video, index) in videos" :key="index">
                <iframe :src="getYoutubeIframe(video['key'])" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </slide>
        </hooper>
    </div>
</template>

<script>
    import {Hooper, Slide} from 'hooper';
    import 'hooper/dist/hooper.css';
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'VideoCarousel',
        mixins: [helper],
        components: {
            Hooper,
            Slide
        },
        props: {
            itemsToShow: {
                type: [String, Number],
                required: false,
                default() {
                    return 2.2;
                }
            },
            videos: {
                type: Array,
                required: true,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                hooperSettings: {
                    centerMode: false,
                    infiniteScroll: (this.itemsToShow > 2),
                    autoPlay: true,
                    playSpeed: 5000,
                    mouseDrag: (this.itemsToShow > 2),
                    touchDrag: (this.itemsToShow > 2),
                    wheelControl: false,
                    trimWhiteSpace: true,
                    pagination: 'fraction',
                    breakpoints: {
                        0: {
                            itemsToShow: 1
                        },
                        1140: {
                            itemsToShow: this.itemsToShow,
                        }
                    }
                },
            }
        },
        mounted() {
            console.log(this.itemsToShow)
        }
    }
</script>

<style scoped>

</style>