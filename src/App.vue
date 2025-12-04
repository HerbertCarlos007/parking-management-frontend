<script setup>
import SidebarComponent from './components/SidebarComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <div class="w-full min-h-screen bg-primary flex flex-col">
    
    <!-- HEADER -->
    <HeaderComponent />

    <!-- CORPO: SIDEBAR + CONTEÚDO -->
    <div class="flex flex-1">

      <!-- SIDEBAR -->
      <SidebarComponent />

      <!-- CONTEÚDO DAS ROTAS -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view />
      </main>

    </div>
  </div>
</template>

<style scoped>

</style>
