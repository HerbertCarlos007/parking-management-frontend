<script setup>
import { ref, onMounted, reactive } from "vue";
import parkingSettingsService from "@/services/parkingSettings";

const parkingSettings = ref([]);

const parkingSettingForm = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  total_spots: null,
  grace_period_minutes: null,
  opening_time: "",
  closing_time: "",
  hourly_rate: null,
  half_hour_rate: null,
  daily_rate: null,
});

onMounted(() => {
  getParkingSettings();
});

const getParkingSettings = async () => {
  try {
    const { data } = await parkingSettingsService.getParkingSettingsService();
    const settings = data[0];
   
    parkingSettingForm.name = settings.name;
    parkingSettingForm.address = settings.address;
    parkingSettingForm.phone = settings.phone;
    parkingSettingForm.email = settings.email;
    parkingSettingForm.total_spots = settings.total_spots;
    parkingSettingForm.grace_period_minutes = settings.grace_period_minutes;
    parkingSettingForm.opening_time = settings.opening_time;
    parkingSettingForm.closing_time = settings.closing_time;
    parkingSettingForm.hourly_rate = settings.hourly_rate;
    parkingSettingForm.half_hour_rate = settings.half_hour_rate;
    parkingSettingForm.daily_rate = settings.daily_rate;
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div>
    <h1 class="text-3xl text-white">Configurações do Sistema</h1>
    <span class="text-gray-400"
      >Gerencie as configurações gerais do estacionamento</span
    >
  </div>

  <div class="w-full bg-secondary border-2 border-border rounded-md mt-5 p-6">
    <span class="text-white">Informações Gerais</span>

    <div class="mt-2">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Nome do Estacionamento</label>
          <input
            type="text"
            placeholder="Nome do Estacionamento"
            v-model="parkingSettingForm.name"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Endereço</label>
          <input
            type="text"
            placeholder="Endereço"
            v-model="parkingSettingForm.address"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            v-model="parkingSettingForm.phone"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">E-mail</label>
          <input
            type="text"
            placeholder="E-mail"
            v-model="parkingSettingForm.email"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </form>
    </div>
  </div>

  <div class="w-full bg-secondary border-2 border-border rounded-md mt-5 p-6">
    <span class="text-white">Configurações de Operação</span>

    <div class="mt-2">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Total de Vagas</label>
          <input
            type="text"
            placeholder="Total de Vagas"
            v-model="parkingSettingForm.total_spots"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Tolerância (minutos)</label>
          <input
            type="text"
            placeholder="Tolerância (minutos)"
            v-model="parkingSettingForm.grace_period_minutes"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Horário de Abertura</label>
          <input
            type="text"
            placeholder="Horário de Abertura"
            v-model="parkingSettingForm.opening_time"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Horário de Fechamento</label>
          <input
            type="text"
            placeholder="Horário de Fechamento"
            v-model="parkingSettingForm.closing_time"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </form>
    </div>
  </div>

  <div class="w-full bg-secondary border-2 border-border rounded-md mt-5 p-6">
    <span class="text-white">Tabela de Preços</span>

    <div class="mt-2">
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Preço por Hora (R$)</label>
          <input
            type="text"
            placeholder="Preço por Hora (R$)"
            v-model="parkingSettingForm.hourly_rate"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Preço Meia Hora (R$)</label>
          <input
            type="text"
            placeholder="Preço Meia Hora (R$)"
            v-model="parkingSettingForm.half_hour_rate"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Preço por Dia (R$)</label>
          <input
            type="text"
            placeholder="Preço por Dia (R$)"
            v-model="parkingSettingForm.daily_rate"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
