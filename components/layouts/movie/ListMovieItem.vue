<template>
  <div class="list-movie-item">
    <nuxt-link :to="getMovieUrl">
      <div class="list-movie-item-image">
        <img :src="getPoster" />
      </div>
    <div class="list-movie-item-content">
      <h3><span>{{movie['original_title']}}</span></h3>
      <div class="list-movie-item-summary">
        <span>{{substringWithWords(movie['overview'], 80)}}...</span>
      </div>
    </div>
    </nuxt-link>
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
              let image = '';

              if(this.movie['poster_path']) {
                image = this.getPosterPath() + this.movie['poster_path'];
              } else {
                image = this.getDefaultPoster();
              }

              return image;
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
    font-size: 18px;
    transition-duration: 0.2s;
    float: left;
    width: 100%;
    height: 84px;
    display: table;
    overflow: hidden;
    border-bottom: 1px solid #12485d;
  }
  .list-movie-item-content h3 span {
    display: table-cell;
    vertical-align: middle;
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
  .list-movie-item img {
    transition-duration: 0.2s;
  }

  .list-movie-item .list-movie-item-image {
    overflow: hidden;
  }

  .list-movie-item:hover .list-movie-item-image img {
    transform: scale(1.2);
  }

</style>
