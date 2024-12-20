import { defineStore } from 'pinia';

interface CarritoItem {
    id_producto: number;
    cantidad: number;
    nombre: string;
    precio: number;
}

export const useCarritoStore = defineStore('carrito', {
    state: () => ({
        carrito: [] as CarritoItem[],
    }),
    getters: {
        totalProductos(state): number {
            return state.carrito.reduce((total, item) => total + item.cantidad, 0);
        },
        totalPrecio(state): number {
            return state.carrito.reduce((total, item) => total + item.cantidad * item.precio, 0);
        },
    },
    actions: {
        addProducto(producto: CarritoItem) {
            const existente = this.carrito.find((item) => item.id_producto === producto.id_producto);
            if (existente) {
                existente.cantidad += producto.cantidad;
            } else {
                this.carrito.push(producto);
            }
        },
        vaciarCarrito() {
            this.carrito = [];
        },
        eliminarProducto(id_producto: number) {
            this.carrito = this.carrito.filter((item) => item.id_producto !== id_producto);
        },
        incrementarCantidad(id_producto: number) {
            const producto = this.carrito.find((item) => item.id_producto === id_producto);
            if (producto) {
                producto.cantidad += 1;
            }
        },
        reducirCantidad(id_producto: number) {
            const producto = this.carrito.find((item) => item.id_producto === id_producto);
            if (producto && producto.cantidad > 1) {
                producto.cantidad -= 1;
            } else if (producto) {
                this.eliminarProducto(id_producto);
            }
        },
    },
    persist: true,
});
