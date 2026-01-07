<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'  
import SidebarComponent from './components/SidebarComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import LoginComponent from './components/LoginComponent.vue';

const route = useRoute()
const isLoginPage = computed(() => route.path === '/login')

</script>

<template>
  <!-- LOGIN -->
  <router-view v-if="isLoginPage" />

  <!-- SISTEMA -->
  <div v-else class="w-full min-h-screen bg-primary flex flex-col">
    <HeaderComponent />

    <div class="flex flex-1">
      <SidebarComponent />

      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>


<style scoped>

</style>
