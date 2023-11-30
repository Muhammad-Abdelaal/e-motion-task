<template>
    <div class="cart-product">
        <div class="cart-product-container">
            <div style="width:115px; height:100px;">
                <img class="cart-product-image" :src="props.cartItem.imgLink" />
            </div>
            <div class="cart-product-details">
                <p>{{props.cartItem.name}}</p>
                <p style="color:#007058; font-weight:500;">{{props.cartItem.hasWeight ? `${props.cartItem.price} / ${props.cartItem.weight} ${props.cartItem.weight === 1 ? 'kilo' :'gm'}`   
                    :`${props.cartItem.price} EGP / Item`}}</p>
                <p style="color:#007058; font-weight:500;">{{`total price: ${props.cartItem.totalPrice} EGP`}}</p>

                <ProductCounter :removeItemFromCart="removeItemFromCart" :addItemToCart="addItemToCart" :productCount="props.cartItem.amount" />
            </div>
        </div>
        <p @click="() => {removeItemFromCart('remove')}" style="margin-top:auto; margin-bottom:0; color:red; cursor:pointer;">Remove</p>
    </div>
</template>

<script setup>
import store from '@/store/store.js';

import ProductCounter from '@/components/UI/ProductCounter.vue';

const props = defineProps({cartItem:Object});

function addItemToCart () {
    store.cart.addToCart(
        {name:props.cartItem.name, id:props.cartItem.id, amount:1, weight:props.cartItem.hasWeight ? props.cartItem.weight :null, hasWeight:props.cartItem.hasWeight, totalPrice:props.cartItem.price,  price:props.cartItem.price, imgLink:props.cartItem.imgLink}
    )
} 
function removeItemFromCart (action) {
    store.cart.removeFromCart(props.cartItem.itemId, action)
}

</script>

<style  scoped>
.cart-product {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px #ccc solid;
}
.cart-product-container {
    display: flex;
    align-items: center;
    gap: 10px;
}
.cart-product-image {
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.cart-product-details > * {
    margin-bottom: 10px;
}
</style>