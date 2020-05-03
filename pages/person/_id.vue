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
                            :description="person['gender']"
                        />

                        <SidebarTitleDescription
                            title="Birthday"
                            :description="person['birthday']"
                        />

                        <SidebarTitleDescription
                            title="Place of Birth"
                            :description="person['place_of_birth']"
                        />


                    </b-col>
                    <b-col xl="8">
                        <h1 class="mb-4">{{person['name']}}</h1>

                        <b>Biography</b><br />
                        <p>
                            {{person['biography']}}
                        </p>

                        <div class="carousel-container">
                            <BlockTitle title="Known For" />
                        </div>


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

    export default {
        name: 'PersonItem',
        mixins: [helper],
        components: {
            Loading,
            ProfileImage,
            SidebarTitleDescription,
            ExternalIds,
            Carousel,
            BlockTitle
        },
        computed: {

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

                        console.log(res)
                    })
            },
            getExternalIds() {
                fetch(this.getPersonExternalIdsUrl(this.$route.params.id))
                    .then((res) => {
                        return res.json()
                    })
                    .then((res) => {
                        this.externalIds = res;
                    })
            }
        },
        data() {
            return {
                person: {},
                isLoading: true,
                externalIds: {}
            }
        },
        created() {
            this.getDetails();
            this.getExternalIds()
        }
    }
</script>