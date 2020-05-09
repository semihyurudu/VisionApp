<template>
    <div class="genre-list">
        <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
            <b-row v-if="!loading && genres.length > 0">
                <b-col md="6" lg="4" v-for="(genre, index) in genres" :key="index">
                    <GenreListItem :genre="genre" :type="type" />
                </b-col>
            </b-row>
            <span class="text-dark" v-if="!loading && genres.length < 1"></span>
        </b-overlay>
    </div>
</template>

<script>
    import GenreListItem from "./GenreListItem";
    export default {
        name: 'GenreList',
        components: {
            GenreListItem
        },
        props: {
            genres: {
                type: Array,
                required: true
            },
            loading: {
                type: Boolean,
                required: true
            },
            type: {
                type: String,
                required: true
            }
        }
    }
</script>