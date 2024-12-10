<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { UserCog, Newspaper } from 'lucide-vue-next';

const userStore = useUserStore();
const isAdmin = computed(() => userStore.user?.rol_id === 1); //solo administradores
</script>


<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-3xl font-extrabold text-gray-900 mb-6">Panel de Gestión</h1>
          <div class="space-y-6">
            <div class="bg-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <PackageIcon class="h-6 w-6 mr-2 text-cyan-500" />
                <Newspaper />
                Productos
              </h3>
              <button @click="$router.push('/productos')"
                class="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Administrar Productos
              </button>

            </div>

            <div v-if="isAdmin"
              class="bg-gray-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <UsersIcon class="h-6 w-6 mr-2 text-green-500" />
                <UserCog />
                Usuarios
              </h3>
              <button
                class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                Administrar Usuarios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>