<template>
  <div class="list-movie-item">
    <img :src="getPoster" />
    <div class="list-movie-item-content">
      <nuxt-link :to="getMovieUrl">
        <h3>{{movie['original_title']}}</h3>
      </nuxt-link>

      <div class="list-movie-item-summary">
        <span>{{substringWithWords(movie['overview'], 150)}}...</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { helper } from '@/mixins/helper.js';
  export default {
      name: 'ListMovieItem',
      mixins: [helper],
      props: {
          movie: {
              type: Object,
              required: true
          }
      },
      computed: {
          getMovieUrl() {
              return `/movie/${this.movie.id}`;
          },
          getPoster() {
              return this.getPosterPath() + this.movie['poster_path']
          }
      }
  }
</script>

<style scoped>
  .list-movie-item {
    margin: 15px 0;
  }
  .list-movie-item-content {
    background: #185d77;
    color: white;
  }
  .list-movie-item-content h3 {
    padding: 10px;
    text-align: center;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 25px;
    transition-duration: 0.2s;
    float:left;
    width: 100%;
    border-bottom: 1px solid #12485d;
  }
  .list-movie-item-summary {
    padding: 10px;
    text-align: center;

    font-size: 14px;
    display: table;
    height: 105px;
  }
  .list-movie-item-summary span {
    display: table-cell;
    vertical-align: middle;
  }
  .list-movie-item-content {
    background: #185d77;
    color: white;
  }
  .list-movie-item-content a {
    color: #fff;
    text-decoration: none;
    transition-duration: 0.2s;
  }

  .list-movie-item-content a:hover h3 {
    background: #12485c;
  }

</style>
