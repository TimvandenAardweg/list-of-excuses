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
    },
    updateExcuseCount(id, count) {
        this.excuses.forEach(excuse => {
            if (excuse._id === id) {
                excuse.count = count;
            }
        });
    },
    updateExcuseText(id, text) {
        this.excuses.forEach(excuse => {
            if (excuse._id === id) {
                excuse.excuse = text;
            }
        });
    }
});