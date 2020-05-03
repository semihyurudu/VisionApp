<template>
    <div class="person-groups">
        <div class="person-group" v-for="(group, index) in groups" :key="index">
            <h4>{{group['department']}}</h4>
            <div class="person-group-list-container">
                <ul v-for="(childGroup, i) in group['values']" :key="i">
                    <li v-for="(item, key) in childGroup" :key="key">
                        <MovieItemGroup :item="item" v-if="item['media_type'] === 'movie'" />
                        <TvItemGroup :item="item" v-if="item['media_type'] === 'tv'" />
                    </li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    import {helper} from '../../../mixins/helper.js';
    import MovieItemGroup from "./MovieItemGroup";
    import TvItemGroup from "./TvItemGroup";

    export default {
        name: 'PersonGroups',
        mixins: [helper],
        props: {
            groups: {
                type: Array,
                required: true
            }
        },
        components: {
            MovieItemGroup,
            TvItemGroup
        }
    }
</script>

<style scoped>
    .person-groups .person-group h4 {
        color: #151515;
        font-weight: 500;
    }

    .person-groups .person-group-list-container {
        border: 1px solid #e2e2e2;
        box-shadow: 0 0 4px #e4e4e4;
        float: left;
        width: 100%;
        margin-bottom: 20px;
    }

    .person-groups .person-group ul {
        float: left;
        width: 100%;
        padding-left: 0;
        margin-bottom: 0;
        border-bottom: 1px solid #e2e2e2;
    }

    .person-groups .person-group ul li {
        list-style: none;
        float: left;
        width: 100%;
        padding: 10px 5px;
    }
</style>