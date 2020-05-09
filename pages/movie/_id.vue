<template>
    <main class="pt-0">
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
                                                    ({{getYearFromString(movie['release_date'])}})
                                                </span>
                                            </h1>
                                            <ul>
                                                <li class="movie-or-tv-type">
                                                    MOVIE
                                                </li>
                                                <li v-if="movie['release_date']">
                                                    {{movie['release_date']}}
                                                </li>
                                                <li v-if="movie['genres']">
                                                    <span v-for="(genre, index) in movie['genres']">
                                                      <nuxt-link :to="getGenrePageUrl('movie', genre.id, genre['name'])">
                                                        {{genre['name']}}<span
                                                              v-if="(index+1) !== movie['genres'].length">,</span>
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
                                                <span class="score-title">User<br/>Score</span>


                                                <div class="movie-or-tv-trailer" v-if="Object.entries(trailer).length > 0">
                                                    <b-button v-b-modal.trailer-modal variant="dark">
                                                        Play Trailer
                                                        <b-icon-play-fill></b-icon-play-fill>
                                                    </b-button>

                                                    <b-modal id="trailer-modal" centered :title="trailer['name']" size="lg">
                                                        <div class="embed-container">
                                                            <iframe :src="getYoutubeIframeSrc(trailer['key'])" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                                        </div>
                                                        <template v-slot:modal-footer>
                                                            <div class="w-100">
                                                                <b-button
                                                                        variant="dark"
                                                                        class="float-right"
                                                                        @click="$bvModal.hide('trailer-modal')"
                                                                >
                                                                    Close
                                                                </b-button>
                                                            </div>
                                                        </template>
                                                    </b-modal>

                                                </div>

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
                    <b-col xl="9">
                        <div class="carousel-container">
                            <BlockTitle title="Cast" />
                            <Carousel
                                    :items="cast"
                                    :loading="castLoading"
                                    type="cast"
                            />
                        </div>

                        <div class="carousel-container" v-if="videosLength > 0">
                            <BlockTitle title="Videos" />

                            <Carousel
                                    :items="videos"
                                    :loading="false"
                                    type="video"
                                    :breakpoints="videosBreakpoints"
                            />
                        </div>

                        <div class="carousel-container">
                            <BlockTitle title="Similar Movies" />
                            <Carousel
                                    :items="similarMovies"
                                    :loading="similarMoviesLoading"
                                    type="movie"
                            />
                        </div>

                        <div class="carousel-container">
                            <BlockTitle title="Recommendations" />
                            <Carousel
                                    :items="recommendationMovies"
                                    :loading="recommendationMoviesLoading"
                                    type="movie"
                            />
                        </div>


                        <div class="reviews-container">
                            <BlockTitle title="Reviews" />
                            <Reviews type="movie" />
                        </div>


                    </b-col>
                    <b-col xl="3">
                        <SidebarTitleDescription title="Status" :description="movie['status']"/>
                        <SidebarTitleDescription title="Original Language"
                                                 :description="getLanguageFromCode(movie['original_language'])"/>
                        <SidebarTitleDescription title="Budget" :description="getBudget(movie['budget'])"/>
                        <SidebarTitleDescription title="Revenue" :description="formatMoney(movie['revenue'])"
                                                 v-if="movie['revenue']"/>

                        <div class="keywords-container">
                            <span><b>Keywords</b></span><br/>
                            <Keywords :keywords="keywords" :loading="keywordsLoading" />
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </main>
</template>

<script>
    import {helper} from '../../mixins/helper.js';
    import PercentageCircle from '../../node_modules/vue-css-percentage-circle';
    import CrewItem from "../../components/partials/crew/CrewItem";
    import SidebarTitleDescription from "../../components/partials/SidebarTitleDescription";
    import Keywords from "../../components/partials/Keywords";
    import Loading from '../../node_modules/vue-loading-overlay';
    import Carousel from "../../components/partials/carousel/Carousel";
    import Reviews from "../../components/layouts/reviews/Reviews";
    import BlockTitle from "../../components/partials/BlockTitle";

    export default {
        name: 'MovieItem',
        mixins: [helper],
        components: {
            Carousel,
            PercentageCircle,
            CrewItem,
            SidebarTitleDescription,
            Keywords,
            Loading,
            Reviews,
            BlockTitle
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
            getCredits() {
                fetch(this.getCreditsUrl('movie', this.$route.params.id))
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
                fetch(this.getKeywordsUrl('movie', this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.keywords = res.keywords;
                        this.keywordsLoading = false;
                    })
            },
            getSimilarMovies() {
                fetch(this.getSimilarMoviesUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.similarMovies = res.results;
                        this.similarMoviesLoading = false;
                    })
            },
            getRecommendationMovies() {
                fetch(this.getRecommendationMoviesUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.recommendationMovies = res.results;
                        this.recommendationMoviesLoading = false;
                    })
            },
            getVideos() {
                fetch(this.getVideosUrl('movie', this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        if(res.results.length > 0) {
                            this.videos = res.results.filter((x) => {
                                return x['site'] === 'YouTube';
                            });
                            this.videosLoading = false;
                            let length = this.videos.length;

                            switch (length) {
                                case 0:
                                case 1:
                                case 2:
                                    break;
                                default:
                                    length = 2.3;
                                    break;
                            }

                            this.videosBreakpoints[1140]['itemsToShow'] = length;
                            this.videosBreakpoints[1140]['itemsToSlide'] = Math.floor(length);
                            this.videosLength = length;

                            let trailer;

                            trailer = res.results.filter((x) => {
                                return (x['type'] === 'Trailer' && x['site'] === 'YouTube');
                            });

                            if (trailer.length > 0) {
                                trailer = trailer[0];
                            }

                            this.trailer = trailer;
                        }
                    })
            }
        },
        computed: {
            getBackdrop() {
                let style = '';

                if (this.movie['backdrop_path'])
                    style = `background-image: url(${this.getBackdropPath() + this.movie['backdrop_path']})`;

                return style;
            },
            getBackdropColor() {
                let style = 'background-image: linear-gradient(to right, #949494 150px, #949494 100%)';

                if (this.movie['backdrop_path'])
                    style = 'background-image:' + this.getRandomBackdropColor();

                return style;
            },
            getPoster() {
                let image = '';

                if (this.movie['poster_path'])
                    image = this.getPosterPath() + this.movie['poster_path'];
                else
                    image = this.getDefaultPoster();

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
                keywordsLoading: true,
                isLoading: true,
                videos: [],
                videosLoading: true,
                videosLength: 0,
                videosBreakpoints: {
                    0: {
                        itemsToShow: 1,
                        itemsToSlide: 1
                    },
                    1140: {
                        itemsToShow: this.videosLength,
                        itemsToSlide: Math.floor(this.videosLength)
                    }
                },
                trailer: {},
                similarMovies: [],
                similarMoviesLoading: true,
                recommendationMovies: [],
                recommendationMoviesLoading: true
            }
        },
        created() {
            this.getMovieDetail();
            this.getCredits();
            this.getKeywords();
            this.getVideos();
            this.getSimilarMovies();
            this.getRecommendationMovies();
        },
        head() {
            return {
                title: this.getHeadTitle(this.movie['title'])
            }
        }
    }
</script>
