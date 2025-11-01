import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist/", "node_modules/"]),
  { extends: ["js/recommended"], files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.node }, plugins: { js } },
  tseslint.configs.recommended,
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], ...perfectionist.configs["recommended-natural"] },
]);
