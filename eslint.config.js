// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // 允许在 JSX 中省略 import React
      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'always',
          children: 'never',
        },
      ],
    },
  },
]);
