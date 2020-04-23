<template>
    <div class="search-results-sidebar">
        <h3>Search Results</h3>
        <ul>
            <li>
                <nuxt-link :to="{
                    name: 'search-text',
                    query: {
                        text: this.text,
                        search_type: 'multi',
                        page: 1
                    }
                }">
                    All <b-badge v-if="multiCount > 0">({{multiCount}})</b-badge>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{
                    name: 'search-text',
                    query: {
                        text: this.text,
                        search_type: 'movie',
                        page: 1
                    }
                }">
                    Movies <b-badge v-if="movieCount > 0">({{movieCount}})</b-badge>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{
                    name: 'search-text',
                    query: {
                        text: this.text,
                        search_type: 'person',
                        page: 1
                    }
                }">
                    Peoples <b-badge v-if="personCount > 0">({{personCount}})</b-badge>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{
                    name: 'search-text',
                    query: {
                        text: this.text,
                        search_type: 'tv',
                        page: 1
                    }
                }">
                    TV Shows <b-badge v-if="tvCount > 0">({{tvCount}})</b-badge>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'SearchResultsSidebar',
        props: {
            text: {
                type: String,
                required: true
            },
            multiCount: {
                type: Number,
                required: false,
                default() {
                    return 0;
                }
            },
            movieCount: {
                type: Number,
                required: false,
                default() {
                    return 0;
                }
            },
            personCount: {
                type: Number,
                required: false,
                default() {
                    return 0;
                }
            },
            tvCount: {
                type: Number,
                required: false,
                default() {
                    return 0;
                }
            }
        }
    }
</script>

<style scoped>
    .search-results-sidebar {
        border-radius: 5px;
        border: 1px solid #e4e4e4;
        overflow: hidden;
    }

    .search-results-sidebar h3 {
        background: #185d77;
        color: #fff;
        text-align: center;
        padding: 13px 10px;
        font-size: 23px;
        margin-bottom: 0;
    }

    .search-results-sidebar ul {
        padding: 0;
        margin: 0;
    }

    .search-results-sidebar ul li {
        list-style: none;
        border-bottom: 1px solid #e4e4e4;
    }

    .search-results-sidebar ul li a {
        display: block;
        padding: 13px 5px;
        text-align: center;
        text-decoration: none;
        transition-duration: 0.2s;
        color: #414a51;
        font-size: 18px;
        font-weight: bold;
    }

    .search-results-sidebar ul li a:hover {
        background: #f1f1f1;
        color: #185d77;
    }
</style>