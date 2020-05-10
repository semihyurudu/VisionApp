<template>
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
                    complete-color="orange"
            />
        </div>
    </nuxt-link>
</template>

<script>
    import PercentageCircle from '../../../node_modules/vue-css-percentage-circle';
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'ListMoviesCarouselItem',
        components: {
            PercentageCircle
        },
        mixins: [helper],
        props: {
            movie: {
                type: Object,
                required: true
            }
        },
        methods: {
            getMoviePoster(path) {
                let image = '';

                if(path) {
                    image = this.getPosterPath() + path;
                } else {
                    image = this.getDefaultPoster();
                }

                return image;
            },
            getMovieLink(id) {
                return '/movie/' + id;
            },
            getPercentage(ratio) {
                return ratio * 10;
            }
        },
    }
</script>