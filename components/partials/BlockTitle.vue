<template>
    <div class="block-title">
        <h4>{{title}}</h4>
    </div>
</template>

<script>
    export default {
        name: 'BlockTitle',
        props: {
            title: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .block-title {
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .block-title h4 {
        padding: 10px 0;
        font-weight: bold;
        color: #dc4545;
        font-style: italic;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 0;
    }
</style>