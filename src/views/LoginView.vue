<script setup lang="ts">
import { login } from '@/api/users';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';

const router = useRouter();
const userStore = useUserStore();

const loginData = {
  identificador: '',
  password: '',
};

let successMessage = '';
let errorMessage = '';

const handleLogin = async () => {
  try {
    //identificar si es un email o un nombre de usuario
    const isEmail = loginData.identificador.includes('@');
    const requestData = isEmail
      ? { email: loginData.identificador, password: loginData.password }
      : { usuario: loginData.identificador, password: loginData.password };

    //llamada a la API
    const response = await login(requestData);

    if (response.token && response.user) {
      successMessage = 'Inicio de sesión exitoso.';
      localStorage.setItem('authToken', response.token); //guardar token
      // console.log('Token guardado:', localStorage.getItem('authToken'));
      
      localStorage.setItem('userData', JSON.stringify(response.user)); //guardar datos del usuario

      userStore.setUser(response.user);
      const userRole = response.user.rol_id;

      // redirigir según el rol
      switch (userRole) {
        case 1:
        case 2:
          router.push('/panel');
          break;
        case 3:
          router.push('/cliente');
          break;
        default:
          router.push('/home');
          break;
      }
    } else {
      errorMessage = 'Credenciales incorrectas. Por favor, verifica tus datos.';
      successMessage = '';
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    errorMessage = 'Ocurrió un error inesperado. Intenta de nuevo.';
    successMessage = '';
  }
};
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar sesión
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="identificador" class="sr-only">Correo electrónico o Usuario</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="loginData.identificador" id="identificador" name="identificador" type="text" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico o Usuario" />
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="loginData.password" id="password" name="password" type="password" required
                class="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña" />
            </div>
          </div>
        </div>

        <div>
          <button type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Iniciar sesión
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
