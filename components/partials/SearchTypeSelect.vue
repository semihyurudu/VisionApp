<template>
  <b-form-select v-model="selected" :options="options" @change="SearchTypeSelectChanged"></b-form-select>
</template>

<script>
  export default {
      name: 'SearchTypeSelect',
      data() {
          return {
              selected: 'multi',
              options: [
                  { value: 'multi', text: 'All' },
                  { value: 'movie', text: 'Movies' },
                  { value: 'person', text: 'Peoples' },
                  { value: 'tv', text: 'TV Shows' },
              ]
          }
      },
      methods: {
          SearchTypeSelectChanged(value) {
              this.$emit('OnChangedSearchType', value);
          }
      }
  }
</script>
