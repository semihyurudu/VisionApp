<template>
    <main class="genre-tv-shows">
        <b-container>
            <b-row>
                <b-col col>
                    <BlockTitle title="TV Genres" />
                    <GenreList :genres="genres" :loading="loading" type="tv" />
                </b-col>
            </b-row>
        </b-container>
    </main>
</template>

<script>
    import GenreList from "../../../components/layouts/genre/GenreList";
    import BlockTitle from "../../../components/partials/BlockTitle";
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'GenreMovies',
        mixins: [helper],
        components: {
            GenreList,
            BlockTitle
        },
        methods: {
            getMovies() {
                fetch(this.getGenreListUrl('tv'))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.genres = res.genres;
                        this.loading = false;
                    })
            }
        },
        data() {
            return {
                genres: [],
                loading: true
            }
        },
        mounted() {
            this.getMovies();
        }
    }
</script>