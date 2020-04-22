<template>

</template>

<script>
    export default {
        name: 'SearchBar',
        props: {
            text: {
                type: String,
                required: false
            },
            isShow: {
                type: Boolean,
                required: false,
                default() {
                    return false;
                }
            }
        }
    }
</script>