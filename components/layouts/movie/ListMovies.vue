<template>
  <div class="list-movies">
    <b-container>
      <b-row>
        <b-col col md="4" v-for="(movie, index) in movies" :key="index">
          <ListMovieItem :movie=movie></ListMovieItem>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import ListMovieItem from "./ListMovieItem";
  import { helper } from '@/mixins/helper.js';

  export default {
      name: 'ListMovies',
      mixins: [helper],
      components: {
          ListMovieItem
      },
      data() {
        return {
          movies: []
        }
      },
      mounted() {
          this.fetchData();
      },
    methods: {
        fetchData() {
          console.log('api url', this.popularMoviesUrl(1))
          fetch(this.popularMoviesUrl(1))
            .then((res) => {
              return res.json()
            })
            .then((res) => {
              console.log('res', res)
            })
        }
    }
  }
</script>
