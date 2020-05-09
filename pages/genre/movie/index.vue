<template>
    <div class="genre-movies">
        <b-container>
            <b-row>
                <b-col col>
                    <BlockTitle title="Movie Genres" />
                    <GenreList :genres="genres" :loading="loading" type="movie" />
                </b-col>
            </b-row>
        </b-container>
    </div>
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
                fetch(this.getGenreListUrl('movie'))
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