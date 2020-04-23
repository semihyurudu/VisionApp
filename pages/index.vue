<template>
  <div id="app">
    <main class="homepage">
      <HomeSearch />
    </main>

    <WhatIsPopular />
  </div>
</template>

<script>
  import Header from '../components/layouts/Header';
  import HomeSearch from '../components/layouts/search/HomeSearch';
  import WhatIsPopular from "../components/layouts/what-is-popular/WhatIsPopular";
  import { helper } from '../mixins/helper.js';
  export default {
      components: {
          Header,
          HomeSearch,
          WhatIsPopular
      },
      mixins: [helper],
      methods: {

      },
      computed: {

      },
      data() {
        return {
            movies: []
        }
      }
  }
</script>

<style>

</style>
