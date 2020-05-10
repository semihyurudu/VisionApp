<template>
    <main class="movie-genres-item">
        <ListItems
                :url="getItemsUrl"
                :type="getType"
                :name="this.$route.query.name"
        />
    </main>
</template>

<script>
    import ListItems from "../../../components/layouts/list/ListItems";
    import { helper } from '@/mixins/helper.js';

    export default {
        name: 'MovieGenresItem',
        mixins: [helper],
        components: {
            ListItems
        },
        computed: {
            getItemsUrl() {
                return this.getWithGenresUrl(this.getType, this.$route.params.id)
            },
            getType() {
                return 'tv';
            },
            mounted() {
                console.log('this.$route.query.name', this.$route.query.name)
            }
        }
    }
</script>