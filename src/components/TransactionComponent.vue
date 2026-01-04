<script setup>
import { onMounted, ref } from "vue";
import parkingEntryService from "@/services/parkingEntry.js";

const transactions = ref([]);

onMounted(() => {
  getTransactions();
});

const getTransactions = async () => {
  try {
    const response = await parkingEntryService.getAllParkingEntriesService();
    transactions.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <section class="text-white">
      <h1 class="text-3xl">Transações</h1>
      <span class="text-gray-400">Histórico de entradas e saídas</span>
    </section>

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
              <th class="py-3 px-4">Entrada</th>
              <th class="py-3 px-4">Saída</th>
              <th class="py-3 px-4">Duração</th>
              <th class="py-3 px-4">Valor</th>
              <th class="py-3 px-4">Status</th>
              <th class="py-3 px-4 text-right">Ação</th>
            </tr>
          </thead>

          <tbody class="text-sm">
            <tr
              v-for="transaction in transactions"
              :key="transaction.id"
              class="border-b border-border hover:bg-gray-900 transition"
            >
              <td class="py-4 px-4 font-semibold">{{ transaction.plate }}</td>
              <td class="py-4 px-4 text-gray-300">
                {{ transaction.entered_at }}
              </td>
              <td class="py-4 px-4 text-gray-400">
                {{ transaction.left_at }}
              </td>
              <!-- <td class="py-4 px-4 text-gray-400">(comum)</td> -->
              <td class="py-4 px-4 text-gray-400">
                {{ transaction.duration }}
              </td>
              <td class="py-4 px-4 text-gray-400">
                {{ transaction.price }}
              </td>
              <td class="py-4 px-4 font-semibold">
                <span
                  :class="[
                    'px-3 py-1 rounded-full text-sm',
                    transaction.is_paid
                      ? 'bg-green-900 text-green-400'
                      : 'bg-blue-900 text-blue-400',
                  ]"
                >
                  {{ transaction.is_paid ? "Pago" : "Em Andamento" }}
                </span>
              </td>

              <td class="py-4 px-4 text-right font-semibold">Ver</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
