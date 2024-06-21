import './assets/main.css';
import './assets/variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';



const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
