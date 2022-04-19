<script setup>
import { onMounted, ref } from 'vue';
import { excusesStore } from '../stores/excusesStore';
import { userStore }  from '../stores/userStore'
import { getExcuses, addExcuse } from '../services/apiService'
import Excuse from '../components/Excuse.vue';

const newExcuseText = ref(null);

const tryGetExcuses = async () => {
  try {
    let excuses = await getExcuses();
    excusesStore.setExcuses(excuses);
  } catch (e) {
    console.log("Could not get excuses from the server:");
    console.log(e);
  }
}

const tryAddExcuse = async() => {
  try {
    const newExcuse = await addExcuse(newExcuseText.value);
    excusesStore.addExcuse(newExcuse);
    newExcuseText.value = null;
  } catch (e) {
    const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString();
    console.log(message);
  }
}

onMounted(async() => await tryGetExcuses());

</script>

<template>
<section class="excuses">
  <h1>Sellie's List of Excuses</h1>

  <Excuse v-for="excuse in excusesStore.excuses" :excuse="excuse" :key="excuse._id" />

  <div class="add-container" v-if="userStore.user">
    <input type="text" placeholder="Add a new excuse" v-model="newExcuseText">
    <button @click="tryAddExcuse">Add excuse</button>
  </div>
</section>
</template>

<style scoped>
h1 {
  color: deeppink;
  font-weight: bold;
  margin-bottom: 2rem;
}

.excuses {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 80%;
  width: 40rem;
}

.add-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin-top: 2rem;
}

.add-container input {
  width: 28rem;
  height: 2rem;
  margin-right: 2rem;
}

.add-container button {
  width: 10rem;
  background-color: deeppink;
  color: white;
  border: 1px solid white;
  font-weight: bold;
  font-size: larger;
  cursor: pointer;
}

</style>