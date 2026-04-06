const eslintJs = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', 'eslint.config.js', 'prettier.config.js']
  }
];
