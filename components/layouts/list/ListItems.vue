<template>
    <div class="list-items">
        <b-container>
            <b-row>
                <b-col col>
                    <BlockTitle :title="getPageTitle" />
                    <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
                        <div v-if="!loading && items.length > 0">
                            <b-row>
                                <b-col md="6" lg="3" v-for="(item, index) in items" :key="index">
                                    <ListMovieItem :movie="item" v-if="type === 'movie'"></ListMovieItem>
                                    <ListTvShowsItem :tv="item" v-if="type === 'tv'"></ListTvShowsItem>
                                </b-col>
                            </b-row>

                            <b-pagination
                                    v-model="page"
                                    :total-rows="total"
                                    :per-page="length"
                                    aria-controls="my-table"
                                    align="center"
                                    input="inputTriggered"
                                    @change="getItems"
                                    v-if="total > 0"
                                    class="mt-3"
                            ></b-pagination>
                        </div>
                        <span class="text-dark" v-if="!loading && items.length < 1">
                            We don't have any items.
                        </span>
                    </b-overlay>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import ListMovieItem from "../movie/ListMovieItem";
    import ListTvShowsItem from "../tv/ListTvShowsItem";
    import BlockTitle from "../../partials/BlockTitle";
    import { helper } from '@/mixins/helper.js';

    export default {
        name: 'ListItems',
        mixins: [helper],
        components: {
            ListMovieItem,
            ListTvShowsItem,
            BlockTitle
        },
        props: {
            url: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: false
            }
        },
        computed: {
            getPageTitle() {
                let name = '';

                if(this.name) {
                    name = this.name + ' ';
                }

                switch (this.type) {
                    case 'movie':
                        name += 'Movies';
                        break;
                    case 'tv':
                        name += 'TV Shows';
                        break;
                }

                return name;
            }
        },
        methods: {
            getItems(page) {
                this.loading = true;

                fetch(this.url + '&page=' + page)
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.items = res.results;
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
                items: [],
                page: 1,
                total: 0,
                length: 0
            }
        },
        mounted() {
            this.getItems(1);
        },
        head() {
            return {
                title: this.getHeadTitle(this.getPageTitle)
            }
        }
    }
</script>
