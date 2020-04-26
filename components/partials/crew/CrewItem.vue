<template>
    <div class="crew-item">
        <nuxt-link :to="getPersonUrl(crew['id'])">
            <b>{{crew['name']}}</b><br />
            {{crew['job']}}
        </nuxt-link>
    </div>
</template>

<script>
    export default {
        name: 'CrewItem',
        props: {
            crew: {
                type: Object,
                required: true
            }
        },
        methods: {
            getPersonUrl(id) {
                return '/person/' + id
            }
        }
    }
</script>