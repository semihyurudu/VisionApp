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
  export default {
      name: 'ListMovies',
      props: {
          movies: {
              type: Array,
              required: true
          }
      },
      components: {
          ListMovieItem
      }
  }
</script>
