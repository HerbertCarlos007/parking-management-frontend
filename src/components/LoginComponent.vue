<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import loginService from "@/services/login.js";

const router = useRouter();

const loginForm = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    const response = await loginService.loginService(loginForm);
    localStorage.setItem("token", response.access_token);
    localStorage.setItem("id_company", response.user.id_company);
    router.push("/parking-entry");
  } catch (error) {}
};
</script>

<template>
  <body class="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-8">
        <h1 class="text-white text-3xl font-semibold mb-2">ParkControl</h1>
        <p class="text-gray-400 text-sm">
          Sistema de Gerenciamento de Estacionamento
        </p>
      </div>

      <!-- Login Card -->
      <div class="bg-[#1a1a1a] rounded-lg border border-gray-800 p-8 shadow-xl">
        <h2 class="text-white text-2xl font-semibold mb-6">Fazer Login</h2>

        <form class="space-y-5" @submit.prevent="login()">
          <!-- Email/Username Input -->
          <div>
            <label
              for="username"
              class="block text-gray-300 text-sm font-medium mb-2"
            >
              E-mail
            </label>
            <input
              type="text"
              v-model="loginForm.email"
              class="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <label
              for="password"
              class="block text-gray-300 text-sm font-medium mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              v-model="loginForm.password"
              class="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="Digite sua senha"
              required
            />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <!-- <label class="flex items-center">
              <input
                type="checkbox"
                class="w-4 h-4 bg-[#0a0a0a] border-gray-700 rounded text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
              />
              <span class="ml-2 text-sm text-gray-400">Lembrar-me</span>
            </label> -->
            <a
              href="/company"
              class="text-sm text-blue-500 hover:text-blue-400 transition"
            >
             Não tem cadastro? Criar
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition duration-200 shadow-lg shadow-blue-900/30"
          >
            Entrar
          </button>
        </form>

        <!-- Divider -->
        <!-- <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-800"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-[#1a1a1a] text-gray-500">ou</span>
          </div>
        </div> -->

        <!-- Additional Options -->
        <!-- <div class="text-center">
          <p class="text-sm text-gray-400">
            Não tem uma conta?
            <a
              href="#"
              class="text-blue-500 hover:text-blue-400 transition font-medium"
            >
              Entre em contato
            </a>
          </p>
        </div> -->
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-gray-600 text-xs">
          © 2026 ParkControl. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </body>
</template>

<style scoped></style>
