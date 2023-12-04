<template>
    <div id="shop-products-list">
        <Product v-for="product, index in products" :key="index" :product="product" />
    </div>
</template>

<script setup>
import store from '../../../../store/store.js';

import Product from '../product/Product.vue'

const products = store.data;

</script>

<style scoped>
#shop-products-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px 0;
}
</style>