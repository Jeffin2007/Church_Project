const base = require('./index');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  ...base,
  extends: [
    ...base.extends,
    'plugin:@next/eslint-plugin-next/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [...base.plugins, 'react', 'react-hooks', 'jsx-a11y'],
  rules: {
    ...base.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
  settings: {
    ...base.settings,
    react: { version: 'detect' },
  },
};
