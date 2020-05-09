<template>
    <div class="movie-item-group">
        <div class="person-group-date">
            <span v-if="item['first_air_date']">{{getYearFromString(item['first_air_date'])}}</span>
            <span v-if="!item['first_air_date']">-</span>
        </div>
        <div class="person-group-divider">
            |
        </div>
        <div class="person-group-title">
            <nuxt-link :to="getTvUrl(item['id'])">
                {{item['name']}}
            </nuxt-link>

            <span v-if="item['character']">as {{item['name']}}</span>
            <span v-if="item['job']"> (Job: {{item['job']}})</span>
        </div>
    </div>
</template>

<script>
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'TvItemGroup',
        mixins: [helper],
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        methods: {
            getTvUrl(id) {
                return '/tv/' + id;
            }
        }
    }
</script>