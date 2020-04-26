<template>
  <div id="app">

    <loading :active.sync="isLoading"
             :can-cancel="false"
             :is-full-page="true">
    </loading>

    <div v-if="!isLoading">
      <main class="homepage">
        <HomeSearch />
      </main>

      <WhatIsPopularCarouselContainer />
      <TrendingCarouselContainer />
    </div>
  </div>
</template>

<script>
  import Header from '../components/layouts/Header';
  import HomeSearch from '../components/layouts/search/HomeSearch';
  import WhatIsPopularCarouselContainer from "../components/layouts/what-is-popular/WhatIsPopularCarouselContainer";
  import TrendingCarouselContainer from "../components/layouts/trending/TrendingCarouselContainer";
  import { helper } from '../mixins/helper.js';
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  export default {
      components: {
          Header,
          HomeSearch,
          WhatIsPopularCarouselContainer,
          TrendingCarouselContainer,
          Loading
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
    }
  }
</script>