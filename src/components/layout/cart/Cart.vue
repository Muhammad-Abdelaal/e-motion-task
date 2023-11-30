<template>
    <div :style="props.isCartOpen ? 'display:block;' : 'display:none;'" class="cart-modal-container">
        <div @click="() => {props.cartHandler(false)}" class="modal" />
        <div :style="props.isCartOpen ? 'right:0;' : 'right:-400px;'" class="cart">
            <p class="cart-title">cart</p>
            <CartProductsList />
            <div class="total-cart-price-container">
                <div>Order Total:</div>
                <div>{{store.cart.totalPrice.toFixed(2)}} EGP</div>
            </div>
            <button class="checkout-btn" type="button">Checkout</button>
        </div>
    </div>
</template>

<script setup>
import store from '@/store/store.js';

import CartProductsList from '../../cart components/CartProductsList.vue';

const props = defineProps({cartHandler:Function, isCartOpen:Boolean});

</script>

<style scoped>
.cart-modal-container {
    position: fixed;
    z-index: 1000;
    height: 100vh;
    width: 100vw;
    overflow-x: hidden;
}
.modal {
    position: absolute;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.125);
    inset: 0;
}
.cart {
    padding: 20px;
    background-color: white;
    height: 100vh;
    width: 550px;
    position: absolute;
    z-index: 2;
}
.cart-title {
    font-size: 24px;
    font-weight: 500;
    text-decoration: underline;
    margin: auto;
    width: max-content;
    margin-bottom: 20px;
}
.total-cart-price-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    margin: 20px 0;
}
.checkout-btn {
    cursor: pointer;
    background: linear-gradient(-45deg, #c7f900, #007058);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
    width: 100%;
}
</style>