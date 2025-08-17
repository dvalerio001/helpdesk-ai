module.exports = {
  env: { node: true, es2022: true },
  extends: ["airbnb-base"],
  parserOptions: { sourceType: "module" },
  rules: {
    "no-console": "off",
    "import/extensions": ["error", "ignorePackages", { js: "always" }]
  },
};