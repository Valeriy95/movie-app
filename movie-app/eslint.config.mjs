import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";


export default [
  {
    languageOptions: { 
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.browser 
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "prettier/prettier": "error",
    },
  },
  // Отключаем конфликты стилей между ESLint и Prettier
  prettier,
];