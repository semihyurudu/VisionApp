<template>
    <main id="app" class="pt-0">

        <loading :active.sync="isLoading"
                 :can-cancel="false"
                 :is-full-page="true">
        </loading>

        <div v-if="!isLoading">
            <div class="homepage">

                <HomeSearch/>

                <WhatIsPopularCarouselContainer/>

                <div class=" black-image-bg">
                    <TrendingCarouselContainer/>
                </div>

                <UpcomingMoviesContainer style="margin-top: 50px"/>

            </div>
        </div>
    </main>
</template>

<script>
    import Header from '../components/layouts/Header';
    import HomeSearch from '../components/layouts/search/HomeSearch';
    import WhatIsPopularCarouselContainer from "../components/layouts/what-is-popular/WhatIsPopularCarouselContainer";
    import TrendingCarouselContainer from "../components/layouts/trending/TrendingCarouselContainer";
    import UpcomingMoviesContainer from "../components/layouts/upcoming/UpcomingMoviesContainer";
    import {helper} from '../mixins/helper.js';
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        components: {
            Header,
            HomeSearch,
            WhatIsPopularCarouselContainer,
            TrendingCarouselContainer,
            Loading,
            UpcomingMoviesContainer
        },
        mixins: [helper],

        data() {
            return {
                isLoading: true
            }
        },
        mounted() {
            setTimeout(() => {

                this.isLoading = false;
            }, 500)
        },
        head() {
            return {
                title: this.getHeadTitle()
            }
        }
    }
</script>