<template>
    <div class="list-items">
        <b-row>
            <b-col col>
                <BlockTitle :title="name" />
                <b-overlay :show="loading" rounded="sm" :class="loading ? 'default-overlay-loading' : ''">
                    <div v-if="!loading">
                        <b-row>
                            <slot />
                        </b-row>

                        <slot name="pagination" />

                    </div>
                    <span class="text-dark" v-if="!loading">
                        We don't have any items.
                    </span>
                </b-overlay>
            </b-col>
        </b-row>
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
            loading: {
              type: Boolean,
              default() {
                  return false;
              }
            },
            name: {
                type: String
            },
            type: {
                type: String
            }
        },
        head() {
            return {
                title: this.getHeadTitle(this.getPageTitle)
            }
        }
    }
</script>
