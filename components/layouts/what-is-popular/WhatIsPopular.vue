<template>
    <div class="what-is-popular">
        <b-container>
            <b-row>
                <b-col col>
                    <b-tabs v-model="tabIndex">
                        <b-tab active>
                            <template v-slot:title>
                                <b-icon-film></b-icon-film> <strong>{{getSearchTypeText('movie')}}</strong>
                            </template>
                            <ListMovies />
                        </b-tab>

                        <b-tab lazy>
                            <template v-slot:title>
                                <b-icon-tv></b-icon-tv> <strong>{{getSearchTypeText('tv')}}</strong>
                            </template>
                            <p class="p-3">Tab contents 2</p>
                        </b-tab>
                    </b-tabs>

                    <div class="text-muted">Current Tab: {{ tabIndex }}</div>
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
    import { helper } from '../../../mixins/helper.js';
    import ListMovies from "../ListMovies";
    export default {
        name: 'WhatIsPopular',
        mixins: [helper],
        components: {ListMovies},
        data() {
            return {
                tabIndex: 0
            }
        }
    }
</script>

<style scoped>
    .what-is-popular {
        margin-top: 20px;
    }
</style>