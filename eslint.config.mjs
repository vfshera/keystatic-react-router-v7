import globals from "globals";
import { configs } from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import eslintPluginImportX from "eslint-plugin-import-x";
import teslintParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import process from "node:process";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ["node_modules/", ".react-router", "!**/.server", "!**/.client"],
  },
  ...configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    files: ["**/*.{jsx,tsx,js,ts}"],
    ...reactPlugin.configs.flat.recommended,
    plugins: {
      "react-hooks": reactHooks,
      "@stylistic": stylistic,
    },
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parser: teslintParser,
      parserOptions: {
        ...reactPlugin.configs.flat.recommended.languageOptions.parserOptions,
        ecmaVersion: "latest",
        sourceType: "module",
        tsconfigRootDir: process.cwd(),
      },
    },

    settings: {
      react: {
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/prop-types": "off",
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "all",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "import-x/newline-after-import": [
        "warn",
        { count: 1, considerComments: true },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@stylistic/padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "*", next: ["return", "export"] },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: [
            "const",
            "let",
            "var",
            "function",
            "type",
            "class",
            "block-like",
          ],
        },
        {
          blankLine: "always",
          prev: "function",
          next: [
            "const",
            "let",
            "var",
            "function",
            "type",
            "class",
            "block-like",
          ],
        },
        {
          blankLine: "always",
          prev: ["type", "class", "block-like"],
          next: [
            "const",
            "let",
            "var",
            "function",
            "type",
            "class",
            "block-like",
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];
