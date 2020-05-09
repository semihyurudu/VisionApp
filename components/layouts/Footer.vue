<template>
    <footer>
        <div class="footer">
            <b-container>
                <b-row>
                    <b-col md="9">
                        <Copyright />
                    </b-col>
                    <b-col md="3">
                        <Social />
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </footer>
</template>

<script>
    import Copyright from "../partials/footer/Copyright";
    import Social from "../partials/footer/Social";
    import { helper } from '@/mixins/helper.js';
    export default {
        name: 'Footer',
        mixins: [helper],
        components: {
            Copyright,
            Social
        },
        methods: {
            getYear() {
                const date = new Date();
                return date.getFullYear();
            }
        }
    }
</script>

<style scoped>
    footer {
        background: #065d77;
        padding: 10px 0;
        color: #fff;
        min-height: 60px;
    }
</style>
