<script setup lang="ts">
import { onMounted, toRefs } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { SquarePen, Trash2 } from 'lucide-vue-next';

//acceder al store de productos
const productStore = useProductStore();

// desestructurar los valores reactivos del store
const { products, isCargando, error } = toRefs(productStore);

// función para obtener los productos
const fetchProducts = async () => {
  await productStore.fetchProducts();
};

//emitir eventos hacia el componente padre (product list view)
const emit = defineEmits(['edit', 'delete']);

// emmitir el producto para editar
const editProduct = (product: any) => {
  emit('edit', product);
};

//eliminar producto
const deleteProduct = async (id: number) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    await productStore.removeProduct(id);
    await fetchProducts();
  }
};

onMounted(fetchProducts);
</script>



<template>
  <div class="bg-gray-100 p-4">
    <div class="bg-white shadow rounded">
      <h1 class="text-xl text-gray-900 p-4 border-b">Listado de Productos</h1>

      <div v-if="isCargando" class="text-center py-4">
        <span>Cargando...</span>
      </div>

      <div v-if="error" class="text-center text-red-500 py-4">
        <span>{{ error }}</span>
      </div>

      <div v-if="!isCargando && !error" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 text-left">
              <th class="p-3">Código</th>
              <th class="p-3">Nombre</th>
              <th class="p-3">Descripción</th>
              <th class="p-3">Categoría</th>
              <th class="p-3">Stock</th>
              <th class="p-3">Precio Compra</th>
              <th class="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id_producto" class="border-b hover:bg-gray-50">
              <td class="p-3">{{ product.codigo }}</td>
              <td class="p-3">{{ product.nombre }}</td>
              <td class="p-3">{{ product.descripcion }}</td>
              <td class="p-3">{{ product.categoria.nombre_categoria }}</td>
              <td class="p-3">{{ product.stock }}</td>
              <td class="p-3">{{ product.precio_compra || 'N/A' }}</td>
              <td class="p-3">
                <div class="flex space-x-2">
                  <button @click="editProduct(product)" class="text-blue-500 hover:text-blue-700">
                    <SquarePen class="w-5 h-5" />
                  </button>
                  <button @click="deleteProduct(product.id_producto)" class="text-red-500 hover:text-red-700">
                    <Trash2 class="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
