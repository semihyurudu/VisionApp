<template>
    <div class="also-known-us">
        <ul>
            <li v-for="(item, index) in alsoKnownAs" :key="index">
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'AlsoKnownAs',
        props: {
            alsoKnownAs: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
    .also-known-us ul {
        padding-left: 18px;
        list-style-type: circle;
    }
</style>