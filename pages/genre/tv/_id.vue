<template>
    <div class="movie-genres-item">
        <b-container>
            <b-row>
                <b-col col>
                    <BlockTitle :title="getPageTitle" />
                    <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
                        <div v-if="!loading && tvShows.length > 0">
                            <ListTvShows :tv-shows="tvShows" />
                            <b-pagination
                                    v-model="page"
                                    :total-rows="total"
                                    :per-page="length"
                                    aria-controls="my-table"
                                    align="center"
                                    input="inputTriggered"
                                    @change="getTvShows"
                                    v-if="total > 0"
                                    class="mt-3"
                            ></b-pagination>
                        </div>
                        <span class="text-dark" v-if="!loading && tvShows.length < 1">
                            We don't have any TV Shows.
                        </span>
                    </b-overlay>

                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import BlockTitle from "../../../components/partials/BlockTitle";
    import {helper} from '../../../mixins/helper.js';
    import ListTvShows from "../../../components/layouts/tv/ListTvShows";
    export default {
        name: 'MovieGenresItem',
        mixins: [helper],
        components: {
            BlockTitle,
            ListTvShows
        },
        computed: {
            getPageTitle() {
                let name = '';

                if(this.$route.query.name) {
                    name = this.$route.query.name + ' ';
                }

                name += 'TV Shows';

                return name;
            }
        },
        methods: {
            getTvShows(page) {
                this.loading = true;

                fetch(this.getWithGenresUrl('tv', this.$route.params.id, page))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.tvShows = res.results;
                        this.loading = false;
                        this.total = res['total_results'];
                        this.length = (res['total_results'] / res['total_pages']);
                        this.page = page;
                    })
            },
        },
        data() {
            return {
                loading: true,
                tvShows: [],
                page: 1,
                total: 0,
                length: 0
            }
        },
        created() {
            this.getTvShows(1);
        }
    }
</script>