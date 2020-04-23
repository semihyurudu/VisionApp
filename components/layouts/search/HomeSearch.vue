<template>
  <div class="home-search">
    <b-container>
      <b-row>
        <b-col col>
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
</template>

<script>
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
        SearchTypeSelect
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
    background-image: url('../../../assets/images/home-search-backdrop-02.jpg');
    min-height: 400px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom center;
  }
  .home-search-input-group {
    margin: 150px 0;
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
</style>
