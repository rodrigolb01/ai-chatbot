import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', { 
    state: () => ({
    userId: null as string | null,
    name: null as string | null
    })
})