<script setup></script>

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
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Endereço</label>
          <input
            type="text"
            placeholder="Endereço"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">E-mail</label>
          <input
            type="text"
            placeholder="E-mail"
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
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Tolerância (minutos)</label>
          <input
            type="text"
            placeholder="Tolerância (minutos)"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Horário de Abertura</label>
          <input
            type="text"
            placeholder="Horário de Abertura"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Horário de Fechamento</label>
          <input
            type="text"
            placeholder="Horário de Fechamento"
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
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Preço Meia Hora (R$)</label>
          <input
            type="text"
            placeholder="Preço Meia Hora (R$)"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label class="text-sm text-gray-300">Preço por Dia (R$)</label>
          <input
            type="text"
            placeholder="Preço por Dia (R$)"
            class="bg-black border border-border rounded-md px-4 py-2 focus:outline-none focus:border-blue-600"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
