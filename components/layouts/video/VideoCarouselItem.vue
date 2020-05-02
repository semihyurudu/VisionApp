<template>
    <iframe class="video-carousel-item" :src="getYoutubeIframe(video['key'])" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</template>

<script>
    import {helper} from '../../../mixins/helper.js';
    export default {
        name: 'VideoCarouselItem',
        mixins: [helper],
        props: {
            video: {
                type: Object,
                required: true
            }
        }
    }
</script>