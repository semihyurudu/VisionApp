<template>
  <div class="logo">
    <nuxt-link to="/">
      <img src="/images/logo.png" />
    </nuxt-link>
  </div>
</template>

<script>
    export default {
        name: 'Logo'
    }
</script>

<style scoped>
  .logo img {
    height: 50px;
  }
</style>
