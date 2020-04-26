<template>
    <div class="keywords">
        <b-overlay :show="loading" rounded="sm" class="default-overlay-loading">
            <b-badge size="md" v-for="(keyword, index) in keywords" :key="index" v-if="!loading && keywords.length > 0">
                <nuxt-link :to="getKeywordUrl(keyword['id'])">
                    {{keyword['name']}}
                </nuxt-link>
            </b-badge>
            <span class="text-dark" v-if="!loading && keywords.length < 1">
                We don't have any keywords.
            </span>
        </b-overlay>
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
            },
            loading: {
                type: Boolean,
                required: true,
                default() {
                    return true;
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