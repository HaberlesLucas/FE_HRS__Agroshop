<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { XIcon } from 'lucide-vue-next';
import { getCategorias } from '@/api/categorias';

import { watch } from 'vue'; //escuchar

import { ChevronDown } from 'lucide-vue-next';
import { fetchPost } from '@/api';


interface Category {
    id_categoria: number;
    nombre_categoria: string;
}

interface NewProduct {
    codigo: string;
    nombre: string;
    descripcion: string;
    stock: number;
    stock_min: number;
    precio_compra?: number;
    incremento?: number;
    id_categoria: number;
}

const previewImage = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const props = defineProps<{
    isOpen: boolean;
    product?: NewProduct;
}>();

const emit = defineEmits(['close', 'save']);

const categories = ref<Category[]>([]);
const newProduct = ref<NewProduct>({
    codigo: '',
    nombre: '',
    descripcion: '',
    stock: 0,
    stock_min: 0,
    precio_compra: undefined,
    incremento: undefined,
    id_categoria: 0,
});

const saveProduct = async () => {
    const formData = new FormData();

    ///recorrer el objeto newProduct y agregar cada propiedad al FormData
    Object.entries(newProduct.value).forEach(([key, value]) => {
        formData.append(key, value as string);

    });

    ////exite imagen?
    if (selectedFile.value) {
        formData.append('imagen', selectedFile.value);
    }
    console.log('Contenido de FormData:', Array.from(formData.entries()));

    try {
        const productoCreado = await fetchPost('productos', formData, true);
        console.log('Producto creado:', productoCreado);
    } catch (error) {
        console.error('Error al guardar el producto:', error);
    }
};






const resetForm = () => {
    newProduct.value = {
        codigo: '',
        nombre: '',
        descripcion: '',
        stock: 0,
        stock_min: 0,
        precio_compra: undefined,
        incremento: undefined,
        id_categoria: 0,
    };
};

watch(
    () => props.product,
    (product) => {
        if (product) {
            newProduct.value = { ...product };
        } else {
            resetForm();
        }
    },
    { immediate: true }
);


onMounted(async () => {
    try {
        const response = await getCategorias();
        categories.value = response;
    } catch (error) {
        console.error('Error al cargar categorías:', error);
    }
});

///imagen
const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        selectedFile.value = input.files[0];
        previewImage.value = URL.createObjectURL(selectedFile.value);
    }
};


</script>

<template>
    <div v-if="isOpen"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div class="bg-white p-4 rounded-lg shadow-xl w-full max-w-2xl">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold">Nuevo Producto</h2>
                <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
                    <XIcon class="h-6 w-6" />
                </button>
            </div>
            <form @submit.prevent="saveProduct" class="overflow-y-auto max-h-[calc(100vh-200px)]">
                <div class="space-y-4">
                    <div>
                        <label for="codigo" class="block text-sm font-medium text-gray-700">Código</label>
                        <input type="text" id="codigo" v-model="newProduct.codigo" required
                            class="mt-1 block bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                        <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" id="nombre" v-model="newProduct.nombre" required
                            class="mt-1 block bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                        <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea id="descripcion" v-model="newProduct.descripcion" required
                            class="mt-1 block bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
                    </div>
                    <div>
                        <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
                        <input type="number" id="stock" v-model="newProduct.stock" required
                            class="mt-1 block bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                        <label for="stock_min" class="block text-sm font-medium text-gray-700">Stock Mínimo</label>
                        <input type="number" id="stock_min" v-model="newProduct.stock_min" required
                            class="mt-1 block bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                        <label for="precio_compra" class="block text-sm font-medium text-gray-700">Precio de
                            Compra</label>
                        <input type="number" id="precio_compra" v-model="newProduct.precio_compra" step="0.01"
                            class="mt-1 block bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                        <label for="incremento" class="block text-sm font-medium text-gray-700">Incremento</label>
                        <input type="number" id="incremento" v-model="newProduct.incremento" step="0.01"
                            class="mt-1 block bg-gray-200 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                        <label for="categoria" class="block text-sm font-medium text-gray-700">Categoría</label>
                        <div class="relative">
                            <select id="categoria" v-model="newProduct.id_categoria" required
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none">
                                <option value="">Seleccione una categoría</option>
                                <option v-for="category in categories" :key="category.id_categoria"
                                    :value="category.id_categoria">
                                    {{ category.nombre_categoria }}
                                </option>
                            </select>
                            <ChevronDown
                                class="absolute inset-y-0 right-0 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div>
                        <label for="imagen" class="block text-sm font-medium text-gray-700">Imagen</label>
                        <input type="file" id="imagen" @change="handleFileChange" accept="image/*"
                            class="mt-1 block w-full bg-gray-200 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                        <img v-if="previewImage" :src="previewImage" alt="Previsualización"
                            class="mt-2 max-w-full h-auto rounded-md" />
                    </div>

                </div>
                <div class="mt-6 flex justify-end space-x-3">
                    <button type="button" @click="emit('close')"
                        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>