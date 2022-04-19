<script setup>
const props = defineProps({
    text: String,
    onClick: Function
});
</script>

<template>
<button @click="onClick" class="btn">{{ text }}</button>
</template>

<style scoped>
@import '../assets/base.css';

.btn {
    font-family: 'Poppins', sans-serif;
    background-color: deeppink;
    color: white;
    width: 8rem;
    height: 2rem;
    border: 1px solid;
    font-weight: bold;
    cursor: pointer;
}
</style>