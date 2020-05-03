<template>
    <div class="external-ids">
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <a :href="item['url']" target="_blank" v-b-tooltip.hover :title="item['name']">
                    <img :src="item['image']" :alt="item['name']" :title="item['name']" />
                </a>
            </li>


            <li class="external-ids-website" v-if="Object.entries(website).length > 0">
                <a :href="website['url']" target="_blank" v-b-tooltip.hover :title="website['name']">
                    <img :src="website['image']" :alt="website['name']" :title="website['name']" />
                </a>
            </li>

        </ul>
    </div>
</template>
<script>
    import {helper} from '../../../mixins/helper.js';

    export default {
        name: 'ExternalIds',
        mixins: [helper],
        props: {
            externalIds: {
               type: Object,
               required: true
            }
        },
        data() {
            return {
                items: [],
                website: {}
            }
        },
        mounted() {
            let items = [];
            let website = {};
            Object.keys(this.externalIds).map((key) => {
                switch (key) {
                    case 'imdb_id':
                        if(this.externalIds[key]) {
                            items.push({
                                url: this.getPersonImdbUrl(this.externalIds[key]),
                                name: 'IMDb',
                                image: '/social/imdb.png'
                            });
                        }
                        break;
                    case 'facebook_id':
                        if(this.externalIds[key]) {
                            items.push({
                                url: 'https://www.facebook.com/' + this.externalIds[key],
                                name: 'Facebook',
                                image: '/social/facebook.png'
                            });
                        }
                        break;
                    case 'instagram_id':
                        if(this.externalIds[key]) {
                            items.push({
                                url: 'https://www.instagram.com/' + this.externalIds[key],
                                name: 'Instagram',
                                image: '/social/instagram.png'
                            });
                        }
                        break;
                    case 'twitter_id':
                        if(this.externalIds[key]) {
                            items.push({
                                url: 'https://www.twitter.com/' + this.externalIds[key],
                                name: 'Twitter',
                                image: '/social/twitter.png'
                            });
                        }
                        break;
                    case 'website':
                        if(this.externalIds[key]) {
                            website = {
                                url: this.externalIds[key],
                                name: 'Website',
                                image: '/social/link.png'
                            }
                        }
                        break;
                    default:
                        break;
                }
            });
            this.items = items;
            this.website = website;
        }
    }
</script>
<style scoped>
    .external-ids {
        float: left;
        width: 100%;
    }
    .external-ids ul {
        display: flex;
        padding: 0;
        margin-bottom: 5px;
    }
    .external-ids ul li {
        margin-right: 10px;
        margin-bottom: 10px;
        list-style: none;
    }
    .external-ids ul li a {
        display: block;
    }
    .external-ids ul li img {
        height: 40px;
    }
    .external-ids-website {
        border-left: 1px solid #d2d2d2;
        padding-left: 10px;
    }
    .external-ids-website img {
        transform: scale(0.8) rotate(45deg);
    }
</style>