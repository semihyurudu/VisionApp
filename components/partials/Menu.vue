<template>
  <div class="menu">
    <ul>
      <li>
        <nuxt-link to="/">
          <span>ANA SAYFA</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">
          <span>VİZYON</span>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/">
          <span>BEKLENEN FİLMLER</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'Menu'
    }
</script>

<style scoped>
  .menu {
    color: #fff;
  }
  .menu ul {
    padding-left: 0;
    margin: 0;
    float: right;
  }
  .menu ul li {
    display: inline;
    position: relative;
    padding-left: 15px;
    margin-left: 10px;
  }
  .menu ul li:first-child:before {
    display: none;
  }
  .menu ul li:before {
    position: absolute;
    width: 1px;
    height: 30px;
    top: -6px;
    left: 0;
    content: '';
    background: rgba(255, 255, 255, 0.4)
  }
  .menu ul li a {
    color: #fff;
    line-height: 30px;
    font-size: 15px;
    text-decoration: none;
    transition-duration: 0.2s;
  }
  .menu ul li a:hover {
    color: #45bbd3;
  }

</style>
