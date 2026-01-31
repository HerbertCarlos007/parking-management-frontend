<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import companyService from "@/services/company";
import userService from "@/services/user.js";
import loginService from "@/services/login.js";

const router = useRouter();

const companyForm = reactive({
  name: "",
  email: "",
});

const userForm = reactive({
  name: "",
  email: "",
  phone_number: "",
  role: "Administrador",
  password: "",
  id_company: null,
});

const createCompanyUserAndLogin = async () => {
  try {
    const companyResponse =
      await companyService.createCompanyService(companyForm);
      console.log("EMPRESA RESPONSE:", companyResponse);

    userForm.id_company = companyResponse.data.id;

    await userService.createUserService(userForm);

    const loginResponse = await loginService.loginService({
      email: userForm.email,
      password: userForm.password,
    });

    localStorage.setItem("token", loginResponse.access_token);
    localStorage.setItem("id_company",loginResponse.user.id_company);

    router.push("/parking-entry");
  } catch (error) {
    console.error("Erro no fluxo:", error);
  }
};
</script>


<template>
  <body class="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-4xl">
      <!-- Logo -->
      <div class="text-center mb-12">
        <h1 class="text-white text-4xl font-bold tracking-tight mb-2">
          ParkControl
        </h1>
        <p class="text-gray-400 text-sm">
          Cadastro de Empresa e Usuário
        </p>
      </div>

      <!-- Card -->
      <div
        class="bg-gradient-to-br from-[#1b1b1b] to-[#121212]
               rounded-2xl border border-gray-800 p-5
               shadow-2xl shadow-black/40"
      >
        <h2 class="text-white text-2xl font-semibold mb-10">
          Criar Empresa
        </h2>

        <form class="space-y-12" @submit.prevent="createCompanyUserAndLogin()">
          <!-- EMPRESA -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                class="block text-xs uppercase tracking-wider text-gray-400 mb-2"
              >
                Nome da empresa
              </label>
              <input
                v-model="companyForm.name"
                type="text"
                placeholder="Ex: ParkControl LTDA"
                class="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5
                       text-sm text-gray-200 placeholder-gray-500
                       focus:outline-none focus:border-blue-500
                       focus:ring-2 focus:ring-blue-500/20
                       hover:border-gray-500 transition"
              />
            </div>

            <div>
              <label
                class="block text-xs uppercase tracking-wider text-gray-400 mb-2"
              >
                E-mail da empresa
              </label>
              <input
                v-model="companyForm.email"
                type="email"
                placeholder="contato@empresa.com"
                class="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5
                       text-sm text-gray-200 placeholder-gray-500
                       focus:outline-none focus:border-blue-500
                       focus:ring-2 focus:ring-blue-500/20
                       hover:border-gray-500 transition"
              />
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-800"></div>

          <!-- USUÁRIO -->
          <div>
            <h3 class="text-white text-lg font-semibold mb-8">
              Usuário Administrador
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label
                  class="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                >
                  Nome
                </label>
                <input
                  type="text"
                  v-model="userForm.name"
                  placeholder="Nome completo"
                  class="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5
                         text-sm text-gray-200 placeholder-gray-500
                         focus:outline-none focus:border-blue-500
                         focus:ring-2 focus:ring-blue-500/20
                         hover:border-gray-500 transition"
                />
              </div>

              <div>
                <label
                  class="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                >
                  E-mail
                </label>
                <input
                  type="email"
                  v-model="userForm.email"
                  placeholder="usuario@email.com"
                  class="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5
                         text-sm text-gray-200 placeholder-gray-500
                         focus:outline-none focus:border-blue-500
                         focus:ring-2 focus:ring-blue-500/20
                         hover:border-gray-500 transition"
                />
              </div>

              <div>
                <label
                  class="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                >
                  Telefone
                </label>
                <input
                  type="text"
                     v-model="userForm.phone_number"
                  placeholder="(00) 00000-0000"
                  class="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5
                         text-sm text-gray-200 placeholder-gray-500
                         focus:outline-none focus:border-blue-500
                         focus:ring-2 focus:ring-blue-500/20
                         hover:border-gray-500 transition"
                />
              </div>

              <div>
                <label
                  class="block text-xs uppercase tracking-wider text-gray-400 mb-2"
                >
                  Cargo
                </label>
                <select
                  v-model="userForm.role"
                  class="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5
                         text-sm text-gray-200
                         focus:outline-none focus:border-blue-500
                         focus:ring-2 focus:ring-blue-500/20
                         hover:border-gray-500 transition"
                >
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Senha -->
          <div>
            <label
              class="block text-xs uppercase tracking-wider text-gray-400 mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              v-model="userForm.password"
              placeholder="••••••••"
              class="w-full bg-[#0f0f0f] border border-gray-700 rounded-lg px-4 py-2.5
                     text-sm text-gray-200 placeholder-gray-500
                     focus:outline-none focus:border-blue-500
                     focus:ring-2 focus:ring-blue-500/20
                     hover:border-gray-500 transition"
            />
          </div>

          <!-- Botão -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800
                   text-white font-semibold py-3 rounded-xl
                   transition shadow-lg shadow-blue-900/40"
          >
            Criar Empresa e Usuário
          </button>
        </form>
      </div>

      <!-- Footer -->
      <div class="text-center mt-10">
        <p class="text-gray-600 text-xs">
          © 2026 ParkControl. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </body>
</template>






<style scoped></style>


<style scoped></style>
