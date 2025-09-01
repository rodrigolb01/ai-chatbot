import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';
import { useUserStore } from './user';

interface chatMessage {
    user: string,
    reply: string
};

interface formattedMessage {
    role: 'user' | 'ai',
    content: string
}

export const useChatStore = defineStore('chat', () => {
    
});