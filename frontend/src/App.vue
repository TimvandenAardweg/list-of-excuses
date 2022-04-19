<script setup>
import { RouterView } from 'vue-router';
import NavigationBar from "./components/NavigationBar.vue"
</script>

<template>

<nav>
  <NavigationBar />
</nav>
<main>
  <RouterView />
</main>

</template>

<style>
@import './assets/base.css';

nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
}

main {
  display: flex;
  flex-wrap: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
