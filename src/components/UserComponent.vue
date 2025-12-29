<script setup>
import { ref, onMounted, reactive } from "vue";  
import { SquarePen, Trash } from "lucide-vue-next";
import userService from "@/services/user.js";

const users = ref([]);

const userForm = reactive({
  name: "",
  email: "",
  password: "",
  phone_number: "",
  role: "",
});

onMounted(() => {
  getUsers()
});

const getUsers = async () => {
  try {
    const response = await userService.getUsersService();
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const createUser = async () => {
  try {
    await userService.createUserService(userForm);
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <div class="w-full flex justify-between items-center">
    <section class="text-white">
      <h1 class="text-3xl">Gestão de Funcionários</h1>
      <span class="text-gray-400"
        >Cadastre e gerencie funcionários do estacionamento</span
      >
    </section>
  </div>

  <div class="w-full bg-secondary border-2 border-border rounded-md mt-5 p-6">
    <h2 class="text-white text-2xl">Novo Funcionário</h2>

    <form class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
      <div class="flex flex-col gap-2 mt-2">
        <label class="text-sm text-gray-300">Nome</label>
        <input
          type="text"
          placeholder="Nome completo"
          v-model="userForm.name"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <div class="flex flex-col gap-2 mt-2">
        <label class="text-sm text-gray-300">E-mail</label>
        <input
          type="text"
          placeholder="email@example"
          v-model="userForm.email"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Senha</label>
        <input
          type="password"
          placeholder="********"
          v-model="userForm.password"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Telefone</label>
        <input
          type="text"
          placeholder="(99) 99999-9999"
          v-model="userForm.phone_number"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm text-gray-300">Cargo</label>
        <select
          v-model="userForm.role"
          class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
        >
          <option value="">Selecione uma cargo</option>
          <option value="Administrador">Administrador</option>
          <option value="Gerente">Gerente</option>
          <option value="Usuario">Usuario</option>
        </select>
      </div>
    </form>
    <button
      @click="createUser()"
      class="w-full mt-5 text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-medium"
    >
      + Adicionar Funcionário
    </button>
  </div>

  <h1 class="text-2xl text-white mt-10">Lista de Funcionários</h1>
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
            <th class="py-3 px-4">Email</th>
            <th class="py-3 px-4">Telefone</th>
            <th class="py-3 px-4">Cargo</th>
            <th class="py-3 px-4">Ações</th>
          </tr>
        </thead>

        <tbody class="text-sm">
          <tr v-for="user in users" :key="user.id" class="border-b border-border hover:bg-gray-900 transition">
            <td class="py-4 px-4 font-semibold">{{ user.name }}</td>
            <td class="py-4 px-4 text-gray-300">{{ user.email }}</td>
            <td class="py-4 px-4 text-gray-400">{{ user.phone_number }}</td>
            <td class="py-4 px-4 text-gray-400">{{ user.role }}</td>

            <td class="flex gap-2 py-4 px-4 text-gray-400">
              <SquarePen class="cursor-pointer" />
              <Trash color="#e01b24" class="cursor-pointer" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
