<template>
        <div v-if="props.place === 'shop'">
            <button @click="props.addItemToCart"  class="shop-add-to-cart" type="button">Add to cart <span v-if="counter !== 0" class="current-count">{{counter}}</span></button>
            
        </div>
        <div v-else>
            <button @click="props.addItemToCart" class="product-add-to-cart" type="button">Add to cart <span v-if="counter !== 0" class="current-count">{{counter}}</span></button>
            
        </div>
</template>

<script setup>
    const props = defineProps({place:String, addItemToCart:Function, counter:Number})  
</script>

<style scoped>
.shop-add-to-cart {
    cursor: pointer;
    position: relative;
    border: solid 1px #007058;
    background-color: white;
    border-radius: 25px;
    padding: 7px 15px;
    transition: all 0.3s ease-in-out;
}
.shop-add-to-cart:hover {
    background-color: #007058;
    color: white;
}
.product-add-to-cart {
    cursor: pointer;
    position: relative;
    background: linear-gradient(-45deg, #c7f900, #007058);
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
}
.current-count {
    width: 25px;
    height: 25px;
    color: black;
    position: absolute;
    right: -10px;
    top: -15px;
    border-radius: 50%;
    background-color: #e8f900;
    display: grid;
    place-content: center;
}
</style>