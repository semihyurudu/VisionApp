<template>
  <div class="list-movies">
    <b-container>
      <b-row>
        <b-col md="6" lg="3" v-for="(tv, index) in tvShows" :key="index">
          <ListTvShowsItem :tv=tv></ListTvShowsItem>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import ListTvShowsItem from "./ListTvShowsItem";
  import { helper } from '@/mixins/helper.js';

  export default {
      name: 'ListTvShows',
      mixins: [helper],
      components: {
        ListTvShowsItem
      },
      props: {
        tvShows: {
          type: Array,
          required: true,
          default() {
            return [];
          }
        }
      }
  }
</script>
