<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProducts } from '@/api/products';
import { useCarritoStore } from '@/stores/carritoStore'; 
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-vue-next';  
import { addProductsToCart } from '@/api/carrito';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/alerts';

interface Product {
    id_producto: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    stock: number;
    stock_min: number;
    precio_compra: number;
    incremento: number;
    id_categoria: number;
    categoria: {
        id_categoria: number;
        nombre_categoria: string;
    };
}

const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const carritoVisible = ref(false);

const carritoStore = useCarritoStore();

//xargar productos desde la API al montar el componente
onMounted(async () => {
    try {
        const response = await getProducts();
        products.value = Array.isArray(response) ? response : response.data;
    } catch (err) {
        error.value = 'Error al cargar los productos. Por favor, intente de nuevo más tarde.';
        console.error('Error fetching products:', err);
    } finally {
        loading.value = false;
    }
});

// cambiar luego por la imagen del produto
const getProductImage = (product: Product) => {
    return `https://picsum.photos/seed/${product.id_producto}/400/300`;
};

//calcular el precio de venta
const calcularPrecioVenta = (precioLista: number, incremento: number) => {
    return precioLista * (1 + incremento / 100);
};

// add producto al carrito
const addCarrito = (product: Product) => {
    carritoStore.addProducto({
        id_producto: product.id_producto,
        cantidad: 1,
        nombre: product.nombre,
        precio: calcularPrecioVenta(product.precio_compra, product.incremento),
    });
};

// ++ cantidad de un producto
const incrementQuantity = (id_producto: number) => {
    carritoStore.incrementarCantidad(id_producto);
};

// -- cantidad de un producto
const decrementQuantity = (id_producto: number) => {
    carritoStore.reducirCantidad(id_producto);
};

// x
const removeItem = (id_producto: number) => {
    carritoStore.eliminarProducto(id_producto);
};

//vaciar carrito 
const vaciarCarrito = async () => {
    const result = await showConfirmAlert(
        'Estás a punto de vaciar el carrito. ¿Quieres continuar?',
        'Sí, vaciar',
        'Cancelar'
    );
    if (result.isConfirmed) {
        carritoStore.vaciarCarrito();
        showSuccessAlert('El carrito ha sido vaciado.');
    }
};


// Comprar
const comprarCarrito = async () => {
    try {
        const productos = carritoStore.carrito.map((item) => ({
            id_producto: item.id_producto,
            cantidad: item.cantidad,
        }));

        await addProductsToCart(productos);
        await showSuccessAlert('Tu compra se ha realizado con éxito.');
        carritoStore.vaciarCarrito();
    } catch (err) {
        console.error('Error al comprar:', err);
        showErrorAlert('No se pudo completar la compra. Verifica tu carrito.');
    }
};
</script>


<template>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button @click="carritoVisible = !carritoVisible"
            class="fixed top-20 right-4 z-40 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300 flex items-center space-x-2">
            <ShoppingCart class="w-6 h-6" aria-label="Abrir carrito" />
            <span>Mi carrito ({{ carritoStore.totalProductos }})</span>
        </button>

        <div class="py-8">
            <div v-if="loading" class="text-center">
                <p class="text-xl">Cargando productos...</p>
            </div>
            <div v-else-if="error" class="text-center text-red-600">
                <p class="text-xl">{{ error }}</p>
            </div>
            <div v-else-if="products.length === 0" class="text-center">
                <p class="text-xl">No hay productos disponibles.</p>
            </div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="product in products" :key="product.id_producto"
                    class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                    <img :src="getProductImage(product)" :alt="product.nombre" class="w-full h-48 object-cover" />
                    <div class="p-4 flex flex-col flex-grow">
                        <h2 class="text-xl font-semibold mb-2">{{ product.nombre }}</h2>
                        <p class="text-gray-600 mb-2 flex-grow overflow-y-auto max-h-24">{{ product.descripcion }}</p>
                        <p class="text-sm text-gray-500 mb-2">Categoría: {{ product.categoria.nombre_categoria }}</p>
                        <div class="flex justify-between items-center mt-auto">
                            <p class="text-lg font-bold text-green-600">
                                ${{ calcularPrecioVenta(product.precio_compra, product.incremento).toFixed(2) }}
                            </p>
                            <p class="text-sm text-green-500 italic">Stock: {{ product.stock }}</p>
                        </div>
                        <button @click="addCarrito(product)"
                            class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2 mx-auto">
                            <ShoppingCart class="w-5 h-5" />
                            <span>Añadir</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="carritoVisible" class="fixed top-0 right-0 h-full w-80 bg-gray-100 shadow-lg p-4 z-50">
            <button @click="carritoVisible = false"
                class="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 p-2 rounded-full transition duration-300">
                <X class="w-6 h-6" aria-label="Cerrar carrito" />
            </button>
            <h2 class="text-xl font-bold mb-4">Carrito</h2>
            <ul>
                <li v-for="item in carritoStore.carrito" :key="item.id_producto"
                    class="flex justify-between items-center mb-2">
                    <div class="flex items-center space-x-2">
                        <button @click="decrementQuantity(item.id_producto)"
                            class="bg-gray-300 p-1 rounded hover:bg-gray-400 transition">
                            <Minus class="w-4 h-4" />
                        </button>
                        <span>{{ item.cantidad }}</span>
                        <button @click="incrementQuantity(item.id_producto)"
                            class="bg-gray-300 p-1 rounded hover:bg-gray-400 transition">
                            <Plus class="w-4 h-4" />
                        </button>
                    </div>
                    <span>{{ item.nombre }}</span>
                    <span>${{ (item.precio * item.cantidad).toFixed(2) }}</span>
                    <button @click="removeItem(item.id_producto)" class="text-red-500 hover:text-red-700 transition">
                        <Trash2 class="w-5 h-5" />
                    </button>
                </li>
            </ul>
            <p class="text-right font-bold mt-4">Total: ${{ carritoStore.totalPrecio.toFixed(2) }}</p>
            <div class="mt-4 flex justify-between">
                <button @click="vaciarCarrito" :disabled="carritoStore.carrito.length === 0"
                    class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                    Vaciar Carrito
                </button>
                <button @click="comprarCarrito" :disabled="carritoStore.carrito.length === 0"
                    class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">Comprar</button>
            </div>
        </div>
    </div>
</template>
