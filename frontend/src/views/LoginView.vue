<script setup>
import { ref } from 'vue';
import { login } from '../services/apiService.js'
import { userStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref(null);
const password = ref(null);
const error = ref(null);

const onSubmit = (e) => {
  e.preventDefault();
  error.value = null;

  if(!username.value || username.value.trim().length === 0) {
    error.value = "Please enter a username.";
    return;
  }

  if(!password.value || password.value.trim().length === 0) {
    error.value = "Please enter a password.";
    return;
  }

  tryLogin();
}

const tryLogin = async () => {
  try {
    let user = await login({username: username.value, password: password.value});
    userStore.setUser(user);
    router.push("/");
  } catch (e) {
    const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
    error.value = message;
  }
}

</script>

<template>

  <div class="login-container">
    <h1>Login</h1>

    <form @submit="onSubmit" class="login-form">
      <div class="form-control">
        <input type="text" id="username" v-model="username" placeholder="username">
      </div>

      <div class="form-control">
        <input type="password" id="password" v-model="password" placeholder="password">
      </div>

      <div class="form-control">
        <input type="submit" value="Log in">
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<style scoped>
h1 {
  font-weight: bold;
  color: deeppink;
  margin-bottom: 2rem;
}

.login-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.login-form{
  background-color: white;
  border: 3px solid deeppink;
  border-radius: 10px;
  min-width: 30rem;
  min-height: 30vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.form-control {
  width: 80%;
  padding: 0.5rem;
}

input {
  width: 100%;
  height: 2rem;
  border-radius: 5px;
  border: 1px solid;
}

input[type=text], input[type=password] {
  padding-left: 1rem;
}

input[type=submit] {
  font-size: large;
  font-weight: bold;
  background-color: deeppink;
  color: white;
  cursor:pointer;
}

.error {
  font-weight: bold;
  color: red;
}




</style>
