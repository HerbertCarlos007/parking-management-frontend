<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Chart from "chart.js/auto";
import parkingSpotService from "@/services/parkingSpot.js";

const chartRef = ref(null);
let chartInstance = null;

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
    console.log("Spots Stats:", spotsStats.value); // <--- veja os dados aqui também
    createChart();
  } catch (error) {
    console.error(error);
  }
};


function createChart() {
  if (!chartRef.value) return;

  const ctx = chartRef.value.getContext("2d");

  // Se já existir um chart, destrua
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Ocupadas", "Disponíveis"],
      datasets: [
        {
          data: [
            spotsStats.value.occupied_percent || 0,
            spotsStats.value.available_percent || 0,
          ],
          backgroundColor: ["#ef4444", "#22c55e"],
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}


onMounted(async () => {
  getSpotsStatus();
});

onBeforeUnmount(() => {
  chartInstance?.destroy();
});

</script>

<template>
 

  <div class="flex items-center justify-center h-full mr-6">
    <div class="w-full border border-border bg-secondary rounded-xl p-2">
       <h2 class="text-white p-2">Status Atual</h2>
      <div class="h-[400px]">
        <canvas ref="chartRef"></canvas>
      </div>
    </div>
  </div>
</template> 