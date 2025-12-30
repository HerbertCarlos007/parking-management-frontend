<script setup>
import { useRouter, useRoute } from "vue-router";
import {
  LayoutGrid,
  ArrowLeftRight,
  SquareParking,
  Users,
  Car,
  Wallet,
  ChartColumn,
  Settings,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <div
    class="w-64 min-h-screen bg-secondary text-white p-4 border-r-2 border-border"
  >
    <h3 class="text-[#9e9e9e]">Menu</h3>
    <div>
      <ul>
        <li
          class="py-2 hover:bg-green-500 rounded px-2 cursor-pointer flex items-center gap-2"
        >
          <LayoutGrid size="18" /> Dashboard
        </li>
        <li
          @click="() => router.push('/parking-entry')"
          :class="[
            'py-2 rounded px-2 cursor-pointer flex items-center gap-2',
            isActive('/parking-entry')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-green-500',
          ]"
        >
          <ArrowLeftRight size="18" /> Entrada/Saída
        </li>
        <li
            @click="() => router.push('/manage-spots')"
          :class="[
            'py-2 rounded px-2 cursor-pointer flex items-center gap-2',
            isActive('/manage-spots')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-green-500',
          ]"
        >
          <SquareParking size="18" /> Gerenciar Vagas
        </li>
        <li
          @click="() => router.push('/users')"
          :class="[
            'py-2 rounded px-2 cursor-pointer flex items-center gap-2',
            isActive('/users')
              ? 'bg-blue-500 text-white'
              : 'hover:bg-green-500',
          ]"
        >
          <Users size="18" /> Funcionários
        </li>
        <li
          class="py-2 hover:bg-green-500 rounded px-2 cursor-pointer flex items-center gap-2"
        >
          <Car size="18" /> Clientes e Veículos
        </li>
        <li
          class="py-2 hover:bg-green-500 rounded px-2 cursor-pointer flex items-center gap-2"
        >
          <Wallet size="18" /> Transações
        </li>
        <li
          class="py-2 hover:bg-green-500 rounded px-2 cursor-pointer flex items-center gap-2"
        >
          <ChartColumn size="18" /> Relatórios
        </li>
        <li
          class="py-2 hover:bg-green-500 rounded px-2 cursor-pointer flex items-center gap-2"
        >
          <Settings size="18" /> Configurações
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
