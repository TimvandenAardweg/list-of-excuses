<script setup>
import { userStore } from "../stores/userStore";
import { excusesStore } from "../stores/excusesStore";
import { deleteExcuse } from '../services/apiService';

const props = defineProps({
    excuse: Object
});

const tryDeleteExcuse = async() => {
    try {
        const deletedExcuse = await deleteExcuse(props.excuse._id);
        excusesStore.deleteExcuse(deletedExcuse.id);
    } catch (e) {
        console.log("Could not get excuses from the server:");
        console.log(e);
    }
}
</script>

<template>
<div class="excuse">
    <div class="admin-actions"></div>
    <span>{{ excuse.excuse }}</span>
    <div class="admin-actions">
        <!-- <font-awesome-icon :icon="['fas', 'pencil']" class="admin-action" v-if="store.user" @click="tryEditExcuse" /> -->
        <font-awesome-icon :icon="['far', 'trash-can']" class="admin-action" v-if="userStore.user" @click="tryDeleteExcuse" />
    </div>
</div>
</template>

<style scoped>
.excuse{
  background-color: white;
  width: 100%;
  border: 1px solid deeppink;
  border-radius: 0.5rem;
  padding-left: 1rem;
  line-height: 3rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.admin-actions {
    width: 2rem;
}

.admin-action{
    margin-right: 1rem;
    cursor: pointer;
}
</style>