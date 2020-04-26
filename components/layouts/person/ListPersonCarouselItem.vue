<template>
    <nuxt-link :to="getPersonLink(person['id'])">
        <div class="carousel-with-poster-image">
            <img :src="getProfileImage(person['profile_path'])" />
        </div>

        <div class="carousel-with-poster-content">
            <h4>{{person['name']}}</h4>
            <h6>{{person['known_for_department']}}</h6>
        </div>
    </nuxt-link>
</template>

<script>
    import { helper } from '../../../mixins/helper.js';

    export default {
        name: 'ListPersonCarouselItem',
        mixins: [helper],
        props: {
            person: {
                type: Object,
                required: true
            }
        },
        methods: {
            getProfileImage(path) {
                return this.getMediumProfilePath() + path;
            },
            getPersonLink(id) {
                return '/person/' + id;
            }
        },
    }
</script>