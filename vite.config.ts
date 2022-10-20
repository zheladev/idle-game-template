import { defineConfig } from 'vite';
import { resolve } from "path";
import vue from '@vitejs/plugin-vue';
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === "production" ? "/idle-game-template-dist" : "", //change to global var
    //base: "",
    server: {
        origin: process.env.NODE_ENV === "production" ? "/idle-game-template-zidle-dist" : "", //change to global var
        //origin: "",
    },
    plugins: [
        vue({
            script: {
                refSugar: true,
            },
        }),
        AutoImport({
            imports: [
                "vue",
                "vue-router",
                "pinia",
                {
                    "@/store": ["useStore"],
                },
            ],
            dts: "src/auto-imports.d.ts",
            eslintrc: {
                enabled: true,
            },
        }),
        Components({
            dirs: ["src/components"],
            extensions: ["vue"],
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "/src"),
        },
    },
})
