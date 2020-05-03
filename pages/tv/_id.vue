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
                                            <h1>{{tv['name']}}
                                                <span v-if="tv['first_air_date']">
                                                    ({{getYearFromString(tv['first_air_date'])}})
                                                </span>
                                            </h1>
                                            <ul>
                                                <li class="movie-or-tv-type">
                                                    TV
                                                </li>
                                                <li v-if="tv['first_air_date']">
                                                    {{tv['first_air_date']}}
                                                </li>
                                                <li v-if="tv['genres']">
                                                    <span v-for="(genre, index) in tv['genres']">
                                                      <nuxt-link :to="getGenrePageUrl('movie', genre.id, genre['name'])">
                                                        {{genre['name']}}<span
                                                              v-if="(index+1) !== tv['genres'].length">,</span>
                                                      </nuxt-link>
                                                    </span>
                                                </li>
                                            </ul>

                                            <div class="movie-or-tv-item-percentage">
                                                <PercentageCircle
                                                        :percent="getPercentage(tv['vote_average'])"
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

                                            <div class="movie-or-tv-item-overview" v-if="tv['overview']">
                                                <h5>Overview</h5>
                                                <p>{{tv['overview']}}</p>
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
                            <BlockTitle title="Similar TV Shows" />
                            <Carousel
                                    :items="similarTvShows"
                                    :loading="similarTvShowsLoading"
                                    type="tv"
                            />
                        </div>

                        <div class="carousel-container">
                            <BlockTitle title="Recommendations" />
                            <Carousel
                                    :items="recommendationTvShows"
                                    :loading="recommendationTvShowsLoading"
                                    type="tv"
                            />
                        </div>

                        <div class="reviews-container">
                            <BlockTitle title="Reviews" />
                            <Reviews type="tv" />
                        </div>

                    </b-col>
                    <b-col xl="3">
                        <SidebarTitleDescription title="Type" :description="tv['type']"/>
                        <SidebarTitleDescription title="Status" :description="tv['status']"/>
                        <SidebarTitleDescription title="Original Language"
                                                 :description="getLanguageFromCode(tv['original_language'])"
                        />

                        <div class="networks-container" v-if="tv['networks'].length > 0">
                            <span><b>Network</b></span><br />
                            <div class="networks-item" v-for="(item, index) in tv['networks']" :key="index">
                                <img
                                        :src="getNetworkLogo(item['logo_path'])"
                                        :alt="item['name']"
                                        :title="item['name']"
                                />
                            </div>
                        </div>

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
        name: 'TvItem',
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
        computed: {
            getBackdrop() {
                let style = '';

                if (this.tv['backdrop_path'])
                    style = `background-image: url(${this.getBackdropPath() + this.tv['backdrop_path']})`;

                return style;
            },
            getBackdropColor() {
                let style = 'background-image: linear-gradient(to right, #949494 150px, #949494 100%)';

                if (this.tv['backdrop_path'])
                    style = 'background-image:' + this.getRandomBackdropColor();

                return style;
            },
            getPoster() {
                let image = '';

                if (this.tv['poster_path'])
                    image = this.getPosterPath() + this.tv['poster_path'];
                else
                    image = '/default_poster.png';

                return image;
            },

        },
        methods: {
            getNetworkLogo(image) {
                return this.getNetworkLogoPath() + image;
            },
            getDetails() {
                fetch(this.getTvDetailsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.tv = res;
                        this.isLoading = false;
                    })
            },
            getVideos() {
                fetch(this.getVideosUrl('tv', this.$route.params.id))
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
            },
            getCredits() {
                fetch(this.getCreditsUrl('tv', this.$route.params.id))
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
                fetch(this.getKeywordsUrl('tv', this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.keywords = res.results;
                        this.keywordsLoading = false;
                        console.log('key', this.keywords, res.keywords)
                    })
            },
            getSimilarTvShows() {
                fetch(this.getSimilarTvShowsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.similarTvShows = res.results;
                        this.similarTvShowsLoading = false;
                    })
            },
            getRecommendationTvShows() {
                fetch(this.getRecommendationTvShowsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.recommendationTvShows = res.results;
                        this.recommendationTvShowsLoading = false;
                    })
            }
        },
        data() {
            return {
                tv: {},
                isLoading: true,
                crew: [],
                cast: [],
                castLoading: true,
                keywords: [],
                keywordsLoading: true,
                trailer: {},
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
                similarTvShows: [],
                similarTvShowsLoading: true,
                recommendationTvShows: [],
                recommendationTvShowsLoading: true
            }
        },
        created() {
            this.getDetails();
            this.getVideos();
            this.getCredits();
            this.getKeywords();
            this.getSimilarTvShows();
            this.getRecommendationTvShows();
        }
    }
</script>

<style scoped>
    .networks-container {
        margin-bottom: 20px;
        float: left;
        width: 100%;
    }
    .networks-item {
        float: left;
        margin: 5px 15px 10px 0;
    }

    .networks-item img {
        height: 25px;
    }
</style>