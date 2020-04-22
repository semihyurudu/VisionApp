<template>
  <div id="app">
    <Header />
    <main class="homepage">
      <HomeSearch />
    </main>
    <ListMovies :movies=movies />
  </div>
</template>

<script>
  import Header from '../components/layouts/Header';
  import ListMovies from '../components/layouts/ListMovies';
  import HomeSearch from '../components/layouts/HomeSearch';
  import { helper } from '../mixins/helper.js';
  export default {
      components: {
          Header,
          ListMovies,
          HomeSearch
      },
      mixins: [helper],
      methods: {
          getMovies() {
              fetch(this.getMoviesUrl)
                  .then((res) => { return res.json() })
                  .then((res) => {
                      this.movies = res.results;
                  })
          }
      },
      data() {
        return {
            movies: []
        }
      },
      created() {
          this.getMovies();
      },
      computed: {
          getMoviesUrl() {
              return 'https://api.themoviedb.org/3/movie/top_rated?api_key=1b3c8e5cc36a460bb507fea55c7f8f56&language=tr-TR'
          }
      }
  }
</script>

<style>

</style>
