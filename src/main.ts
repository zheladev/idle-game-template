import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from './router';
import GameLoop from './utils/GameLoop';

const app = createApp(App);
const pinia = createPinia();

const gameLoop: GameLoop = new GameLoop();
app.config.globalProperties.$gameLoop = gameLoop;
app.config.globalProperties.env = process.env.NODE_ENV;

app.use(router);
app.use(pinia);


app.mount("#app");
