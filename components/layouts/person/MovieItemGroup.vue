<template>
    <div class="movie-item-group">
        <div class="person-group-date">
            <span v-if="item['release_date']">{{getYearFromString(item['release_date'])}}</span>
            <span v-if="!item['release_date']">-</span>
        </div>
        <div class="person-group-divider">
            |
        </div>
        <div class="person-group-title">
            <nuxt-link :to="getMovieUrl(item['id'])">
                {{item['title']}}
            </nuxt-link>
            <span v-if="item['character']">as <label>{{item['character']}}</label></span>
            <span v-if="item['job']"> (Job: <label>{{item['job']}}</label>)</span>
        </div>
    </div>
</template>

<script>
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'MovieItemGroup',
        mixins: [helper],
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        methods: {
            getMovieUrl(id) {
                return '/movie/' + id;
            }
        }
    }
</script>