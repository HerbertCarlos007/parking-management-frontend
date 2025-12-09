<script setup>
import { ref, onMounted } from 'vue';
import parkingEntry from '@/services/parkingEntry';

const parkEntriesOpen = ref([]) ;
const isFormOpen = ref(false);

const toggleForm = () => {
  isFormOpen.value = !isFormOpen.value;
};

onMounted(() => {
  getParkingEntries();
});

const getParkingEntries = async () => {
  try {
    const response = await parkingEntry.getParkingEntriesService('Aberta');
    parkEntriesOpen.value = response.data;
  } catch (error) {
    
  }
};

</script>

<template>
  <div class="w-full flex justify-between items-center">
    <section class="text-white">
      <h1 class="text-3xl">Entrada/Saída</h1>
      <span class="text-gray-400">Registre a entrada e saída de veículos</span>
    </section>

    <section>
      <button v-if="isFormOpen" @click="toggleForm()" class="bg-blue-500 text-white p-2 rounded-md">
        Fechar
      </button>


      <button v-else  @click="toggleForm()" class="bg-blue-500 text-white p-2 rounded-md">
        + Nova Entrada
      </button>

      
    </section>
  </div>

  <div v-if="isFormOpen"  class="w-full bg-secondary border-2 border-border rounded-md mt-5 p-6">
    <form class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
      <!-- Placa do Veículo -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Placa do Veículo</label>
        <input
          type="text"
          placeholder="ABC-1234"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <!-- Tipo de Cliente -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Tipo de Cliente</label>
        <select
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        >
          <option>Ocasional</option>
          <option>Mensalista</option>
        </select>
      </div>

      <!-- Nome do Cliente -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Nome do Cliente (opcional)</label>
        <input
          type="text"
          placeholder="Nome do cliente"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <!-- Vaga Disponível -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Vaga Disponível</label>
        <select
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        >
          <option>Selecione uma vaga</option>
          <option>A1</option>
          <option>A2</option>
          <option>B1</option>
        </select>
      </div>

      <!-- Botões -->
      <div class="flex items-center gap-4 mt-4">
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium"
        >
          Registrar Entrada
        </button>

        <button
          @click="openForm()"
          type="button"
          class="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-md font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>

  <h1 class="text-2xl text-white mt-10">Veículos em Estacionamento ({{ parkEntriesOpen.length  }})</h1>

  <div
    v-if="parkEntriesOpen.length > 0"
    class="w-80 text-white border-2 border-[#04233a] rounded-md p-4 mt-5 bg-secondary flex flex-col gap-2 shadow-lg"
  >
  <div v-for="parkEntry in parkEntriesOpen" :key="parkEntry.id">
    <h2 class="text-2xl font-semibold mb-2">{{ parkEntry.plate }}</h2>

    <div class="text-sm text-gray-300 flex flex-col gap-1 mb-2">
      <span><strong class="text-white mb-2">Cliente:</strong> {{ parkEntry.client_name }}</span>
      <!-- <span><strong class="text-white">Vaga:</strong> Comum</span> -->
      <span><strong class="text-white mb-2">Tipo:</strong> {{ parkEntry.type_entry }}</span>
    </div>

    <div class="mt-3text-xs text-gray-200 mb-2">{{ parkEntry.entered_at }}</div>
    </div>
    <button class="bg-red-500 p-1 rounded-md">Registrar Saída</button>
    
  </div>

  <div
    v-else
    class="w-full h-20 bg-secondary border-2 border-border rounded-md mt-5 flex justify-center text-center items-center"
  >
    <span class="text-white">Nenhum veículo em estacionamento</span>
  </div>

  <h1 class="text-2xl text-white mt-10">Histórico Recente</h1>

  <div
    class="w-full p-6 mt-4 bg-black text-white rounded-md border border-border"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr
            class="border-b border-border text-left text-sm uppercase text-gray-400"
          >
            <th class="py-3 px-4">Placa</th>
            <th class="py-3 px-4">Cliente</th>
            <th class="py-3 px-4">Tipo</th>
            <th class="py-3 px-4">Vaga</th>
            <th class="py-3 px-4">Entrada</th>
            <th class="py-3 px-4">Saída</th>
            <th class="py-3 px-4 text-right">Valor</th>
          </tr>
        </thead>

        <tbody class="text-sm">
          <tr class="border-b border-border hover:bg-gray-900 transition">
            <td class="py-4 px-4 font-semibold">GHS5D98</td>
            <td class="py-4 px-4 text-gray-300">Diego</td>
            <td class="py-4 px-4 text-gray-400">Ocasional</td>
            <td class="py-4 px-4 text-gray-400">(comum)</td>
            <td class="py-4 px-4 text-gray-400">17:04:25</td>
            <td class="py-4 px-4 text-gray-400">17:23:49</td>
            <td class="py-4 px-4 text-right font-semibold">R$ 249485.00</td>
          </tr>

          <tr class="border-b border-border hover:bg-gray-900 transition">
            <td class="py-4 px-4 font-semibold">5555555</td>
            <td class="py-4 px-4 text-gray-300">teste</td>
            <td class="py-4 px-4 text-gray-400">Ocasional</td>
            <td class="py-4 px-4 text-gray-400">(comum)</td>
            <td class="py-4 px-4 text-gray-400">21:13:30</td>
            <td class="py-4 px-4 text-gray-400">21:13:35</td>
            <td class="py-4 px-4 text-right font-semibold">R$ 252721.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
