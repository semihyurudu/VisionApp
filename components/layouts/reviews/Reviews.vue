<template>
    <div class="reviews">
        <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
            <div v-if="!loading && reviews.length > 0">
                <ul>
                    <li v-for="(review, index) in reviews" :key="index">
                        <ReviewItem :review="review" :index="index" />
                    </li>
                </ul>
                <b-pagination
                        v-model="page"
                        :total-rows="total"
                        per-page="20"
                        aria-controls="my-table"
                        align="center"
                        input="inputTriggered"
                        @change="getReviews"
                        v-if="total > 0"
                ></b-pagination>
            </div>
            <span class="text-dark" v-if="!loading && reviews.length < 1">
                We don't have any reviews.
            </span>
        </b-overlay>
    </div>
</template>

<script>
    import {helper} from '../../../mixins/helper.js';
    import ReviewItem from "./ReviewItem";

    export default {
        name: 'Reviews',
        mixins: [helper],
        components: {
            ReviewItem
        },
        props: {
            url: {
                type: String,
                required: true
            }
        },
        methods: {
            getReviews(page) {
                this.loading = true;

                fetch(this.getMovieReviewsUrl(this.$route.params.id, page))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.reviews = res.results;
                        this.loading = false;
                        this.total = res['total_results'];
                    })
            },
        },
        data() {
            return {
                loading: true,
                reviews: [],
                page: 1,
                total: 0
            }
        },
        mounted() {
            this.getReviews(1);
        }
    }
</script>

<style scoped>
    .reviews ul {
        float: left; width: 100%;
        padding-left: 0;
    }

    .reviews ul li {
        list-style: none;
        margin-bottom: 20px;
        display: block;
        float: left;
        width: 100%;
    }
</style>