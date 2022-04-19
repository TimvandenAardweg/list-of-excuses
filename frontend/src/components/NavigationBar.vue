<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { computed } from 'vue';
import { userStore } from '../stores/userStore.js';
import Button from "./Button.vue";

const router = useRouter();

const isLoginPage = computed(() => {
  return router.currentRoute.value.name == 'login';
});

const logout = () => {
  userStore.setUser(null);
}


</script>

<template>
<div id="left-nav">
    <router-link to="/" v-if="isLoginPage">&lt Back</router-link>
</div>

<div id="right-nav">
<router-link to="login" >
    <Button v-if="!userStore.user && !isLoginPage" :text="'Log in'"></Button>
</router-link>

<router-link to="/">
  <Button v-if="userStore.user" :text="'Log out'" :onClick="logout"></Button>
</router-link>
</div>
</template>

<style scoped>
#left-nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  max-width: 10rem;
  padding-left: 1rem;
  padding-top: 0.2rem;
  font-weight: bold;
}

#right-nav {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  padding-right: 1rem;
  padding-top: 0.2rem;
}

a {
  color:deeppink
}
</style>