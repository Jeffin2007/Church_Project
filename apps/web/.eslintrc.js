/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@qoas/eslint-config/next'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Next.js App Router pattern — async server components
    '@typescript-eslint/require-await': 'off',
  },
};
