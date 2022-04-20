<script setup>
import { ref } from 'vue';
import { userStore } from "../stores/userStore";
import { excusesStore } from "../stores/excusesStore";
import { deleteExcuse, updateExcuseCount, updateExcuseText } from '../services/apiService';
import FirstPlaceIcon from './svg/FirstPlaceIcon.vue';
import SecondPlaceIcon from './svg/SecondPlaceIcon.vue';
import ThirdPlaceIcon from './svg/ThirdPlaceIcon.vue';

const props = defineProps({
    excuse: Object,
    index: Number
});

const editMode = ref(false);
const editedText = ref(null);

const tryDeleteExcuse = async() => {
    if(!window.confirm("Are you sure you want to delete this excuse?")){
        return;
    }

    try {
        const deletedExcuse = await deleteExcuse(props.excuse._id);
        excusesStore.deleteExcuse(deletedExcuse.id);
    } catch (e) {
        console.log("Could not get excuses from the server:");
        console.log(e);
    }
}

const tryIncreaseCount = async() => {
    if (!userStore.user) {
        return;
    }

    try {
        let newcount = props.excuse.count + 1;
        await updateExcuseCount({
            _id: props.excuse._id,
            count: newcount
        });
        excusesStore.updateExcuseCount(props.excuse._id, newcount);
    } catch (e) {
        console.log("Could not increase the count.");
        console.log(e);
    }
}

const tryDecreaseCount = async(e) => {
    e.preventDefault();

    if (!userStore.user) {
        return;
    }

    try {
        let newcount = props.excuse.count - 1;
        await updateExcuseCount({
            _id: props.excuse._id,
            count: props.excuse.count - 1
        });
        excusesStore.updateExcuseCount(props.excuse._id, newcount);
    } catch (e) {
        console.log("Could not increase the count.");
        console.log(e);
    }
}

const tryUpdateExcuse = async() => {
    if (!userStore.user) {
        return;
    }

    try {
        await updateExcuseText({
            _id: props.excuse._id,
            excuse: editedText.value
        });
        excusesStore.updateExcuseText(props.excuse._id, editedText.value);
        editMode.value = !editMode.value;
    } catch (e) {
        console.log("Could not update the excuse text.");
        console.log(e);
    }
}

const toggleEditMode = () => {
    editedText.value = props.excuse.excuse;
    editMode.value = !editMode.value;
}
</script>

<template>
<div class="excuse">
    <div class="count-section">
        <div>
            {{ excuse.count }}
        </div>
        <div class="medal-section">
            <FirstPlaceIcon v-if="index === 0"/>
            <SecondPlaceIcon v-if="index === 1"/>
            <ThirdPlaceIcon v-if="index === 2"/>
        </div>
    </div>
    <span class="excuse-text" v-if="!editMode" @dblclick="tryIncreaseCount" @contextmenu="tryDecreaseCount">{{ excuse.excuse }}</span>
    <input v-if="editMode" class="edit-input" v-model="editedText">
    <div class="admin-actions">
        <font-awesome-icon :icon="['fas', 'pencil']" class="admin-action" v-if="userStore.user && !editMode" @click="toggleEditMode" />
        <font-awesome-icon :icon="['far', 'trash-can']" class="admin-action" v-if="userStore.user && !editMode" @click="tryDeleteExcuse" />
        <font-awesome-icon :icon="['fas', 'x']" class="admin-action" v-if="userStore.user && editMode" @click="toggleEditMode" />
        <font-awesome-icon :icon="['fas', 'check']" class="admin-action" v-if="userStore.user && editMode" @click="tryUpdateExcuse" />
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

.excuse-text {
    line-height: 1.5rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
}

.count-section{
    width: 2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
}

.medal-section {
    margin-left: 1rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    min-width: 2rem;
}

.admin-actions, .count-section {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 2rem;
}

.admin-actions {
    margin-right: 1rem;
}

.admin-action{
    cursor: pointer;
    padding-right: 0.7rem;
}

.edit-input {
    width: 90%;
}
</style>