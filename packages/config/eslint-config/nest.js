const base = require('./index');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...base,
  rules: {
    ...base.rules,
    // NestJS decorators need this
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    // Allow class method decorators without return type annotations on constructors
    '@typescript-eslint/no-useless-constructor': 'error',
  },
};
