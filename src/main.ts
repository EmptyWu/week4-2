import './assets/all.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPersistedstate);
export default pinia;

import App from './App.vue'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faHouse, faPlus,faXmark } from '@fortawesome/free-solid-svg-icons'

library.add(faHouse,faPlus,faXmark);

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(createPinia())
app.use(router)

app.mount('#app')
