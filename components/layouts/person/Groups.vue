<template>
    <div class="person-groups" v-if="!loading && groups.length > 0">
        <b-form-select
                v-model="departmentSelected"
                :options="departmentOptions"
                class="department-options-filter"
                size="sm"
        >
        </b-form-select>
        <div class="person-group" v-for="(group, index) in groups" :key="index">
            <div v-show="(departmentSelected === 'all' || departmentSelected === group['department'])">
                <h4>{{group['department']}}</h4>
                <div class="person-group-list-container">
                    <ul v-for="(childGroup, i) in group['values']" :key="i">
                        <li v-for="(item, key) in childGroup['value']" :key="key">
                            <MovieItemGroup :item="item" v-if="item['media_type'] === 'movie'" />
                            <TvItemGroup :item="item" v-if="item['media_type'] === 'tv'" />
                        </li>
                    </ul>
                </div>
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
            },
            loading: {
                type: Boolean,
                required: true
            }
        },
        components: {
            MovieItemGroup,
            TvItemGroup
        },
        data() {
            return {
                departmentSelected: 'all',
                departmentOptions: []
            }
        },
        mounted() {
            let departmentOptions = [{
                value: 'all',
                text: 'All'
            }];

            Object.values(this.groups).map((group) => {
                departmentOptions.push({
                    value: group['department'],
                    text: group['department']
                });
            });

            this.departmentOptions = departmentOptions;
            setTimeout(() => {
                document.getElementsByClassName('department-options-filter')[0].style.display = (departmentOptions > 1) ? 'block' : 'hide'
            }, 500)

        }
    }
</script>

<style scoped>
    .person-groups {
        float: left;
        width: 100%;
        position: relative;
    }

    .person-groups .department-options-filter {
        position: absolute;
        top: 0;
        right: 0;
        width: 130px;
    }
    .person-groups .person-group h4 {
        color: #151515;
        font-weight: 500;
        float: left;
        max-width: calc(100% - 140px);
    }

    .person-groups .person-group-list-container {
        border: 1px solid #e2e2e2;
        box-shadow: 0 0 4px #e4e4e4;
        float: left;
        width: 100%;
        margin-bottom: 30px;
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