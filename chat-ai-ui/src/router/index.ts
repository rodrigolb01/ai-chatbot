import {createRouter, createWebHistory} from 'vue-router';
import ChatView from '../views/ChatView.vue';
import HomeView from '../views/HomeView.vue';


const routes = [
    {path: "/", component: HomeView},
    {path: "/chat", component: ChatView}
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});