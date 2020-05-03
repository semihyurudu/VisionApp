<template>
    <div class="external-ids">
        <ul>
            <li v-for="(item, index) in items" :key="index">
                <a :href="item['url']" target="_blank">
                    <img :src="item['image']" :alt="item['name']" :title="item['name']" />
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
                items: []
            }
        },
        mounted() {
            let items = [];
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
                    default:
                        break;
                }
            });
            this.items = items;
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
    .external-ids ul li img {
        height: 40px;
    }
</style>