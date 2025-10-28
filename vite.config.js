import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // '@'를 'src' 폴더의 별명으로 지정
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
