<template>
    <div class="copyright">
        Copyright ©️ {{this.getYear()}} | All rights reserved.
    </div>
</template>

<script>
    export default {
        name: 'Copyright',
        methods: {
            getYear() {
                const date = new Date();
                return date.getFullYear();
            }
        }
    }
</script>

<style scoped>
    .copyright {
        margin-top: 11px;
        font-size: 15px;
    }
</style>