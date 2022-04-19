import axios from "axios";
import { userStore } from '../stores/userStore';

export const login = async (user) => {
    const response = await axios.post('/api/users/login', user);

    return response.data;
}

export const getExcuses = async () => {
    const response = await axios.get('/api/excuses');

    return response.data;
}

export const addExcuse = async (newExcuseText) => {
    if(!userStore.user || !newExcuseText || newExcuseText.trim().length === 0){
        return;
    }

    const headers = {
        headers: {
            'Authorization': `Bearer ${userStore.user.token}`
        }
    };

    const data = {
        excuse: newExcuseText
    };

    const response = await axios.post('/api/excuses', data , headers);

    return response.data;
}

export const editExcuse = async (id, updatedText, updatedCount) => {

}

export const deleteExcuse = async (id) => {
    if(!userStore.user){
        return;
    }

    const headers = {
        headers: {
            'Authorization': `Bearer ${userStore.user.token}`
        }
    };

    const response = await axios.delete(`/api/excuses/${id}`, headers);

    return response.data;
}
