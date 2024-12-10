<script setup lang="ts">
import Navbar from './views/Navbar.vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();
const userData = localStorage.getItem('userData');

if (userData) {
  userStore.setUser(JSON.parse(userData));  
}
</script>

<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<style>
body {
  padding-top: 56px;
}
</style>
