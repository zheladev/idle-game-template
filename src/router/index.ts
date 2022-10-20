import { RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: Home
    },
]

console.log(import.meta.env.BASE_URL);
const router = createRouter({
    history: process.env.NODE_ENV === "production" ? createWebHistory(import.meta.env.BASE_URL) : createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    const home = { path: "/" };
    const isUnlocked = isRouteUnlocked(to.name as string);

    if (!isUnlocked) {
        return home;
    }
})


const isRouteUnlocked = (r: string) => {
    switch(r) {
        default: return true;
    }
}

export default router
