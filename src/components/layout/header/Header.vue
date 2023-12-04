<template>
    <div id="navbar">
        <RouterLink to='/'><h2 id="logo">E-motion Task</h2></RouterLink>
        <div class="cart-icon-container" @click="() => {props.cartHandler(true)}"><img height="30" width="30" :src="cartImage" /> <span v-if="itemCounter !== 0" class="current-count">{{itemCounter}}</span></div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import {RouterLink} from 'vue-router';

import store from '../../../store/store';

import cartImage from '../../../assets/cart.png'

const props = defineProps({cartHandler:Function});

const itemCounter = ref(0);

watch(store.cart, (newVal, oldVal) => {
        let localCounter = 0 ;
        
        newVal.items.forEach(item => {
            localCounter += item.amount
        })
        itemCounter.value = localCounter;
    
})
</script>

<style scoped>
#navbar {
    color:white;
    background-color: #007058;
    padding: 10px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.cart-icon-container {
    cursor: pointer;
    position: relative;
}
.current-count {
    width: 20px;
    height: 20px;
    color: black;
    position: absolute;
    right: -10px;
    top: -5px;
    border-radius: 50%;
    background-color: #e8f900;
    display: grid;
    place-content: center;
}
@media (max-width:768px) {
    #navbar {
        padding: 10px 20px;
    }
    #logo {
        font-size: 18px ;
    }
}
</style>