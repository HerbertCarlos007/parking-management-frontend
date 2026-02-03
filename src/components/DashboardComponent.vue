<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import parkingSpotService from "@/services/parkingSpot.js";
import PieChartComponent from "@/components/PieChartComponent.vue";
import LineChartComponent from "./LineChartComponent.vue";
import { CircleParking, TrendingUp, CircleAlert } from "lucide-vue-next";

const spotsStats = ref({
  available: 0,
  occupied: 0,
  total: 0,
  available_percent: 0,
  occupied_percent: 0,
});

const getSpotsStatus = async () => {
  try {
    const response = await parkingSpotService.getSpotsStatsService();
    spotsStats.value = response;
    createChart();
  } catch (error) {}
};

onMounted(async () => {
  getSpotsStatus();
});
</script>

<template>
  <div>
    <h1 class="text-3xl text-white">Dashboard</h1>
    <span class="text-gray-400"
      >Visão geral do seu estacionamento em tempo real</span
    >
  </div>

  <div class="flex gap-4 mt-10">
    <div
      class="flex-1 flex flex-col h-36 bg-secondary text-card-foreground items-center justify-center rounded-xl border border-border shadow-sm"
    >
      <!-- Texto com ícone -->
      <div class="flex items-center gap-2">
        <span class="text-white">Total de Vagas</span>
        <CircleParking color="#037bfc" />
      </div>

      <span class="text-white mt-2 text-2xl">{{ spotsStats.total }}</span>
    </div>

    <div
      class="flex-1 h-36 flex-col bg-secondary text-card-foreground flex items-center justify-center rounded-xl border border-border shadow-sm"
    >
      <div class="flex items-center gap-2">
        <span class="text-white">Ocupadas </span>
        <CircleAlert color="#cf0c0c" />
      </div>
      <span class="text-red-600 mt-2 text-2xl">{{ spotsStats.occupied }} </span>
    </div>

    <div
      class="flex-1 h-36 flex-col bg-secondary text-card-foreground flex items-center justify-center rounded-xl border border-border shadow-sm"
    >
      <div class="flex items-center gap-2">
        <span class="text-white">Disponíveis </span>
        <CircleParking color="#0e990e" />
      </div>
      <span class="text-green-500 mt-2 text-2xl">{{
        spotsStats.available
      }}</span>
    </div>

    <div
      class="flex-1 h-36 flex-col bg-secondary text-card-foreground flex items-center justify-center rounded-xl border border-border shadow-sm"
    >
      <div class="flex items-center gap-2">
        <span class="text-white">Receita Hoje</span>
        <TrendingUp color="#037bfc"/>
      </div>
      <span class="text-white mt-2 text-2xl">R$ 1.240 </span>
    </div>
  </div>

  <div class="w-full flex gap-6 mt-10">
    <div class="w-1/2">
      <LineChartComponent />
    </div>

    <div class="w-1/2">
      <PieChartComponent />
    </div>
  </div>
</template>
