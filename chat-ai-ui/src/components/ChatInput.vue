<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');
const emit = defineEmits(['send']);

const sendMessage = () => {
    if(message.value.trim() !== '') {
        emit('send', message.value);
        message.value = '';
    };
};
</script>

<template>
    <div class="p-4 bg-gray-800 flex">
        <input 
        type="text" 
        v-model="message" 
        @keyup.enter="sendMessage" 
        placeholder="Send a message" 
        class="flex-1 p-2 rounded-lg bg-gray-700 text-white focus: outline-none">
        <button @click="sendMessage" class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800">
            Send
        </button>
    </div>
</template>