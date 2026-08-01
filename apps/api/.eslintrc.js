/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@qoas/eslint-config/nest'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Allow require() for cookie-parser and helmet which use default exports
    '@typescript-eslint/no-require-imports': 'off',
  },
};
