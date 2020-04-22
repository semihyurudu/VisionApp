<template>
  <div>
    <Header/>
    <main class="search">
      <b-container>
        <b-row>
          <b-col col md="12" lg="3">
            sidebar
          </b-col>
          <b-col col md="12" lg="9">

            <div class="search-movie-block" v-if="result.movies.length > 0">
              <h1>Movies</h1>
              <SearchMovieItem :movies="result.movies" />
            </div>

            <div class="search-tv-block" v-if="result.tv.length > 0">
              <h1>TV Shows</h1>
              <SearchTvItem :tv="result.tv" />
            </div>

            <div class="search-peoples-block" v-if="result.peoples.length > 0">
              <h1>Persons</h1>
              <SearchPeoplesItem :peoples="result.peoples" />
            </div>

            <b-alert show variant="danger" v-if="!result.movies.length && !result.tv.length && !result.peoples.length">
              <h5>We are sad.</h5>
              We couldn't find any results matching your search.
            </b-alert>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
    import Header from "../../components/layouts/Header";
    import SearchMovieItem from "../../components/layouts/SearchMovieItem";
    import SearchTvItem from "../../components/layouts/SearchTvItem";
    import SearchPeoplesItem from "../../components/layouts/SearchPeoplesItem";
    import {helper} from '@/mixins/helper.js';

    export default {
        name: 'Search',
        mixins: [helper],
        components: {Header, SearchMovieItem, SearchTvItem, SearchPeoplesItem},
        data() {
            return {
                result: {
                    movies: [],
                    peoples: [],
                    tv: []
                }
            }
        },
        mounted() {
            fetch(this.getSearchUrl(this.$route.query.search_type, this.$route.query.text, this.$route.query.page))
                .then((res) => {
                    return res.json()
                })
                .then((res) => {


                    if(this.$route.query.search_type === 'multi') {

                      let movies = res.results.filter((x) => {
                          return x['media_type'] === 'movie';
                      });

                      let peoples = res.results.filter((x) => {
                          return x['media_type'] === 'person';
                      });

                      let tv = res.results.filter((x) => {
                          return x['media_type'] === 'tv';
                      });


                      this.result = {
                          ...this.result,
                          movies,
                          peoples,
                          tv
                      };

                    } else if(this.$route.query.search_type === 'movie') {
                        this.result = {
                            ...this.result,
                            movies: res.results,
                            peoples: [],
                            tv: []
                        };
                    } else if(this.$route.query.search_type === 'person') {
                        this.result = {
                            ...this.result,
                            peoples: res.results,
                            movies: [],
                            tv: []
                        };
                    } else if(this.$route.query.search_type === 'tv') {
                        console.log('tv show', res.results)
                        this.result = {
                            ...this.result,
                            tv: res.results,
                            movies: [],
                            peoples: [],
                        };
                    }

                    console.log('rr', this.result);

                })
        }
    }
</script>

<style scoped>
  .search-movie-block h1,
  .search-tv-block h1,
  .search-person-block h1 {
    margin-bottom: 20px;
  }
</style>
