// eslint.config.js

import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],
    ignores: ["dist/**", "node_modules/**"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },

    rules: {
      // ✅ Keep this (very useful)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],

      // ⚠️ Better OFF (too noisy in real projects)
      "@typescript-eslint/explicit-function-return-types": "off",

      // ⚖️ Keep as warning (good balance)
      "@typescript-eslint/no-explicit-any": "warn",

      // ✅ Good for backend logging discipline
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // ✅ Add these (very useful in real apps)
      "eqeqeq": ["error", "always"], // prevent == bugs
      "curly": ["error", "all"],     // enforce braces

      // ⚠️ Optional but helpful
      "@typescript-eslint/no-empty-function": "warn"
    },
  },
];