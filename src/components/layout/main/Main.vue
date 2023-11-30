<template>
    <div>
        <Cart :isCartOpen="isCartOpen" :cartHandler="cartHandler" />
        <Header :cartHandler="cartHandler" />
        <div id="main">
            <slot />
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

import Header from "../header/Header.vue";
import Cart from "../cart/Cart.vue";

const isCartOpen = ref(false);

function cartHandler (value) {isCartOpen.value = value}

</script>

<style scoped>
    #main {
        margin: auto;
        margin-top: 100px;
        max-width: 1280px;
    }
</style>