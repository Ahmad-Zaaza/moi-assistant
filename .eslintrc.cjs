module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:jsx-a11y/recommended",
    "plugin:playwright/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react/recommended",
    "plugin:sonarjs/recommended",
  ],
  plugins: [
    "import",
    "react",
    "react-refresh",
    "redundant-undefined",
    "sonarjs",
    "playwright",
  ],
  ignorePatterns: ["/*", "!/src", "!/tests"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    jsx: true,
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    // consistent import order
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
      },
    ],
    // don't use index as key in arrays
    "react/no-array-index-key": 2,
    // 'no-console' and 'no-debugger' rules: Errors in production(pre-commit hook), allowed in development for debugging.
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          // use lodash-es instead for tree shaking
          "lodash",
        ],
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": 0,
    // don't use .jsx
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".tsx"],
      },
    ],
    "redundant-undefined/redundant-undefined": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "sonarjs/no-duplicate-string": ["error", { threshold: 2 }],
  },
};
