import { defineStore } from 'pinia';
import { getCategorias } from '../api/categorias';

interface Categoria {
    id_categoria: number;
    nombre_categoria: string;
}

export const useCategoriaStore = defineStore('categoria', {
    state: () => ({
        categorias: [] as Categoria[],
        loading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchCategorias() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getCategorias();
                this.categorias = response.data;
            } catch (error) {
                this.error = 'Error al cargar las categorías';
                console.error('Error fetching categorias:', error);
            } finally {
                this.loading = false;
            }
        },
    },
});