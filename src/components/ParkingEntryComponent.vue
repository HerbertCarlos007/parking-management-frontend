<script setup>
import { ref, onMounted, reactive } from "vue";
import parkingEntryService from "@/services/parkingEntry";
import clientService from "@/services/client";
import parkingSpotService from "@/services/parkingSpot";

const parkEntriesOpen = ref([]);
const clients = ref([]);
const parkingSpotsAvailables = ref([]);
const parkEntriesClosed = ref([]);
const isFormOpen = ref(false);

const parkingEntryForm = reactive({
  plate: "",
  type_entry: "",
  client_id: "",
  spot_id: "",
  "model": "",
  "color": ""
});

const toggleForm = () => {
  isFormOpen.value = !isFormOpen.value;
};

onMounted(() => {
  getParkingEntriesOpen();
  getParkingEntriesClosed();
  getClients();
  getParkingSpotsAvailables();
});

const getParkingEntriesOpen = async () => {
  try {
    const response = await parkingEntryService.getParkingEntriesService(
      "Aberta"
    );
    parkEntriesOpen.value = response.data;
  } catch (error) {}
};

const getParkingEntriesClosed = async () => {
  try {
    const response = await parkingEntryService.getParkingEntriesService(
      "Fechada"
    );
    parkEntriesClosed.value = response.data;
  } catch (error) {}
};

const getClients = async () => {
  try {
    const response = await clientService.getClientsService();
    clients.value = response.data;
  } catch (error) {}
};

const getParkingSpotsAvailables = async () => {
  try {
    const response =
      await parkingSpotService.getParkingSpotsAvailablesService();
    parkingSpotsAvailables.value = response.data;
  } catch (error) {}
};

const registerParkingEntry = async () => {
  try {
    const response = await parkingEntryService.createParkingEntryService(
      parkingEntryForm
    );
    getParkingEntriesOpen();
    toggleForm();
  } catch (error) {
    console.error(error);
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
      <button
        v-if="isFormOpen"
        @click="toggleForm()"
        class="bg-blue-500 text-white p-2 rounded-md"
      >
        Fechar
      </button>

      <button
        v-else
        @click="toggleForm()"
        class="bg-blue-500 text-white p-2 rounded-md"
      >
        + Nova Entrada
      </button>
    </section>
  </div>

  <div
    v-if="isFormOpen"
    class="w-full bg-secondary border-2 border-border rounded-md mt-5 p-6"
  >
    <form @submit.prevent="registerParkingEntry()" class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
      <!-- Placa do Veículo -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Placa do Veículo</label>
        <input
          type="text"
          placeholder="ABC-1234"
          v-model="parkingEntryForm.plate"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Modelo de Veículo</label>
        <input
          type="text"
          placeholder="HRV"
          v-model="parkingEntryForm.model"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

       <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">CorVeículo</label>
        <input
          type="text"
          placeholder="PRATA"
          v-model="parkingEntryForm.color"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <!-- Tipo de Cliente -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Tipo de Cliente</label>
        <select
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          v-model="parkingEntryForm.type_entry"
        >
          <option value="">Selecione um cliente</option>
          <option value="Ocasional">Ocasional</option>
          <option value="Mensal">Mensal</option>
        </select>
      </div>

      <!-- Nome do Cliente -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">
          Nome do Cliente (opcional)
        </label>

        <select
        v-model="parkingEntryForm.client_id"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600 text-gray-300"
        >
          <option value="">Selecione um cliente</option>
          <option v-for="client in clients" :key="client.id" :value="client.id">
            {{ client.name }}
          </option>
        </select>
      </div>

      <!-- Vaga Disponível -->
      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Vaga Disponível</label>
        <select
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          v-model="parkingEntryForm.spot_id"
        >
          <option value="">Selecione uma vaga</option>
          <option
            v-for="parkingSpot in parkingSpotsAvailables"
            :key="parkingSpot.id"
            :value="parkingSpot.id"
          >
            {{ parkingSpot.code }}
          </option>
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
          @click="toggleForm()"
          type="button"
          class="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-md font-medium"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>

  <h1 class="text-2xl text-white mt-10">
    Veículos em Estacionamento ({{ parkEntriesOpen.length }})
  </h1>

<div
  v-if="parkEntriesOpen.length > 0"
 class="grid grid-cols-3 2xl:grid-cols-4 gap-4 mt-5"

>
  <div
    v-for="parkEntryOpen in parkEntriesOpen"
    :key="parkEntryOpen.id"
    class="w-80 text-white border-2 border-[#04233a] rounded-md p-4 bg-secondary flex flex-col gap-2 shadow-lg"
  >
    <h2 class="text-2xl font-semibold mb-2">
      {{ parkEntryOpen.plate }}
    </h2>

    <div class="text-sm text-gray-300 flex flex-col gap-1 mb-2">
      <span>
        <strong class="text-white">Cliente:</strong>
        {{ parkEntryOpen.client_name }}
      </span>

      <span>
        <strong class="text-white">Tipo:</strong>
        {{ parkEntryOpen.type_entry }}
      </span>

      <span>
        <strong class="text-white">Modelo:</strong>
        {{ parkEntryOpen.model }} - {{ parkEntryOpen.color }}
      </span>
    </div>

    <div class="text-xs text-gray-200 mb-2">
      {{ parkEntryOpen.entered_at }}
    </div>

    <button class="bg-red-500 p-1 rounded-md hover:bg-red-600">
      Registrar Saída
    </button>
  </div>
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
            <!-- <th class="py-3 px-4">Vaga</th> -->
            <th class="py-3 px-4">Entrada</th>
            <th class="py-3 px-4">Saída</th>
            <th class="py-3 px-4 text-right">Valor</th>
          </tr>
        </thead>

        <tbody class="text-sm">
          <tr
            v-for="parkEntryClosed in parkEntriesClosed"
            :key="parkEntryClosed.id"
            class="border-b border-border hover:bg-gray-900 transition"
          >
            <td class="py-4 px-4 font-semibold">{{ parkEntryClosed.plate }}</td>
            <td class="py-4 px-4 text-gray-300">
              {{ parkEntryClosed.client_name }}
            </td>
            <td class="py-4 px-4 text-gray-400">
              {{ parkEntryClosed.type_entry }}
            </td>
            <!-- <td class="py-4 px-4 text-gray-400">(comum)</td> -->
            <td class="py-4 px-4 text-gray-400">
              {{ parkEntryClosed.entered_at }}
            </td>
            <td class="py-4 px-4 text-gray-400">
              {{ parkEntryClosed.left_at }}
            </td>
            <td class="py-4 px-4 text-right font-semibold">
              R$ {{ parkEntryClosed.price }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
