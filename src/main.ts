import './assets/main.css'

//tailwind css 


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const userData = localStorage.getItem('userData');
let userRole = null;

if (userData) {
    try {
        const parsedUserData = JSON.parse(userData);
        userRole = parsedUserData.rol_id;
    } catch (error) {
        console.error('Error al procesar los datos de usuario:', error);
        localStorage.removeItem('userData'); 
    }
}

app.config.globalProperties.$userRole = userRole;

app.use(createPinia());
app.use(router);

app.mount('#app');