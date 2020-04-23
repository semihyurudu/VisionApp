<template>
    <div class="search-bar">
        <div class="search-bar-icon search-bar-icon-close" v-show="isShowSearchBar" @click="toggleSearch(false)">
            <b-icon-x></b-icon-x>
        </div>
        <div class="search-bar-icon search-bar-icon-open" v-show="!isShowSearchBar" @click="toggleSearch(true)">
            <b-icon-search></b-icon-search>
        </div>
        <div class="search-bar-form" id="search-bar-form" v-show="isShowSearchBar">
            <b-container>
                <b-row>
                    <b-col col>
                        <b-input-group :prepend="getPrependDescription">
                            <b-form-input
                                    placeholder="Search for a movie, tv show, person..."
                                    v-model="query"
                                    @keypress.enter="Search"
                                    autocomplete="off"
                                    id="search-bar-input"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-button variant="info" @click="Search">SEARCH</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script>
    import { helper } from '../../../mixins/helper.js';
    export default {
        name: 'SearchBar',
        mixins: [helper],
        props: {
            text: {
                type: String,
                required: false
            },
            type: {
                type: String,
                required: false,
                default() {
                    return 'multi'
                }
            },
            isShowSearchBar: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            }
        },
        computed: {
            getPrependDescription() {
                return this.getSearchTypeText(this.$route.query.search_type);
            }
        },
        methods: {
            Search() {
                if(this.query) {
                    this.$router.push({
                        name: 'search-text',
                        query: {
                            text: this.query,
                            search_type: (typeof this.$route.query.search_type !== 'undefined') ? this.$route.query.search_type : 'multi',
                            page: 1
                        }
                    });
                }
            },
            toggleSearch(is_show) {
                this.$emit('OnChangedSearchBarShowing', is_show);
            }
        },
        data() {
            return {
                query: '',
                search_type: 'multi'
            }
        },
        mounted() {
            this.query = this.text;
            this.search_type = this.type;
        }
    }
</script>

<style scoped>
    .search-bar {
        float: right;
        width: 30px;
        height: 30px;
        margin-left: 15px;
        position: relative;
        margin-top: 10px;
    }

    .search-bar .search-bar-icon {text-align: center;line-height: 30px;color: white;cursor: pointer;}
    .search-bar .search-bar-form {
        position: fixed;
        top: 70px;
        width: 100%;
        right: 0;
        left: 0;
        z-index: 9999;
    }
</style>