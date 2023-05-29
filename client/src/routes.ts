import type { RouteRecordRaw } from "vue-router";
import TaskInterface from "@/components/TaskInterface/TaskInterface.vue";
import InscriptionInterface from "@/components/InscriptionInterface/InscriptionInterface.vue";
import ConnexionInterface from "@/components/ConnexionInterface/ConnexionInterface.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: '/task',
        component: TaskInterface
    },
    {
        path: '/',
        component: InscriptionInterface
    },
    {
        path: '/connexion',
        component: ConnexionInterface
    },
]
