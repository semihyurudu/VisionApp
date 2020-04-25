<template>
    <div>
        <loading :active.sync="isLoading"
                 :can-cancel="false"
                 :is-full-page="true">
        </loading>

        <div v-if="!isLoading">
            <div class="movie-or-tv-item">
                <div class="movie-or-tv-item-bg" :style=getBackdrop>
                    <div class="movie-or-tv-item-bg-field" :style=getBackdropColor>
                        <div class="movie-or-tv-item-content">
                            <b-container>
                                <b-row>
                                    <b-col lg="4">
                                        <div class="movie-or-tv-item-content-poster">
                                            <img :src="getPoster"/>
                                        </div>
                                    </b-col>
                                    <b-col lg="8" class="movie-or-tv-item-content-table">
                                        <div class="movie-or-tv-item-content-details">
                                            <h1>{{movie['title']}}
                                                <span v-if="movie['release_date']">
                        ({{this.getYearFromString(movie['release_date'])}})
                      </span>
                                            </h1>
                                            <ul>
                                                <li v-if="movie['release_date']">
                                                    {{movie['release_date']}}
                                                </li>
                                                <li v-if="movie['genres']">
                        <span v-for="(genre, index) in movie['genres']">
                          <nuxt-link :to="getGenreUrl(genre.id)">
                            {{genre['name']}}<span v-if="(index+1) !== movie['genres'].length">,</span>
                          </nuxt-link>
                        </span>
                                                </li>
                                            </ul>

                                            <div class="movie-or-tv-item-percentage">
                                                <PercentageCircle
                                                        :percent="getPercentage(movie['vote_average'])"
                                                        size="small"
                                                        active-color="orange"
                                                        complete-color="orange"
                                                />
                                                <span class="score-title">
                        User<br/>Score
                      </span>
                                            </div>

                                            <div class="movie-or-tv-item-overview" v-if="movie['overview']">
                                                <h5>Overview</h5>
                                                <p>{{movie['overview']}}</p>
                                            </div>

                                            <div class="movie-or-tv-item-crew" v-if="crew">
                                                <b-row>
                                                    <b-col lg="4" v-for="(crewItem, index) in crew" :key="index">
                                                        <CrewItem :crew="crewItem"/>
                                                    </b-col>
                                                </b-row>
                                            </div>

                                        </div>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </div>
                    </div>
                </div>
            </div>

            <b-container>
                <b-row>
                    <b-col lg="9">
                        <div class="carousel-container">
                            <h4>Cast</h4>
                            <CastCarousel :cast="cast" :loading="castLoading"/>
                        </div>
                    </b-col>
                    <b-col lg="3">
                        <SidebarTitleDescription title="Status" :description="movie['status']"/>
                        <SidebarTitleDescription title="Original Language"
                                                 :description="getLanguageFromCode(movie['original_language'])"/>
                        <SidebarTitleDescription title="Budget" :description="getBudget(movie['budget'])"/>
                        <SidebarTitleDescription title="Revenue" :description="formatMoney(movie['revenue'])"
                                                 v-if="movie['revenue']"/>

                        <div class="keywords-item">
                            <span><b>Keywords</b></span><br/>
                            <Keywords :keywords="keywords"/>
                        </div>

                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    import {helper} from '../../mixins/helper.js';
    import PercentageCircle from '../../node_modules/vue-css-percentage-circle';
    import CrewItem from "../../components/partials/crew/CrewItem";
    import CastCarousel from "../../components/layouts/cast/CastCarousel";
    import SidebarTitleDescription from "../../components/partials/SidebarTitleDescription";
    import Keywords from "../../components/partials/Keywords";
    import Loading from '../../node_modules/vue-loading-overlay';

    export default {
        name: 'MovieItem',
        mixins: [helper],
        components: {
            PercentageCircle,
            CrewItem,
            CastCarousel,
            SidebarTitleDescription,
            Keywords,
            Loading
        },
        methods: {
            getMovieDetail() {
                fetch(this.getMovieDetailsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.movie = res;
                        this.isLoading = false;
                    })
            },
            getGenreUrl(id) {
                return '/genre/' + id;
            },
            getPercentage(ratio) {
                return ratio * 10;
            },
            getCredits() {
                fetch(this.getMovieCreditsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.cast = res.cast;
                        this.crew = res.crew;
                        this.castLoading = false;
                    })
            },
            getKeywords() {
                fetch(this.getMovieKeywordsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.keywords = res.keywords;
                    })
            },
        },
        computed: {
            getBackdrop() {
                let style = '';

                if (this.movie['backdrop_path'])
                    style = `background-image: url(${this.getBackdropPath() + this.movie['backdrop_path']})`;

                return style;
            },
            getBackdropColor() {
                return 'background-image:' + this.getRandomBackdropColor();
            },
            getPoster() {
                let image = '';

                if (this.movie['poster_path'])
                    image = this.getPosterPath() + this.movie['poster_path'];

                return image;
            }
        },
        data() {
            return {
                movie: {},
                crew: [],
                cast: [],
                castLoading: true,
                keywords: [],
                isLoading: true
            }
        },
        created() {
            this.getMovieDetail();
            this.getCredits();
            this.getKeywords();
        }
    }
</script>

<style scoped>
    .movie-or-tv-item {
        position: relative;
        color: #fff;
    }

    .movie-or-tv-item-content {
        width: 100%;
    }

    .movie-or-tv-item-bg {
        border-bottom: 1px solid rgba(21.57%, 12.55%, 26.86%, 1.00);
        background-position: right -200px top;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: 50px;
    }

    .movie-or-tv-item-bg-field {
        background-image: linear-gradient(to right, rgb(50, 63, 68) 150px, rgba(115, 115, 115, 0.84) 100%);
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .keywords-item {
        margin-bottom: 20px;
    }
</style>
