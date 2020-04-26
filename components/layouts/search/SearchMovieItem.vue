<template>
  <div class="search-movie-item">
    <ul>
      <li v-for="(movie, index) in movies" :key="index">
        <nuxt-link :to="getMovieLink(movie.id)">
          <img :src="getPoster(movie['poster_path'])" />
        </nuxt-link>
        <div class="search-movie-item-content">
          <div>
            <h4>
              <nuxt-link :to="getMovieLink(movie.id)">
                {{movie['original_title']}}
              </nuxt-link>
            </h4>
            <h6>{{movie['release_date']}}</h6>
            <p>
              {{substringWithWords(movie['overview'], 250)}}...
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    import { helper } from '@/mixins/helper.js';
    export default {
      name: 'SearchMovieItem',
      data() {
          return {

          }
      },
      mixins: [helper],
      props: {
        movies: {
            type: Array,
            required: true
        }
      },
      methods: {
          getPoster(path) {
              let url = '';
              if(path && path !== '') {
                  url = this.getSmallPosterPath() + path;
              } else {
                  url = '/default_poster.png';
              }

              return url;
          },
          getMovieLink(id) {
            return '/movie/' + id;
          }
      },
      mounted() {

      }
  }
</script>

<style scoped>
  .search-movie-item ul {
    padding-left: 0;
    float: left;
    width: 100%;
  }

  .search-movie-item ul li {
    list-style-type: none;
    float: left;
    width: 100%;
    margin-bottom: 30px;
    height: 200px;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  }


  .search-movie-item ul li img {
    float: left;
    height: 100%;
    width: 133px;
    border-right: 1px solid #e2e2e2;
  }

  .search-movie-item-content {
    float: right;
    width: calc(100% - 133px);
    height: 100%;
    display: table;
    padding: 15px;
  }

  .search-movie-item-content > div {
    display: table-cell;
    vertical-align: middle;
  }

  .search-movie-item-content > div h4 {
    font-weight: 500;
  }

  .search-movie-item-content > div h4 a {
    color: #444444;
    text-decoration: none;
  }

  .search-movie-item-content > div h6 {
    color: #6d6d6d;
    margin-bottom: 20px;
  }

  .search-movie-item-content > div p {
    margin-bottom: 0;
    font-size: 16px;
  }
</style>
