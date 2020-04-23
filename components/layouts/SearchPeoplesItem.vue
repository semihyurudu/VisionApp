<template>
  <div class="search-peoples-item">
    <ul>
      <li v-for="(item, index) in peoples" :key="index">
        <nuxt-link :to="getPersonLink(item.id)">
          <img :src="getPoster(item['profile_path'])" />
        </nuxt-link>
        <div class="search-peoples-item-content">
          <div>
            <h4>
              <nuxt-link :to="getPersonLink(item.id)">
                {{item['name']}}
              </nuxt-link>
            </h4>
            <h6>
              <b>{{item['known_for_department']}}</b>
              <span v-for="(i, k) in item['known_for']" :key="k" class="search-people-action">
                |
                <nuxt-link :to="getPeopleActionUrl(i['id'], i['media_type'])">
                    {{i['title'] || i['name']}}
                </nuxt-link>
              </span>
            </h6>
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
      mixins: [helper],
      props: {
        peoples: {
            type: Array,
            required: true
        }
      },
      methods: {
          getPoster(path) {
              let url = '';
              if(path && path !== '') {
                  url = this.getProfilePath() + path;
              } else {
                  url = '/default_profile.png';
              }

              return url;
          },
          getPeopleActionUrl(id, type) {
              let url = '';


              switch (type) {
                  case 'movie':
                      url = '/movie/' + id;
                      break;
                  case 'tv':
                      url = '/tv/' + id;
                      break;
                  case 'person':
                      url = '/person/' + id;
                      break;
                  default:
                      url = '#';
                      break;
              }

              return url;
          },
          getPersonLink(id) {
              return '/person/' + id;
          }
      },
      mounted() {

      }
  }
</script>

<style scoped>
  .search-peoples-item ul {
    padding-left: 0;
    float: left;
    width: 100%;
  }

  .search-peoples-item ul li {
    list-style-type: none;
    float: left;
    width: 100%;
    margin-bottom: 30px;
    height: 90px;
    border: 1px solid #e2e2e2;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  }


  .search-peoples-item ul li img {
    float: left;
    height: 100%;
    width: 90px;
    border-right: 1px solid #e2e2e2;
  }

  .search-peoples-item-content {
    float: right;
    width: calc(100% - 90px);
    height: 100%;
    display: table;
    padding: 10px 15px;
  }

  .search-peoples-item-content > div {
    display: table-cell;
    vertical-align: middle;
  }

  .search-peoples-item-content > div h4 {
    font-weight: 500;
    font-size: 19px;
    margin-bottom: 5px;
  }

  .search-peoples-item-content > div h4 a {
    color: #424242;
  }

  .search-peoples-item-content > div h6 {
    color: #6d6d6d;
    margin-bottom: 0;
    max-height: 40px;
    overflow: hidden;
  }

  .search-peoples-item-content > div p {
    margin-bottom: 0;
    font-size: 16px;
  }
  .search-people-action a {
    color: #4a4a4a;
  }
</style>
