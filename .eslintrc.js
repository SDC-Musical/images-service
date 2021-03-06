module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'no-console': 'off',
    'no-useless-constructor': 0,
    'react/prop-types': 0,
    'react/prefer-stateless-function': 'off',
    'no-else-return': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }]
  },
};