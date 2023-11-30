<template>
    <div class="cart-products-list">
        <CartProduct v-for="item, index in cartItems" :key="index" :cartItem="item" />
    </div>
</template>

<script setup>
import CartProduct from '../cart components/CartProduct.vue'

import store from '@/store/store.js';

const cartItems = store.cart.items;
</script>

<style scoped>
.cart-products-list {
    overflow-y: scroll;
    -ms-overflow-style: none; 
    scrollbar-width: none;  
    max-height: 520px;
}
.cart-products-list::-webkit-scrollbar {
  display: none;
}
</style>