<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/api/users';

const router = useRouter();
const registroData = ref({
  nombre: '',
  apellido: '',
  email: '',
  usuario: '',
  password: '',
  password_confirmation: '',
});

const errorMessage = ref('');
const successMessage = ref('');

const handleRegistro = async () => {
  try {
    const response = await registerUser(registroData.value);
    successMessage.value = 'Registro exitoso. Por favor, inicia sesión.';
    setTimeout(() => router.push('/'), 200);
  } catch (error) {
    errorMessage.value = 'Error en el registro. Por favor, intenta de nuevo.';
    console.error('Error de registro:', error);
  }
};
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear una cuenta
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegistro">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="nombre" class="sr-only">Nombre</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="registroData.nombre" id="nombre" name="nombre" type="text" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre" />
            </div>
          </div>
          <div>
            <label for="apellido" class="sr-only">Apellido</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="registroData.apellido" id="apellido" name="apellido" type="text" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Apellido" />
            </div>
          </div>
          <div>
            <label for="email" class="sr-only">Correo electrónico</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="registroData.email" id="email" name="email" type="email" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico" />
            </div>
          </div>
          <div>
            <label for="usuario" class="sr-only">Usuario</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="registroData.usuario" id="usuario" name="usuario" type="text" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Usuario" />
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="registroData.password" id="password" name="password" type="password" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña" />
            </div>
          </div>
          <div>
            <label for="password_confirmation" class="sr-only">Confirmar contraseña</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="registroData.password_confirmation" id="password_confirmation"
                name="password_confirmation" type="password" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar contraseña" />
            </div>
          </div>
        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Registrarse
          </button>
        </div>
      </form>

      <div v-if="successMessage" class="mt-4 p-4 rounded-md bg-green-50 flex items-center">
        <CheckCircleIcon class="h-5 w-5 text-green-400 mr-2" />
        <span class="text-green-700">{{ successMessage }}</span>
      </div>
      <div v-if="errorMessage" class="mt-4 p-4 rounded-md bg-red-50 flex items-center">
        <AlertCircleIcon class="h-5 w-5 text-red-400 mr-2" />
        <span class="text-red-700">{{ errorMessage }}</span>
      </div>
    </div>
  </main>
</template>