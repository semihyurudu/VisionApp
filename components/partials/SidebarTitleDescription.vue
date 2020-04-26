<template>
    <div class="sidebar-title-description">
        <span><b>{{title}}</b></span><br />
        <span>{{description}}</span>
    </div>
</template>

<script>
    export default {
        name: 'SidebarTitleDescription',
        props: {
            title: {
                type: String ,
                required: true
            },
            description: {
                type: [String, Number],
                required: true
            }
        }
    }
</script>

<style scoped>
    .sidebar-title-description {
        margin-bottom: 20px;
    }
</style>