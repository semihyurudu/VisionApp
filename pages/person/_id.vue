<template>
    <main class="person-item">
        <loading :active.sync="isLoading"
                 :can-cancel="false"
                 :is-full-page="true">
        </loading>
        <div v-if="!isLoading">
            <b-container>
                <b-row>
                    <b-col xl="4">
                        <ProfileImage :path="person['profile_path']" />

                        <ExternalIds :external-ids="externalIds" v-if="Object.entries(externalIds).length > 0" />

                        <SidebarTitleDescription
                                title="Known For"
                                :description="person['known_for_department']"
                        />

                        <SidebarTitleDescription
                            title="Gender"
                            :description="getGenderName"
                        />

                        <SidebarTitleDescription
                            title="Birthday"
                            :description="getBirthday"
                        />

                        <SidebarTitleDescription
                            title="Place of Birth"
                            :description="getPlaceOfBirth"
                        />

                        <SidebarTitleDescription
                            title="Also Known Us"
                            v-if="person['also_known_as'].length > 0"
                            class="mb-0"
                        />
                        <AlsoKnownAs
                            :also-known-as="person['also_known_as']"
                            v-if="person['also_known_as'].length > 0"
                        />



                    </b-col>
                    <b-col xl="8">
                        <h1 class="mb-4">{{person['name']}}</h1>

                        <div v-if="person['biography']">
                            <b>Biography</b><br />
                            <p>
                                {{person['biography']}}
                            </p>
                        </div>

                        <div class="carousel-container">
                            <BlockTitle title="Known For" />
                            <Carousel
                                    :items="knownFor"
                                    :loading="knownForLoading"
                                    show-all-link="/movie/trending/day"
                                    type="movie-or-tv"
                                    :breakpoints="knownForBreakpoints"
                            />
                        </div>

                        <Groups :groups="groups" :options="groupOptions" :loading="knownForLoading" />

                    </b-col>
                </b-row>
            </b-container>
        </div>
    </main>
</template>

<script>
    import {helper} from '../../mixins/helper.js';
    import Loading from '../../node_modules/vue-loading-overlay';
    import ProfileImage from "../../components/partials/ProfileImage";
    import SidebarTitleDescription from "../../components/partials/SidebarTitleDescription";
    import ExternalIds from "../../components/partials/person/ExternalIds";
    import Carousel from "../../components/partials/carousel/Carousel"
    import BlockTitle from "../../components/partials/BlockTitle";
    import Groups from "../../components/layouts/person/Groups";
    import AlsoKnownAs from "../../components/partials/person/AlsoKnownAs";

    export default {
        name: 'PersonItem',
        mixins: [helper],
        components: {
            Loading,
            ProfileImage,
            SidebarTitleDescription,
            ExternalIds,
            Carousel,
            BlockTitle,
            Groups,
            AlsoKnownAs
        },
        computed: {
            getGenderName() {
                let name = '-';
                if(parseInt(this.person['gender']) === 1) {
                    name = 'Female';
                } else if(parseInt(this.person['gender']) === 2) {
                    name = 'Male';
                }
                return name;
            },
            getBirthday() {
                let day = '-';
                if(this.person['birthday']) {
                    day = this.person['birthday'];
                }
                return day;
            },
            getPlaceOfBirth() {
                let place = '-';
                if(this.person['place_of_birth']) {
                    place = this.person['place_of_birth']
                }
                return place;
            }
        },
        methods: {
            getDetails() {
                fetch(this.getPersonDetailsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.person = res;
                        this.isLoading = false;
                    })
            },
            getExternalIds() {
                fetch(this.getPersonExternalIdsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.externalIds = {
                            ...res,
                            website: this.person['homepage']
                        };
                        this.getCombinedCredits();
                    })
            },
            getCombinedCredits() {
                fetch(this.getPersonCombinedCreditsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        let cast = res.cast.filter((x) => {
                            return (x['poster_path']);
                        });
                        let crew = res.crew.filter((x) => {
                            return (x['department'] === this.person['known_for_department']) && (x['poster_path']);
                        });

                        Object.values(res.cast).map((item) => {
                            switch (item['media_type']) {
                                case 'movie':
                                    item['year'] = this.getYearFromString(item['release_date']);
                                    break;
                                case 'tv':
                                    item['year'] = this.getYearFromString(item['first_air_date']);
                                    break;
                            }
                        });

                        let groups = [{
                            department: this.person['known_for_department'],
                            values: res.cast
                        }];

                        let groupsMap = this.groupBy(res.crew, group => group['department']);

                        for (let department of groupsMap.keys()) {
                            groups.push({
                                department,
                                values: groupsMap.get(department)
                            });
                        }

                        Object.values(groups).map((group) => {
                            Object.values(group['values']).map((item) => {
                                switch (item['media_type']) {
                                    case 'movie':
                                        item['year'] = this.getYearFromString(item['release_date']);
                                        break;
                                    case 'tv':
                                        item['year'] = this.getYearFromString(item['first_air_date']);
                                        break;
                                }
                            });
                        });

                        let groupValuesMapped = [];
                        let groupValuesItems = {};
                        let groupOptions = [{
                            text: 'All',
                            value: 'all'
                        }];

                        Object.values(groups).map((group) => {

                            groupValuesMapped = this.groupBy(group['values'], x => x['year']);
                            groupValuesItems = {};

                            for (let value of groupValuesMapped.keys()) {
                                if(typeof groupValuesItems[value] === 'undefined') {
                                    groupValuesItems[value] = [
                                        group['values'].filter((x) => {
                                            return x.year === value
                                        })[0]
                                    ]
                                } else {
                                    groupValuesItems[value].push(group['values'].filter((x) => {
                                        return x.year === value
                                    })[0])
                                }
                            }

                            group['values'] = this.objectReverseToArray(groupValuesItems);
                            
                            
                            groupOptions.push({
                                text: group['department'],
                                value: group['department']
                            })
                            
                        });

                        
                        
                        
                        this.knownFor = cast.concat(crew);
                        this.groups = groups;
                        this.knownForLoading = false;
                        this.groupOptions = groupOptions;
                    })
            }
        },
        data() {
            return {
                person: {},
                isLoading: true,
                externalIds: {},
                knownFor: [],
                knownForLoading: true,
                knownForBreakpoints: {
                    0: {
                        itemsToShow: 1.2,
                        itemsToSlide: 1
                    },
                    320: {
                        itemsToShow: 2.2,
                        itemsToSlide: 2
                    },
                    768: {
                        itemsToShow: 3.2,
                        itemsToSlide: 3
                    },
                    960: {
                        itemsToShow: 4.3,
                        itemsToSlide: 4
                    }
                },
                groups: [],
                groupOptions: []
            }
        },
        created() {
            this.getDetails();
            this.getExternalIds()
        }
    }
</script>