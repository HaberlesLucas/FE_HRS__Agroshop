import { defineStore } from 'pinia';
import { useCarritoStore } from '@/stores/carritoStore'; 

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as { nombre: string; apellido: string; rol_id: number } | null,
    }),
    actions: {
        setUser(userData: { nombre: string; apellido: string; rol_id: number }) {
            this.user = userData;
        },
        clearUser() {
            this.user = null;
        },
        logout() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            this.clearUser();
            const carritoStore = useCarritoStore(); 
            carritoStore.vaciarCarrito();  
        },
    },
});
