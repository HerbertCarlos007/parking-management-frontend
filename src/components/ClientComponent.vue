<script setup>
import { ref, onMounted, reactive } from "vue";
import { SquarePen, Trash } from "lucide-vue-next";
import clientService from "@/services/client";

const clients = ref([]);
const showEditModal = ref(false);
const editingClientId = ref(null);

const clientForm = reactive({
  name: "",
  phone: "",
  email: "",
  document_number: "",
  plate: "",
  car_brand: "",
  color: "",
  id_company: null
});

const editclientForm = reactive({
  name: "",
  phone: "",
  email: "",
  document_number: "",
  plate: "",
  car_brand: "",
  color: "",
});

onMounted(() => {
  getClients();
});

const resetClientForm = () => {
  clientForm.name = "";
  clientForm.phone = "";
  clientForm.email = "";
  clientForm.document_number = "";
  clientForm.plate = "";
  clientForm.car_brand = "";
  clientForm.color = "";
  clientForm.id_company = null;
};

const openEditModal = (client) => {
  editingClientId.value = client.id;
  console.log(client.id)

  editclientForm.name = client.name;
  editclientForm.phone = client.phone;
  editclientForm.email = client.email;
  editclientForm.document_number = client.document_number;
  editclientForm.plate = client.plate;
  editclientForm.car_brand = client.car_brand;
  editclientForm.color = client.color;
  showEditModal.value = true;
};

const getClients = async () => {
  try {
    const response = await clientService.getClientsService();
    clients.value = response.data;
  } catch (error) {
    console.error();
  }
};

const createClient = async () => {
  try {
    await clientService.createClientService(clientForm);
    getClients();
    resetClientForm();
  } catch (error) {
    console.error(error);
  }
};

const updateClient = async () => {
  try {
    await clientService.updateClientService(editingClientId.value, editclientForm);
    showEditModal.value = false;
    getClients();
  } catch (error) {
    console.error(error);
  }
};

const deleteClient = async (clientId) => {
  try {
    await clientService.deleteClientService(clientId);
    getClients();
  } catch (error) {
    console.error(error);
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
            v-model="clientForm.name"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">CPF/CNPJ</label>
          <input
            type="text"
            placeholder="000.000.000-00"
            v-model="clientForm.document_number"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">E-mail</label>
          <input
            type="text"
            placeholder="email@example.com"
            v-model="clientForm.email"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Telefone</label>
          <input
            type="text"
            placeholder="(00) 00000-0000"
            v-model="clientForm.phone"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Placa do Veículo</label>
          <input
            type="text"
            placeholder="ABC-1234"
            v-model="clientForm.plate"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Marca</label>
          <input
            type="text"
            placeholder="Toyota, Honda..."
            v-model="clientForm.car_brand"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Cor</label>
          <input
            type="text"
            placeholder="Preto, Branco..."
            v-model="clientForm.color"  
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </form>
      <button
        @click="createClient()"
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
                @click="deleteClient(client.id)"
                color="#e01b24"
                class="cursor-pointer"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

    <div v-if="showEditModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
  <div class="bg-secondary  p-10 rounded-lg border border-border">
    <h2 class="text-white text-2xl mb-4">Editar Cliente</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
      <div>
        <label class="text-sm text-gray-400">Nome</label>
        <input v-model="editclientForm.name" class="w-full bg-black border border-border rounded px-4 py-2" />
      </div>

      <div>
        <label class="text-sm text-gray-400">E-mail</label>
        <input v-model="editclientForm.email" class="w-full bg-black border border-border rounded px-4 py-2" />
      </div>

      <div>
        <label class="text-sm text-gray-400">Telefone</label>
        <input v-model="editclientForm.phone" class="w-full bg-black border border-border rounded px-4 py-2" />
      </div>

      <div>
        <label class="text-sm text-gray-400">CPF/CNPJ</label>
        <input v-model="editclientForm.document_number" class="w-full bg-black border border-border rounded px-4 py-2" />
      </div>

      <div>
        <label class="text-sm text-gray-400">Placa</label>
        <input v-model="editclientForm.plate" class="w-full bg-black border border-border rounded px-4 py-2" />
      </div>

       <div>
        <label class="text-sm text-gray-400">Marca</label>
        <input v-model="editclientForm.car_brand" class="w-full bg-black border border-border rounded px-4 py-2" />
      </div>

        <div>
        <label class="text-sm text-gray-400">Cor</label>
        <input v-model="editclientForm.color" class="w-full bg-black border border-border rounded px-4 py-2" />
      </div>

    </div>

    <div class="flex justify-end gap-4 mt-6">
      <button @click="showEditModal = false" class="px-4 py-2 border border-border text-white rounded">
        Cancelar
      </button>

      <button @click="updateClient()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
        Salvar
      </button>
    </div>
  </div>
</div>
</template>

<style scoped></style>
