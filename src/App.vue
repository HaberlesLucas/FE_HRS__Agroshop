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
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

.content-wrapper {
  padding-top: 64px;
}
</style>
