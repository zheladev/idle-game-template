<template>
    <div class="app-header">
        <div class="nav-title">
            <h3>
                {{ title }}
            </h3>
        </div>
        <div class="nav-content">

        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
    title: string;
}>();

</script>

<style scoped>
.nav-content:before {
    content: '';
    height: 100%;
}

.nav-content:before, .nav-list {
    display: inline-block;
    vertical-align: middle;
}

.nav-title {
    padding: 0px 15px 0px 15px;
    color: white;
}

.app-header {
    display: flex;
    margin: 0;
    background-color: #333;
}

.nav-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
}

.nav-item {
    justify-items: center;
    text-align: center;
    float: left;
    height: 100%;
}

.nav-item .nav-link {
    display: block;
    color: white;

    text-align: center;
    padding: 20px 16px;
    text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
.nav-item .nav-link:hover {
    background-color: #111;
}
</style>
