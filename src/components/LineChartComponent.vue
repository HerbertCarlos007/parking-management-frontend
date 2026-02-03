<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Chart from "chart.js/auto";
import parkingSpotService from "@/services/parkingSpot"; // ajuste conforme seu caminho

// Ref do canvas
const chartRef = ref(null);
let chartInstance = null;

// Ref para armazenar os dados do gráfico
const occupancy = ref({
  hour_label: [],
  occupied: [],
  total: [],
  available: [],
});

// Função para buscar os dados da API
const getOccupancy = async () => {
  try {
    const response = await parkingSpotService.getOccupancyByHourService();
    
    // Preenche os arrays separados
    occupancy.value.hour_label = response.map(r => r.hour_label);
    occupancy.value.occupied = response.map(r => r.occupied);
    occupancy.value.total = response.map(r => r.total);
    occupancy.value.available = response.map(r => r.available);

    createChart(); // cria o gráfico após preencher os dados
  } catch (error) {
    console.error("Erro ao buscar status dos spots:", error);
  }
};

// Função para criar o gráfico
function createChart() {
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  // Destrói gráfico antigo se existir
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: occupancy.value.hour_label, // usa labels da API
      datasets: [
        {
          label: "Vagas Ocupadas",
          data: occupancy.value.occupied,
          borderColor: "#ef4444",
          backgroundColor: "rgba(239,68,68,0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Vagas Disponíveis",
          data: occupancy.value.available,
          borderColor: "#22c55e",
          backgroundColor: "rgba(34,197,94,0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#fff" },
        },
      },
      scales: {
        x: { ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
        y: { beginAtZero: true, ticks: { color: "#fff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      },
    },
  });
}

// Lifecycle hooks
onMounted(async () => {
  await nextTick(); // espera o canvas existir
  getOccupancy(); // busca os dados e cria o gráfico
});

onBeforeUnmount(() => {
  chartInstance?.destroy();
});
</script>


<template>
  <div class="border border-border rounded-xl p-4 bg-secondary">
    <h2 class="text-white mb-4">Histórico de Ocupação</h2>
    <div class=" h-96">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>
