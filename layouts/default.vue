<template>
  <div>
    <Header />
    <nuxt />
  </div>
</template>

<script>
  import Vue from 'vue';
  import { BootstrapVueIcons } from 'bootstrap-vue';
  import Header from "../components/layouts/Header";
  import { mapGetters } from 'vuex';


  Vue.use(BootstrapVueIcons);

  export default {
    name: 'MainLayout',
    components: {Header},
    computed: {
      ...mapGetters({
      }),
    },
    watch: {
      '$route': 'routeChanged'
    },
    methods: {
      routeChanged() {

        if(this.$route.name === 'search-text') {
          this.$store.commit('SET_SEARCH_BAR', {
            isShow: true,
            text: this.$route.query.text,
            search_type: this.$route.query.search_type
          });
        } else {
          this.$store.commit('SET_SEARCH_BAR', {
            isShow: false,
            text: '',
            search_type: 'multi'
          });
        }

      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/styles/app.scss";
</style>