<template>
  <div class="search-tv-item">
    <ul>
      <li v-for="(item, index) in tv" :key="index">
        <nuxt-link :to="getTvLink(item.id)">
         <img :src="getPoster(item['poster_path'])" />
        </nuxt-link>
        <div class="search-tv-item-content">
          <div>
            <h4>
              <nuxt-link :to="getTvLink(item.id)">
                {{item['original_name']}}
              </nuxt-link>
            </h4>
            <h6>{{item['first_air_date']}}</h6>
            <p>
              {{substringWithWords(item['overview'], 150)}}...
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
      name: 'SearchTvItem',
      data() {
          return {

          }
      },
      mixins: [helper],
      props: {
        tv: {
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
                  url = this.getDefaultPoster();
              }

              return url;
          },
          getTvLink(id) {
            return '/tv/' + id;
          }
      },
      mounted() {

      }
  }
</script>

<style scoped>
  .search-tv-item ul {
    padding-left: 0;
    float: left;
    width: 100%;
  }

  .search-tv-item ul li {
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


  .search-tv-item ul li img {
    float: left;
    height: 100%;
    width: 133px;
    border-right: 1px solid #e2e2e2;
  }

  .search-tv-item-content {
    float: right;
    width: calc(100% - 133px);
    height: 100%;
    display: table;
    padding: 15px;
  }

  .search-tv-item-content > div {
    display: table-cell;
    vertical-align: middle;
  }

  .search-tv-item-content > div h4 {
    font-weight: 500;
  }

  .search-tv-item-content > div h4 a {
    color: #444444;
    text-decoration: none;
  }

  .search-tv-item-content > div h6 {
    color: #6d6d6d;
    margin-bottom: 20px;
  }

  .search-tv-item-content > div p {
    margin-bottom: 0;
    font-size: 16px;
  }
</style>
