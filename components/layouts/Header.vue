<template>
  <header>
    <div class="header">
      <b-container>
        <b-row>
          <b-col col md="4">
            <Logo />
          </b-col>
          <b-col col md="8">
            <SearchBar v-on:OnChangedSearchBarShowing="CameSearchBarShowing" :is-show-search-bar="isShowSearchBar" :text="searchText" :type="searchType" />
            <Menu />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </header>
</template>

<script>
    import Vue from 'vue';
    import Logo from '../partials/Logo';
    import Menu from "../partials/Menu";
    import SearchBar from "./search/SearchBar";

    import { BootstrapVueIcons } from 'bootstrap-vue';
    Vue.use(BootstrapVueIcons);

    export default {
      name: 'Header',
      components: {
          Menu,
          Logo,
          SearchBar
      },
      props: {
        searchText: {
          type: String,
          required: false,
          default() {
            return '';
          }
        },
        searchType: {
          type: String,
          required: false,
          default() {
            return '';
          }
        }
      },
      data() {
        return {
          isShowSearchBar: (this.$route.name === 'search-text')
        }
      },
      methods: {
        CameSearchBarShowing(is_show) {
          this.isShowSearchBar = is_show;

          setTimeout(() => {
            if(is_show)
              document.getElementById("search-bar-input").focus();
          }, 100);

        }
      },
      mounted() {
        window.onscroll = function () {
          let style = '';
          const elem = document.getElementById("search-bar-form");
          let isVisible = window.getComputedStyle(elem).display !== 'none';

          if(isVisible) {
            style = 'top: ' + (70 - document.documentElement.scrollTop) + 'px';
          } else {
            style = 'top: ' + (70 - document.documentElement.scrollTop) + 'px; display: none;';
          }

          document.getElementById('search-bar-form').setAttribute('style', style);
        };
      }
  }
</script>

<style lang="scss">
  @import "../../assets/styles/app.scss";
</style>

<style scoped>
  header {
    background: #065d77;
    padding: 10px 0;
  }
</style>
