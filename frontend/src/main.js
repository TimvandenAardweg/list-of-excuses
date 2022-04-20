import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// FontAwesome Setup
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPencil, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashCan, faPencil, faCheck, faX);

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.mount('#app')
