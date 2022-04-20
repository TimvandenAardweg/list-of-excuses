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
        throw new Error("Invalid request.");
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

export const updateExcuseCount = async (excuse) => {
    if(!userStore.user || !excuse._id || !excuse.count || excuse.count < 1){
        throw new Error("Invalid request.");
    }

    const headers = {
        headers: {
            'Authorization': `Bearer ${userStore.user.token}`
        }
    };

    const data = {
        count: excuse.count
    };

    const response = await axios.put(`/api/excuses/${excuse._id}`, data , headers);

    return response.data;
}

export const updateExcuseText = async (excuse) => {
    let text = excuse.excuse;

    if(!userStore.user || !excuse._id || !text || text.trim().length === 0){
        throw new Error("Invalid request.");
    }

    const headers = {
        headers: {
            'Authorization': `Bearer ${userStore.user.token}`
        }
    };

    const data = {
        excuse: text
    };

    const response = await axios.put(`/api/excuses/${excuse._id}`, data , headers);

    return response.data;
}
