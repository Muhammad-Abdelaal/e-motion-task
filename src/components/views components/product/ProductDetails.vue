<template>
    <div class="product-details-container">
        <div class="product-details-image-container">
            <img class="product-image" :src="currentProduct.imgLink" />
        </div>
        <div class="product-details">
            <p class="product-details-name">{{currentProduct.name}}</p>
            <p class="product-details-price">EGP: {{currentProduct.price}}</p>
            <div style="margin-bottom:40px;" v-if="currentProduct.hasWeight">
                <label style="display:block; font-weight:600; font-size:22px; margin-bottom:10px;" for="weights">Grocery weight</label>

                <select @change="weightChangeHandler" v-model="currentWeight" id="weights-selector">
                    <option value="250">250 gm</option>
                    <option value="500">500 gm</option>
                    <option value="750">750 gm</option>
                    <option value="1">1 kilo</option>
                </select> 
            </div>
            
            <p style="margin-bottom:10px; ">Quantity</p>
            <div style="display:flex; gap:20px;">
                <ProductCounter place="product" :incrementProduct="incrementProduct" :decrementProduct="decrementProduct" :productCount="currentAmount" />
                <AddToCart :counter="itemCounter" :addItemToCart="addItemToCart" place = "product"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref,computed, watch, onMounted} from 'vue';
import {useRoute} from 'vue-router';

import store from '@/store/store.js';

import AddToCart from '@/components/UI/AddToCart.vue'
import ProductCounter from '@/components/UI/ProductCounter.vue'

const route = useRoute();

const currentProduct = store.data[route.params.productId - 1];
const currentAmount = ref(1);
const currentWeight = ref(250);
const itemCounter = ref(0);

function weightChangeHandler () {
    if (store.cart.items.length !== 0 ) {
        if (currentProduct.hasWeight) {
            const item = store.cart.items.find(item => {
                return currentWeight.value == item.weight
            });
            itemCounter.value =  item ? item.amount : 0
        }
        else {
            const existingItem = store.cart.items.find(item => {
                return item.id === currentProduct.id
            })
            itemCounter.value =  existingItem ? existingItem.amount : 0
        }
    }
    currentAmount.value = 1
}

watch(store.cart, (newVal, oldVal) => {
    if (newVal.items.length !== 0 ) {
        if (currentProduct.hasWeight) {
            const item = newVal.items.find(item => {
                return currentWeight.value == item.weight
            });
            itemCounter.value =  item ? item.amount : 0
        }
        else {
            const existingItem = newVal.items.find(item => {
                return item.id === currentProduct.id
            })
        
            itemCounter.value =  existingItem ? existingItem.amount : 0
        }
    }
    else {
        itemCounter.value = 0;
    }
})
onMounted(() => {
    if (store.cart.items.length !== 0 ) {
        if (currentProduct.hasWeight) {
            const item = store.cart.items.find(item => {
                return currentWeight.value == item.weight
            });
            itemCounter.value =  item ? item.amount : 0
        }
        else {
            const existingItem = store.cart.items.find(item => {
                return item.id === currentProduct.id
            })
            itemCounter.value =  existingItem ? existingItem.amount : 0
        }
    }
})

const currentPrice = computed(() => {
    if (currentProduct.hasWeight) {
        return currentWeight.value > 1 ? (currentWeight.value * 0.001 ) * currentProduct.price : currentProduct.price
    }
    return currentProduct.price
})
const currentTotalPrice = computed(() => {
    return currentPrice.value * currentAmount.value
})

function incrementProduct () {
    currentAmount.value ++
}
function decrementProduct () {
    if(currentAmount.value === 1) return
    currentAmount.value --
}
function addItemToCart () {
    store.cart.addToCart(
        {name:currentProduct.name, id:currentProduct.id, amount:currentAmount.value, weight:currentProduct.hasWeight ? currentWeight.value :null, hasWeight:currentProduct.hasWeight, totalPrice:currentTotalPrice.value,  price:currentPrice.value, imgLink:currentProduct.imgLink}
    )
    // let localCounter = 0 ;
    // const existingItems = store.cart.items.filter(item => {
    //     return item.id === currentProduct.id
    // })

    // existingItems.forEach(item => {
    //     localCounter += item.amount
    // })
    // itemCounter.value = localCounter;
    currentAmount.value = 1;
} 

</script>

<style scoped>
.product-details-container {
    display: flex;
    align-items: center;
    gap: 40px;
    width: max-content;
    margin: auto;
}
.product-details-image-container {
    width:460px;
    height:400px;
}
.product-image {
    object-fit: contain;
    width: 100%;
    height: 100%;
}
.product-details-name {
    font-size: 38px;
    max-width: 500px;
    color: #007058;
    margin-bottom: 20px;
}
.product-details-price {
    font-size: 22px;
    font-weight: 600;
    color: #007058;
    margin-bottom: 20px;
}
#weights-selector {
    background-color: white;
    padding: 15px;
    border: 1px solid black;
}
@media (max-width:768px) {
    .product-details-container {
        display: unset;
        text-align: center;
    }
    .product-details-image-container {
        width:150px;
        height:130px;
        margin: auto;
    }
    .product-details-name {
        font-size:26px;
    }
}
</style>