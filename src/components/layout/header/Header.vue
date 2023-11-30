<template>
    <div id="navbar">
        <RouterLink to='/'><h2>E-motion Task</h2></RouterLink>
        <p @click="() => {props.cartHandler(true)}">cart</p>
    </div>
</template>

<script setup>
import {RouterLink} from 'vue-router';

const props = defineProps({cartHandler:Function})
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
</style>