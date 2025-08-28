<script setup lang="ts">
  import { ref } from "vue";
import robotImage from "../assets/robot.png";

  const name = ref('');
  const email = ref('');
  const loading = ref(false);
  const error = ref('');

  const createUser = async () => {
    if (!name.value || !email.value) {
      error.value = 'Please enter both name and email.';
      return;
    }
  };
  
</script>
<template>
    <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
        <div class="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <img :src="robotImage" alt="Robot" class="w-24 h-32 mx-auto mb-4"/>
            <h1 class="text-2xl  font-semibold mb-4 text-center">Welcome to Chat Ai</h1>

            <input type="text" placeholder="name" v-model="name" class="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <br>
            <input type="email" placeholder="email" v-model="email" class="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <br>
            <button @click="createUser" class="w-full p-2 bg-blue-500 rounded-lg" :disabled="loading">
              {{ loading ? 'Logging in...' : 'Start chat' }}
            </button>

            <p v-if="error" class="text-red-400 text-center mt-2">{{ error }}</p>
        </div>
    </div>
</template>