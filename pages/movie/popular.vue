<template>
    <main class="movie-genres-item">
        <ListItems
                :url="getItemsUrl"
                :type="getType"
                name="Popular"
        />
    </main>
</template>

<script>
    import ListItems from "../../components/layouts/list/ListItems";
    import { helper } from '@/mixins/helper.js';

    export default {
        name: 'MovieGenresItem',
        mixins: [helper],
        components: {
            ListItems
        },
        computed: {
            getItemsUrl() {
                return this.popularMoviesUrl()
            },
            getType() {
                return 'movie';
            }
        }
    }
</script>