<template>
  <div class="menu">
    <div class="menu-bar-icon" @click="toggleMenu">
      <b-icon-text-left v-if="!isOpen" v-b-tooltip.hover title="MENU" class="menu-bar-open-icon"></b-icon-text-left>
      <b-icon-x v-if="isOpen" v-b-tooltip.hover title="CLOSE THE MENU"></b-icon-x>
    </div>
    <ul v-show="isOpen">
      <li v-for="(item, index) in menu" :key="index">

        <nuxt-link to="" v-if="isBackButton(item)" @click.native="backToParent(item)">
          <span>BACK <b-icon-caret-left-fill></b-icon-caret-left-fill></span>
        </nuxt-link>

        <nuxt-link :to="item['path']" v-if="!hasChild(item) && !isBackButton(item)" @click.native="toggleMenu">
          <span>{{item['name']}}</span>
        </nuxt-link>

        <nuxt-link to="" v-if="hasChild(item) && !isBackButton(item)" @click.native.prevent="openChild(item)">
          <span>{{item['name']}} <b-icon-caret-right-fill></b-icon-caret-right-fill></span>
        </nuxt-link>

      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: 'Menu',
        data() {
          return {
            isOpen: false,
            menu: [
              {
                path: '/',
                name: 'HOME PAGE',
              },
              {
                name: 'GENRES',
                second_menu: true,
                children: [
                  {
                    name: 'MOVIES',
                    path: '/genre/movie'
                  },
                  {
                    name: 'TV SHOWS',
                    path: '/genre/tv'
                  }
                ]
              }
            ],
            parent_menu: [],
            before_menu: []
          }
        },
      watch: {
        '$route': 'closeMenu'
      },
      methods: {
        toggleMenu() {
          this.isOpen = !this.isOpen

          if(this.isOpen) {
            this.menu = this.parent_menu;
          }
        },
        closeMenu() {
          console.log('here')
          this.isOpen = false;
        },
        hasChild(item) {
          let child = true;

          if(typeof item['children'] !== 'object' || !item['children']) {
            child = false;
          } else if(item['children'].length > 0) {
            child = true;
          }

          return child;
        },
        openChild(item) {


          let backButton = [
            {
              back_button: true,
            }
          ];

          if(item.second_menu) {
            backButton[0]['second_menu'] = true;
          }

          this.before_menu = this.menu;
          this.menu = backButton.concat(item.children);

        },
        isBackButton(item) {
          return item.back_button;
        },
        backToParent(item) {
          console.log(item.second_menu, item);
          let menu = [];

          if(item.second_menu) {
            menu = this.parent_menu;
          } else {
            menu = this.before_menu;
          }

          this.menu = menu;
        }
      },
      mounted() {
          this.parent_menu = this.menu;
      }
    }
</script>

<style scoped>
  .menu {
    margin-top: 10px;
    color: #fff;
    float: right;
    position: relative;
  }
  .menu ul {
    padding-left: 0;
  }
  .menu ul li {
    position: relative;
    float: left;
    width: 100%;
    list-style: none;
    border-bottom: 1px solid #347d98;
  }
  .menu ul li:last-child {
    border-bottom: none;
  }

  .menu ul li a {
    color: #fff;
    font-size: 15px;
    text-decoration: none;
    transition-duration: 0.2s;
    padding: 15px;
    display: block;
  }
  .menu ul li a:hover {
    color: #45bbd3;
  }


  .menu-bar-icon {
    font-size: 20px;
    cursor: pointer;
  }

  .menu > ul {
    position: absolute;
    background: #185d77;
    width: 200px;
    top: 40px;
    right: 0;
    border: 1px solid #347d98;
    z-index: 1000;
  }
  .menu-bar-open-icon {
    font-size: 24px;
    margin-top: 3px;
  }

</style>
