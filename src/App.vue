<template>
    <Header :title=gameName></Header>
    <div class="body-container">
        <router-view></router-view>
    </div>

</template>

<script setup lang="ts">
import { Ref, ref, onMounted, ComponentInternalInstance } from 'vue';
import { useCurrencyStore } from './stores/CurrencyStore';


const gameName: Ref<string> = ref('Idle Game');
const internalInstance = getCurrentInstance() as ComponentInternalInstance;

const stores : Record<string, any> = {
    currencyStore: useCurrencyStore(),
};

const switchToUnactiveTab = () => {
    if (document.hidden) {
        internalInstance.appContext.config.globalProperties.$gameLoop.stop();
    } else {
        internalInstance.appContext.config.globalProperties.$gameLoop.start();
    }
}

//Load save
onBeforeMount(() => {
    window.removeEventListener('visibilitychange', switchToUnactiveTab);
})

onMounted(() => {
    console.log(internalInstance.appContext.config.globalProperties.env)
    window.addEventListener('visibilitychange', switchToUnactiveTab);
    (window as any).stores = stores; //expose stores

    const hooks = Object.values(stores).reduce((pre, curr) => pre.concat(Object.values(curr.frameCalcs).map(fc => fc)),
        [] as Array<(d: number) => void>);
    for (const hook of hooks) {
        internalInstance.appContext.config.globalProperties.$gameLoop.addUpdateHook(hook);
    }
    internalInstance.appContext.config.globalProperties.$gameLoop.startLoop();
})

</script>

<style>

body {
    margin: 0;
}

#box {
    background-color: red;
    height: 50px;
    left: 150px;
    position: absolute;
    top: 10px;
    width: 50px;
}

.body-container {
    margin: 10px;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

.toggle {
    cursor: pointer;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>
