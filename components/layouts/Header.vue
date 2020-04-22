<template>
  <header>
    <div class="header">
      <b-container>
        <b-row>
          <b-col col md="4">
            <Logo />
          </b-col>
          <b-col col md="8">
            <Menu />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </header>
</template>

<script>
    import Logo from '../partials/Logo';
    import Menu from "../partials/Menu";
    export default {
      name: 'Header',
      components: {
          Menu,
        Logo,
      }
  }
</script>

<style lang="scss">
  @import "../../assets/styles/app.scss";
</style>

<style scoped>
  header {
    background: #065d77;
    padding: 20px 0;
  }
</style>
