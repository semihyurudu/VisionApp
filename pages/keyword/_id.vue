<template>
    <main class="movie-genres-item">
        <ListItems
                :url="getItemsUrl"
                :type="getType"
                :name="this.name"
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
                return this.getKeywordMoviesUrl(this.$route.params.id)
            },
            getType() {
                return 'movie';
            }
        },
        methods: {
            getDetails() {
                fetch(this.getKeywordDetails(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.name = '"' + res.name + '"';
                    })
            }
        },
        data() {
            return {
                name: ''
            }
        },
        created() {
            this.getDetails();
        }
    }
</script>