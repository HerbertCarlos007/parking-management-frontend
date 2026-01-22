<script setup>
import { ref, onMounted } from "vue";
import { SquarePen, Trash } from "lucide-vue-next";
import clienteService from "@/services/client";

const clients = ref([]);

onMounted(() => {
  getClients();
});

const getClients = async () => {
  try {
    const response = await clienteService.getClientsService();
    clients.value = response.data;
  } catch (error) {
    console.error();
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl text-white">Gestão de Clientes e Veículos</h1>
    <span class="text-gray-400"
      >Cadastre e gerencie clientes e seus veículos</span
    >
  </div>

  <div class="w-full bg-secondary border-2 border-border rounded-md mt-5 p-6">
    <span class="text-white">Novo Cliente</span>

    <div class="mt-2">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Nome</label>
          <input
            type="text"
            placeholder="Nome completo"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">CPF/CNPJ</label>
          <input
            type="text"
            placeholder="000.000.000-00"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">E-mail</label>
          <input
            type="text"
            placeholder="email@example.com"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Telefone</label>
          <input
            type="text"
            placeholder="(00) 00000-0000"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Placa do Veículo</label>
          <input
            type="text"
            placeholder="ABC-1234"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Marca</label>
          <input
            type="text"
            placeholder="Toyota, Honda..."
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Cor</label>
          <input
            type="text"
            placeholder="Preto, Branco... "
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </form>
      <button
        class="w-full mt-6 text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition shadow-md"
      >
        + Adicionar Cliente
      </button>
    </div>
  </div>
  <h1 class="text-2xl text-white mt-10">Lista de Clientes</h1>
  <div
    class="w-full p-6 mt-4 bg-black text-white rounded-md border border-border"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse">
        <thead>
          <tr
            class="border-b border-border text-left text-sm uppercase text-gray-400"
          >
            <th class="py-3 px-4">Nome</th>
            <th class="py-3 px-4">CPF/CNPJ</th>
            <th class="py-3 px-4">Marca/Cor</th>
            <th class="py-3 px-4">Telefone</th>
            <th class="py-3 px-4">Ações</th>
          </tr>
        </thead>

        <tbody class="text-sm">
          <tr
            v-for="client in clients"
            :key="client.id"
            class="border-b border-border hover:bg-gray-900 transition"
          >
            <td class="py-4 px-4 font-semibold">{{ client.name }}</td>
            <td class="py-4 px-4 text-gray-300">{{ client.email }}</td>
            <td class="py-4 px-4 text-gray-400">
              {{ client.car_brand }} - {{ client.color }}
            </td>
            <td class="py-4 px-4 text-gray-400">{{ client.phone }}</td>

            <td class="flex gap-2 py-4 px-4 text-gray-400">
              <SquarePen
                @click="openEditModal(client)"
                class="cursor-pointer"
              />
              <Trash
                @click="deleteUser(user.id)"
                color="#e01b24"
                class="cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
