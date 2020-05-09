<template>
  <div class="home-search">
    <div class="home-search-field">
      <vue-particles />
      <vue-particles />
      <b-container>
        <b-row>
          <b-col col>
            <vue-particles />
            <b-input-group class="home-search-input-group">
              <b-input-group-prepend>
                <SearchTypeSelect v-on:OnChangedSearchType="CameSearchTypeFromChild" />
              </b-input-group-prepend>
              <b-form-input
                placeholder="Search for a movie, tv show, person..."
                v-model="text"
                @keypress.enter="Search"
                autocomplete="off"
              >
              </b-form-input>
              <b-input-group-append>
                <b-button variant="danger" @click="Search">SEARCH</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>

  import Vue from 'vue';
    import VueParticles from '../../../components/partials/vue-particles/vue-particles'
    Vue.use(VueParticles)

    import { helper } from '@/mixins/helper.js';
    import SearchTypeSelect from "../../partials/SearchTypeSelect";
    export default {
      name: 'HomeSearch',
      mixins: [helper],
      data() {
          return {
              text: '',
              search_type: 'multi'
          }
      },
      components: {
        SearchTypeSelect,
        VueParticles,
      },
      methods: {
          Search() {
              if(this.text) {
                  this.$router.push({
                      name: 'search-text',
                      query: {
                          text: this.text,
                          search_type: this.search_type,
                          page: 1
                      }
                  });
              }
          },
          CameSearchTypeFromChild(val) {
              this.search_type = val;
          }
      }
  }
</script>

<style scoped>
  .home-search {
    background-image: url('../../../assets/images/home-search-backdrop-01.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    position: relative;
  }
  .home-search .home-search-field {
    background: rgba(0, 0, 0, 0.3);
  }
  .home-search .container .col {
    height: 380px;
  }
  .home-search-input-group {
    position: absolute;
    top: 50%;
    margin-top: -30px;
    left: 0;
    right: 0;
  }

  .home-search-input-group input {
    outline: none !important;
    border-radius: 50px 0 0 50px;
    padding: 30px;
    font-size: 18px;
    border: none !important;
  }

  .home-search-input-group .input-group-append button {
    padding: 0 30px;
    border-radius: 0 50px 50px 0;
    font-size: 18px;
  }
  .home-search-input-group select {
    height: 60px;
    border-radius: 0;
    border: none;
    box-shadow: inset -1px 0 0 #dedede;
  }
  @media screen and(max-width: $maxMd) {
    .carousel-tabs-container > h4 {
      position: static !important;
      margin-bottom: 15px;
      font-size: 20px;
    }
  }
</style>
