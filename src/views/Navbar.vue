<template>
  <nav class="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <a href="/" @click.prevent="goHome" class="text-xl font-bold text-indigo-600 hover:text-indigo-500">
              HRS AgroShop
            </a>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <div class="flex space-x-4">
            <template v-if="!userStore.user">
              <router-link to="/"
                class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <LogInIcon class="h-5 w-5 mr-1" />
                Login
              </router-link>
              <router-link to="/registro"
                class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <UserPlusIcon class="h-5 w-5 mr-1" />
                Registro
              </router-link>
            </template>
            <template v-else>
              <router-link to="/home" @click.prevent="goHome"
                class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <HomeIcon class="h-5 w-5 mr-1" />
                Home
              </router-link>
              <span class="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Bienvenido, {{ userStore.user.nombre }} {{ userStore.user.apellido }}
              </span>
              <button @click="handleLogout"
                class="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out">
                <LogOutIcon class="h-5 w-5 mr-1" />
                Cerrar Sesión
              </button>
            </template>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button @click="toggleNavbar"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span class="sr-only">Abrir menú principal</span>
            <MenuIcon v-if="!isNavbarOpen" class="block h-6 w-6" />
            <XIcon v-else class="block h-6 w-6" />
          </button>
        </div>
      </div>
    </div>

    <div :class="{ 'block': isNavbarOpen, 'hidden': !isNavbarOpen }" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <template v-if="!userStore.user">
          <router-link to="/"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
            <LogInIcon class="h-5 w-5 mr-1 inline text-gray-700" />
            Login
          </router-link>
          <router-link to="/registro"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
            <UserPlusIcon class="h-5 w-5 mr-1 inline text-gray-700" />
            Registro
          </router-link>
        </template>
        <template v-else>
          <router-link to="/home" @click.prevent="goHome"
            class="text-gray-700 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
            <HomeIcon class="h-5 w-5 mr-1 inline text-gray-700" />
            Home
          </router-link>
          <span class="text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
            Bienvenido, {{ userStore.user.nombre }} {{ userStore.user.apellido }}
          </span>
          <button @click="handleLogout"
            class="text-white bg-red-600 hover:bg-red-700 block w-full text-left px-3 py-2 rounded-md text-base font-medium">
            <LogOutIcon class="h-5 w-5 mr-1 inline text-white" />
            Cerrar Sesión
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MenuIcon, XIcon, LogInIcon, UserPlusIcon, HomeIcon, LogOutIcon } from 'lucide-vue-next';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const isNavbarOpen = ref(false);

const toggleNavbar = () => {
  isNavbarOpen.value = !isNavbarOpen.value;
};

const handleLogout = () => {
  try {
    userStore.logout();  
    router.push('/'); 
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

//dependiendo del rol del usuario se redirecciona a diferente ruta
const goHome = () => {
  if (userStore.user) {
    const userRole = userStore.user.rol_id;
    if (userRole === 1) {
      router.push('/admin');
    } else if (userRole === 2) {
      router.push('/vendedor');
    } else if (userRole === 3) {
      router.push('/cliente');
    }
  } else {
    router.push('/');
  }
};
</script>
