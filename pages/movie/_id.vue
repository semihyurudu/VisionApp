<template>
  <div>
    <div class="movie-item">
      <div class="movie-item-bg" :style=getBgImage></div>
      <div class="movie-item-content">
        <b-container>
          <b-row>
            <b-col col md="4">
              {{movie.name}}
            </b-col>
            <b-col col md="8">
              {{movie.summary}}
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "../../components/layouts/Header";
  export default {
      name: 'MovieItem',
      components: {
          Header
      },
      methods: {
          getMovieDetail() {
              fetch(this.getMovieUrl)
                  .then((res) => { return res.json() })
                  .then((res) => {
                      this.movie = res;
                      console.log('res', res)

                      this.movie.image = this.movie.image.replace('http://semih.black:3000/', '');
                      this.movie.image = this.movie.image.replace('http://semih.black/', '');
                      this.movie.image = 'http://semih.black/' + this.movie.image;

                  })
          }
      },
      computed: {
          getMovieUrl() {
              return `http://semih.black/json/movie/${this.$route.params.id}.json`
          },
          getBgImage() {
              return `background-image: url(${this.movie.image})`
          }
      },
      data() {
          return {
              movie: {}
          }
      },
      created() {
        this.getMovieDetail();
      }
  }
</script>

<style scoped>
  .movie-item {
    position: relative;
    color: #fff;
    min-height: 300px;
  }
  .movie-item-bg {
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-position: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .movie-item-bg:before {
    background-color: rgba(24, 93, 119, 0.6);
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .movie-item-content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
