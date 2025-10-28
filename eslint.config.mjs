import js from "@eslint/js"
import { defineConfig, globalIgnores } from "eslint/config"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tslint from "typescript-eslint"

// eslint-disable-next-line no-restricted-syntax
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tslint.configs.recommended,
      {
        plugins: reactHooks.configs["recommended-latest"],
      },
      reactRefresh.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    rules: {
      "no-restricted-syntax": [
        "warn",
        {
          selector: "ExportDefaultDeclaration",
          message: "Prefer named exports",
        },
      ],
    },
  },
])
