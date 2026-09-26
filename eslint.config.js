const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["coverage/**", "node_modules/**"],
  },
  {
    files: ["eslint.config.js", "stylelint.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
  js.configs.recommended,
  {
    files: ["public/**/*.js"],
    languageOptions: {
      globals: { ...globals.browser, marked: "readonly" },
      ecmaVersion: 2022,
    },
  },
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 2022,
    },
  },
  {
    files: ["tests/js/**/*.js", "jest.config.js"],
    languageOptions: {
      globals: { ...globals.node, ...globals.jest, ...globals.browser },
      ecmaVersion: 2022,
    },
  },
];
