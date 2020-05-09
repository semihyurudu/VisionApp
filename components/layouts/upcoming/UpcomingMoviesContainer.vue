<template>
    <div class="upcoming-movies">
        <b-container>
            <b-row>
                <b-col col>
                    <BlockTitle title="Upcoming Movies" />
                    <Carousel
                            :items="upcomingMovies"
                            :loading="upcomingMoviesLoading"
                            show-all-link="/movie/upcoming"
                            type="movie"
                    />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { helper } from '../../../mixins/helper.js';
    import Carousel from "../../partials/carousel/Carousel";
    import BlockTitle from "../../partials/BlockTitle";
    export default {
        name: 'upcomingMoviesOfWeekContainer',
        mixins: [helper],
        components: {
            BlockTitle,
            Carousel,
        },
        data() {
            return {
                upcomingMovies: [],
                upcomingMoviesLoading: true,
                BlockTitle
            }
        },
        methods: {
            getUpcomingMovies(page) {
                fetch(this.getUpcomingMoviesUrl(page))
                    .then((res) => { return res.json() })
                    .then((res) => {
                        this.upcomingMovies = res.results.filter((x) => {
                            return x['poster_path'] && x['title'];
                        });
                        this.upcomingMoviesLoading = false;
                    })
            },
        },
        mounted() {
            this.getUpcomingMovies(1);
        }
    }
</script>
