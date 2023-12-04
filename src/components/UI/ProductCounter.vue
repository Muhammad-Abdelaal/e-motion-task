<template>
    <div class="counter">
        <button @click="() => {props.place === 'product'?props.decrementProduct() : props.removeItemFromCart('minus')}" style="border-right:solid 1px #007058;" class="counter-btn" type="button">-</button>
        <p style="width:max-content; padding:0 15px;">{{props.productCount}}</p>
        <button @click="() => {props.place === 'product'?props.incrementProduct() : props.addItemToCart()}" style="border-left:solid 1px #007058" class="counter-btn" type="button">+</button>
    </div>
</template>

<script setup>
const props = defineProps({productCount:Number, removeItemFromCart:Function, addItemToCart:Function, decrementProduct:Function, incrementProduct:Function, place:String})
</script>

<style scoped>
.counter {
    border: solid 1px #007058;
    border-radius: 25px;
    display: flex;
    align-items: center;
    width: max-content;
    overflow: hidden;
}
.counter-btn {
    cursor: pointer;
    background-color: white;
    border: none;
    width: 50px;
    height: 40px;
    font-weight: 500;
}

@media (max-width:768px) {
    .counter-btn {
        height: 30px;
    }
}
</style>