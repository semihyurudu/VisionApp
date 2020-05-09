<template>
    <div class="footer-social">
        <ul>
            <li v-for="(item, index) in this.getSocialAccounts()" :key="index">
                <a :href="item['url']" target="_blank" v-b-tooltip.hover :title="item['name']">
                    <img :src="item['image']" :alt="item['name']" :title="item['name']" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { helper } from '@/mixins/helper.js';
    export default {
        name: 'Social',
        mixins: [helper]
    }
</script>

<style scoped>
    .footer-social {
        width: 100%;
        float:left;
    }
    .footer-social ul {
        display: flex;
        padding: 0;
        float: right;
        margin: 5px 0 0 0;
    }
    .footer-social ul li {
        margin-right: 10px;
        list-style: none;
    }
    .footer-social ul li:last-child {
        margin-right: 0;
    }
    .footer-social ul li a {
        display: block;
    }
    .footer-social ul li img {
        height: 30px;
        background: #ffffff;
        border-radius: 100%;
    }
</style>