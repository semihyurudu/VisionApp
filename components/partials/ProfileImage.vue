<template>
    <div class="profile-image">
        <img :src="getImage" />
    </div>
</template>

<script>
    import {helper} from '../../mixins/helper.js';
    export default {
        name: 'ProfileImage',
        mixins: [helper],
        props: {
            path: {
                type: String,
                required: false
            }
        },
        computed: {
            getImage() {
                let image = this.getDefaultPoster();

                if(this.path) {
                    image = this.getLargeProfilePath() + this.path;
                }

                return image;

            }
        }
    }
</script>

<style scoped>
    .profile-image {
        margin-bottom: 20px;
    }
    .profile-image img {
        max-width: 100%;
        border-radius: 5px;
    }
</style>