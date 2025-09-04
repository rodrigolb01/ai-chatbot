<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useUserStore } from '../stores/user';
import { useChatStore } from '../stores/chat';
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue';

const userStore = useUserStore();
const chatStore = useChatStore();
const router = useRouter();

//ensure the user is logged in
if(!userStore.userId)
{
    router.push('/');
}

//auto scroll to bottom
const scrollToBottom = () => {
nextTick(()=> {
    const chatContainer = document.getElementById('chat-container');

    if(chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  })
};

onMounted(
    () => {
        chatStore.loadChatHistory().then(() => scrollToBottom());
    }
);

</script>
<template>
    <div class="flex flex-col h-screen bg-gray-900">
        <Header></Header>
    </div>
</template>