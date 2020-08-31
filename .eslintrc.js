const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'csstyper', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: [path.resolve(__dirname, './tsconfig.json')],
  },
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    node: true,
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': 'webpack',
  },
  rules: {
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_+' }],
    '@typescript-eslint/no-var-requires': 0,
    'csstyper/value': 'warn',
    'no-console': ['warn'],
    'no-duplicate-imports': 'error',
    'no-prototype-builtins': 0,
    'no-unused-vars': ['error', { ignoreRestSiblings: true, argsIgnorePattern: '^_+' }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/display-name': 0,
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/prop-types': ['warn', { skipUndeclared: true }],
    semi: ['warn', 'always'],
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'space-before-function-paren': 0,
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  ignorePatterns: ["utils/cacheWarmer.js", "node_modules/*"],
};
