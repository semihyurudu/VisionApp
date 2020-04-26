<template>
    <nuxt-link :to="getPersonLink(castItem['id'])">
        <div class="carousel-with-poster-image">
            <img :src="getProfileImage(castItem['profile_path'])"/>
        </div>

        <div class="carousel-with-poster-content">
            <h4>{{castItem['name']}}</h4>
            <h6>{{castItem['character']}}</h6>
        </div>
    </nuxt-link>
</template>

<script>
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'CastCarouselItem',
        mixins: [helper],
        props: {
            castItem: {
                type: Object,
                required: true
            }
        },
        methods: {
            getProfileImage(path) {
                let image = '';

                if(path) {
                    image = this.getSmallPosterPath() + path;
                } else {
                    image = '/default_poster.png';
                }

                return image;
            },
            getPersonLink(id) {
                return '/person/' + id;
            },
            getPercentage(ratio) {
                return ratio * 10;
            }
        },
    }
</script>