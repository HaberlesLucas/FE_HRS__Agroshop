<script setup lang="ts">
import { ref } from 'vue';
import ProductList from '@/components/ProductList.vue';
import { useProductStore } from '@/stores/productStore';
import { createProduct, updateProduct } from '@/api/products';
import NewProductModal from '@/components/NewProductModal.vue';

//estado del modal
const isModalOpen = ref(false);
const isEditing = ref(false);
const selectedProduct = ref(null);

//almacén de productos
const productStore = useProductStore();

// abrir modal para nuevo producto
const openModal = () => {
    isEditing.value = false;
    selectedProduct.value = null;
    isModalOpen.value = true;
};

// abrir modal para edición
const editProduct = (product: any) => {
    isEditing.value = true;
    selectedProduct.value = { ...product }; //copia del producto para evitar mutaciones directas
    isModalOpen.value = true;
};

// clse modal
const closeModal = () => {
    isModalOpen.value = false;
    selectedProduct.value = null;
};

// guardar nuevo producto o actualizar existente
const saveProduct = async (product: Partial<Product>) => {
    try {
        if (product.id_producto) {
            //si trae un ID, lo consideramos como actualización
            const response = await updateProduct(product.id_producto, product);
            console.log('Llamando a updateProduct con ID:', product.id_producto, 'y datos:', product);
            await productStore.fetchProducts();
            closeModal();
            console.log('Producto actualizado:', response.data);
        } else {
            //sino: es un nuevo producto
            const response = await createProduct(product);
            await productStore.fetchProducts();
            closeModal();
            console.log('Producto creado:', response.data);
        }
    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
};


</script>

<template>
    <div class="bg-gray-100">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h1 class="text-2xl font-bold text-gray-900">Gestión de Productos</h1>
                    <button @click="openModal"
                        class="bg-green-400 hover:bg-green-500 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                        Nuevo Producto
                    </button>
                </div>
                <div class="border-t border-gray-200">
                    <ProductList @edit="editProduct" />
                </div>
            </div>
        </div>
    </div>

    <!-- modal reutilizado para creación y edición -->
    <NewProductModal :is-open="isModalOpen" :product="selectedProduct" @close="closeModal" @save="saveProduct" />
</template>
