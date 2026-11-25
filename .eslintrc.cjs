module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: '18.3' },
  },
  rules: {
    // Prop types not required — using plain JavaScript, not TypeScript
    'react/prop-types': 'off',
    // Warn on unused variables but don't block dev
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Code quality
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'warn',
    // Allow React Three Fiber custom declarative elements/attributes
    'react/no-unknown-property': 'off',
    'react/no-unescaped-entities': 'off',
  },
}
