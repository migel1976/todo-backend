module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['plugin:@web-bee-ru/base'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
