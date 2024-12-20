import { defineStore } from 'pinia';
import { getProducts, deleteProduct as apiDeleteProduct } from '@/api/products';

interface Product {
  id_producto: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  stock: number;
  stock_min: number;
  precio_compra?: number;  //opcional 
  incremento?: number;     //opcional
  id_categoria: number;
  created_at?: string | null;  //opcional
  updated_at?: string | null;  //opcional
  categoria: {
    id_categoria: number;
    nombre_categoria: string;
    created_at: string | null;
    updated_at: string | null;
  };
}


export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as Product[],
    isCargando: false,
    error: null as string | null,
  }),
  actions: {
    async fetchProducts() {
      this.isCargando = true;
      this.error = null;
      try {
        const response = await getProducts();
        //console.log('Respuesta de la API:', response);

        if (Array.isArray(response)) {
          this.products = response.map((product: any) => ({
            ...product,
            precio_compra: product.precio_compra || 0,
            incremento: product.incremento || 0,
            created_at: product.created_at || null,
            updated_at: product.updated_at || null,
            imagen: product.imagen || null,
          }));
        } else {
          throw new Error('La respuesta de la API no es un array');
        }
      } catch (error) {
        this.error = 'Error al cargar los productos';
        console.error('Error products:', error);
      } finally {
        this.isCargando = false;
      }
    },

    async removeProduct(id: number) {
      this.isCargando = true;
      this.error = null;
      try {
        await apiDeleteProduct(id);
        this.products = this.products.filter(product => product.id_producto !== id);
      } catch (error) {
        this.error = 'Error al eliminar el producto';
        console.error('Error deleting product:', error);
      } finally {
        this.isCargando = false;
      }
    },

    addProduct(product: Product) { this.products.push(product); }
  },
});
