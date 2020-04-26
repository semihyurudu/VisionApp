<template>
    <div class="review-item">
        <div class="review-item-title">
            <img src="/avatar.png" />
            <h6>{{review['author']}}</h6>
        </div>
        <div :class="getContentClass">
            {{review['content']}}

            <div class="review-show-more" @click="showMoreReview">
                Show More <b-icon-caret-down-fill></b-icon-caret-down-fill>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'ReviewItem',
        props: {
            review: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },
        computed: {
            getContentClass() {
                return 'review-content review-content-' + this.index;
            }
        },
        methods: {
            detectReviewHeight() {
                const elem = document.getElementsByClassName('review-content-' + this.index)[0];
                if(elem.offsetHeight > 100) {
                    elem.classList.add('review-show-more-container');
                }
            },
            showMoreReview() {
                const elem = document.getElementsByClassName('review-content-' + this.index);
                elem[0].classList.remove('review-show-more-container')
            }
        },
        mounted() {
            setTimeout(() => {
                this.detectReviewHeight()
            }, 100)
        }
    }
</script>

<style scoped>
    .review-item-title {
        float: left;
        width: 100%;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid #e6e6e6;
    }

    .review-item-title img {
        height: 50px;
        float: left;
        padding: 10px;
        border-radius: 100%;
        border: 2px solid #464646;
    }

    .review-item-title h6 {
        float: left;
        line-height: 50px;
        margin-left: 20px;
        font-weight: bold;
        margin-bottom: 0;
    }

    .review-item .review-content {
        float: left;
        width: 100%;
        text-align: justify;
        position: relative;
    }

    .review-item {
        float: left;
        width: 100%;
        padding: 15px;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    }
    .review-show-more-container .review-show-more {
        display: block;
    }
    .review-show-more {
        display: none;
        float: left;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        height: 60px;
        cursor: pointer;
        color: #505050;
        font-weight: bold;
        padding-top: 35px;
        background: rgb(255,255,255);
        background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,1) 50%);
    }
    .review-show-more-container {
        height: 100px;
        overflow: hidden;
    }
</style>