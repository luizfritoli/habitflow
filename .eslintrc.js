import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import prettier from "eslint-plugin-prettier";
import { flatCompat } from "@eslint/eslintrc";

const compat = flatCompat();

export default [
  { ignores: ["dist"] },

  ...compat.config({
    extends: [
      "airbnb",
      "airbnb/hooks",
      "plugin:testing-library/react",
      "plugin:prettier/recommended",
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: false,
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2021,
      sourceType: "module",
      babelOptions: {
        presets: ["@babel/preset-react"],
      },
    },
    plugins: ["react", "testing-library"],
    rules: {
      "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-no-constructed-context-values": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: [
            "**/*.test.{js,jsx}",
            "**/*.spec.{js,jsx}",
            "**/setupTests.js",
          ],
        },
      ],
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either" }],
    },
    overrides: [
      {
        files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}"],
        rules: {
          "import/no-extraneous-dependencies": "off",
        },
      },
    ],
  }),
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
