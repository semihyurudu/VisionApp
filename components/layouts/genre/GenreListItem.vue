<template>
    <div class="genre-list-item">
        <nuxt-link :to="this.getGenrePageUrl(this.type, this.genre['id'], genre['name'])">
            {{genre['name']}}
        </nuxt-link>
    </div>
</template>

<script>
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'GenreListItem',
        mixins: [helper],
        props: {
            genre: {
                type: Object,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .genre-list-item {
        margin-bottom: 15px;
        text-align: center;
    }

    .genre-list-item a {
        display: block;
        background: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        color: #333;
        font-weight: bold;
        text-decoration: none;
        border: 1px solid #efefef;
        box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.1);
        transition-duration: 0.2s;
        -webkit-transition-duration: 0.2s;
        -moz-transition-duration: 0.2s;
    }

    .genre-list-item a:hover {
        background: #efefef;
    }
</style>