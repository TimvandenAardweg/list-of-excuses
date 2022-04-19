import { reactive } from 'vue';

export const excusesStore = reactive({
    excuses: [],
    addExcuse(excuse) {
        this.excuses.push(excuse);
    },
    setExcuses(excuses) {
        this.excuses = excuses;
    },
    deleteExcuse(id) {
        this.excuses = this.excuses.filter(excuse => excuse._id !== id);
    }
});