<template>
  <div class="list-tv-shows-item">
    <nuxt-link :to="getMovieUrl">
    <img :src="getPoster" />
    <div class="list-tv-shows-item-content">
      <h3><span>{{tv['name']}}</span></h3>
      <div class="list-tv-shows-item-summary">
        <span>{{substringWithWords(tv['overview'], 80)}}...</span>
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
          tv: {
              type: Object,
              required: true
          }
      },
      computed: {
          getMovieUrl() {
              return `/tv/${this.tv.id}`;
          },
          getPoster() {
              let image = '';

              if(this.tv['poster_path']) {
                image = this.getPosterPath() + this.tv['poster_path'];
              } else {
                image = '/default_poster.png';
              }

              return image;
          }
      }
  }
</script>

<style scoped>
  .list-tv-shows-item {
    margin: 15px 0;
  }
  .list-tv-shows-item-content {
    background: #185d77;
    color: white;
  }
  .list-tv-shows-item-content h3 {
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
  .list-tv-shows-item-content h3 span {
    display: table-cell;
    vertical-align: middle;
  }
  .list-tv-shows-item-summary {
    padding: 10px;
    text-align: center;

    font-size: 14px;
    display: table;
    height: 105px;
  }
  .list-tv-shows-item-summary span {
    display: table-cell;
    vertical-align: middle;
  }
  .list-tv-shows-item-content {
    background: #185d77;
    color: white;
  }
  .list-tv-shows-item-content a {
    color: #fff;
    text-decoration: none;
    transition-duration: 0.2s;
  }

  .list-tv-shows-item-content a:hover h3 {
    background: #12485c;
  }

</style>
