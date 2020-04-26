<template>
    <nuxt-link :to="getTvLink(tv['id'])">
        <div class="carousel-with-poster-image">
            <img :src="getPoster(tv['poster_path'])" />
        </div>

        <div class="carousel-with-poster-content">
            <h4>{{tv['name']}}</h4>
            <h6>{{tv['first_air_date']}}</h6>
            <PercentageCircle
                    :percent="getPercentage(tv['vote_average'])"
                    size="small"
                    active-color="orange"
                    complete-color="orange"
            />
        </div>
    </nuxt-link>
</template>

<script>
    import { helper } from '../../../mixins/helper.js';
    import PercentageCircle from '../../../node_modules/vue-css-percentage-circle';

    export default {
        name: 'ListTvCarouselItem',
        mixins: [helper],
        components: {
            PercentageCircle
        },
        props: {
            tv: {
                type: Object,
                required: true
            }
        },
        methods: {
            getPoster(path) {
                return this.getSmallPosterPath() + path;
            },
            getTvLink(id) {
                return '/tv/' + id;
            },
            getPercentage(ratio) {
                return ratio * 10;
            }
        }
    }
</script>