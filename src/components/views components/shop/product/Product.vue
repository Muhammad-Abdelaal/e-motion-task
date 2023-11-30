<template>
    <div>
        <RouterLink :to="{ name: 'Product', params: { productId: props.product.id }}" class="shop-product">
            <img class="product-img" :src="props.product.imgLink" />
            <p class="product-name">{{props.product.name}}</p>
            <p class="product-price">EGP: {{props.product.price}} {{props.product.hasWeight ? '/ kilo' :''}}</p>
        </RouterLink>
        <AddToCart :counter="itemCounter" :addItemToCart="addItemToCart" place="shop"/>
    </div>
</template>

<script setup>
import { computed, onMounted, watchEffect, ref, watch } from 'vue';
import {RouterLink} from 'vue-router';

import store from '@/store/store.js';

import AddToCart from '@/components/UI/AddToCart.vue';

const itemCounter = ref(0);

const props = defineProps({product:Object});
watch(store.cart, (newVal, oldVal) => {
    if (newVal.items.length !== 0 ) {
        let localCounter = 0 ;
        const existingItems = newVal.items.filter(item => {
            return item.id === props.product.id
        })
        
        existingItems.forEach(item => {
            localCounter += item.amount
        })
        itemCounter.value = localCounter;
    }
    else {
        itemCounter.value = 0;
    }
})
onMounted(() => {
    if (store.cart.items.length !== 0 ) {
        let localCounter = 0 ;
        const existingItems = store.cart.items.filter(item => {
            return item.id === props.product.id
        })
        
        existingItems.forEach(item => {
            localCounter += item.amount
        })
        itemCounter.value = localCounter;
    }
})

function addItemToCart () {
    store.cart.addToCart(
        {name:props.product.name, id:props.product.id, amount:1, weight:props.product.hasWeight ? 1 :null, hasWeight:props.product.hasWeight, totalPrice:props.product.price,  price:props.product.price, imgLink:props.product.imgLink}
    )

} 

</script>

<style scoped>
.shop-product {
    width: max-content;
}
.product-img {
    width:150px;
    height:130px;
    object-fit: contain;
}
.product-name {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 10px;
    max-width: 210px;
}
.product-price {
    color:#007058;
    font-weight: 600;
    margin-bottom: 10px;
}
</style>