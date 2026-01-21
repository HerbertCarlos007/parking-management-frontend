<script setup>
import { ref, onMounted, reactive } from "vue";
import parkingSpotService from "@/services/parkingSpot.js";

const parkingSpotsStatus = ref([]);
const spotsStats = ref({
  available: 0,
  occupied: 0,
  total: 0,
});

const spotForm = reactive({
  code: "",
});

onMounted(() => {
  getSpotsStatus();
  getParkingSpotsStatus();
});

const getParkingSpotsStatus = async () => {
  try {
    const response = await parkingSpotService.getParkingSpotsStatusService();
    parkingSpotsStatus.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const getSpotsStatus = async () => {
  try {
    const response = await parkingSpotService.getSpotsStatsService();
    spotsStats.value = response;
  } catch (error) {}
};

const createSpot = async () => {
  try {
    await parkingSpotService.createSpotService(spotForm);
    getSpotsStatus();
    getParkingSpotsStatus();
  } catch (error) {}
};
</script>

<template>
  <div>
    <h1 class="text-3xl text-white">Gerenciamento de Vagas</h1>
    <span class="text-gray-400"
      >Cadastre novas vagas e monitore o status em tempo real</span
    >
  </div>

  <div class="flex gap-4 mt-10">
    <div
      class="flex-1 flex-col h-36 bg-secondary text-card-foreground flex items-center justify-center rounded-xl border border-border shadow-sm"
    >
      <span class="text-white">Total de Vagas</span>
      <span class="text-white mt-2 text-2xl">{{ spotsStats.total }}</span>
    </div>

    <div
      class="flex-1 h-36 flex-col bg-secondary text-card-foreground flex items-center justify-center rounded-xl border border-border shadow-sm"
    >
      <span class="text-white">Ocupadas</span>
      <span class="text-red-600 mt-2 text-2xl">{{ spotsStats.occupied }}</span>
    </div>

    <div
      class="flex-1 h-36 flex-col bg-secondary text-card-foreground flex items-center justify-center rounded-xl border border-border shadow-sm"
    >
      <span class="text-white">Disponíveis</span>
      <span class="text-green-500 mt-2 text-2xl">{{
        spotsStats.available
      }}</span>
    </div>
  </div>

  <div
    class="w-full bg-secondary border border-border rounded-xl mt-10 p-6 shadow-md"
  >
    <h2 class="text-white text-2xl font-semibold mb-4">Cadastrar Nova Vaga</h2>

    <form class="w-full">
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-400"> Número / Identificação </label>

        <input
          type="text"
          v-model="spotForm.code"
          placeholder="Ex: A1, B5, C10"
          class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
        />
      </div>
    </form>

    <button
      @click="createSpot()"
      class="w-full mt-6 text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition shadow-md"
    >
      + Adicionar Vaga
    </button>
  </div>

  <h1 class="text-3xl text-white mt-10">Status das Vagas</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
    <div
      v-for="spot in parkingSpotsStatus"
      :key="spot.id"
      class="h-64 flex flex-col p-5 bg-secondary text-card-foreground rounded-xl border border-border shadow-sm"
    >
      <!-- Topo -->
      <div class="w-full flex items-start justify-between">
        <section class="flex flex-col">
          <span class="text-white font-semibold">{{ spot.code }}</span>

          <span
            class="text-sm"
            :class="
              spot.status === 'Ocupada' ? 'text-red-500' : 'text-green-500'
            "
          >
            {{ spot.status }}
          </span>
        </section>

        <section
          class="flex items-center justify-center w-7 h-7 rounded-full border"
          :class="
            spot.status === 'Ocupada'
              ? 'border-red-500 text-red-500'
              : 'border-green-500 text-green-500'
          "
        >
          {{ spot.status === "Ocupada" ? "X" : "✓" }}
        </section>
      </div>

      <div class="bg-border h-0.5 mt-5"></div>

      <!-- 🔴 Se estiver OCUPADA -->
      <div
        v-if="spot.status === 'Ocupada'"
        class="w-full flex items-start justify-between mt-5"
      >
        <section class="flex flex-col">
          <span class="text-gray-400 text-sm">Placa</span>
          <span class="text-gray-400 text-sm">Entrada</span>
          <span class="text-gray-400 text-sm">Plano</span>
        </section>

        <section class="flex flex-col">
          <span class="text-white font-semibold">
            {{ spot.entry?.plate }}
          </span>
          <span class="text-white font-semibold">
            {{ spot.entry?.entered_at }}
          </span>
          <span class="text-white font-semibold">
            {{ spot.entry?.type_entry }}
          </span>
        </section>
      </div>

      <!-- 🟢 Se estiver DISPONÍVEL -->
      <div
        v-else
        class="flex-1 flex items-center justify-center text-green-500 font-semibold"
      >
        Vaga livre
      </div>
    </div>
  </div>
</template>

<style scoped></style>
