<template>
    <div class="keywords">
        <b-badge size="md" v-for="(keyword, index) in keywords" :key="index">
            <nuxt-link :to="getKeywordUrl(keyword['id'])">
                {{keyword['name']}}
            </nuxt-link>
        </b-badge>
    </div>
</template>

<script>
    export default {
        name: 'Keywords',
        props: {
            keywords: {
                type: Array,
                required: false,
                default() {
                    return [];
                }
            }
        },
        methods: {
            getKeywordUrl(id) {
                return '/keyword/' + id;
            }
        }
    }
</script>

<style>
    .keywords {
        margin-top: 5px;
    }
    .keywords .badge a {padding: 5px;font-size: 14px;text-decoration: none;color: #fff;display: block;}

    .keywords .badge {
        margin-right: 5px;
        margin-bottom: 5px;
        opacity: 0.9;
        padding: 0;
    }

    .keywords .badge:hover {
        opacity: 1;
    }
</style>