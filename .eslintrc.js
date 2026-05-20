module.exports = {
  root: true,
  extends: [
    'expo',
    'prettier', // disables ESLint rules that conflict with Prettier
  ],
  plugins: ['prettier'],
  rules: {
    // Report Prettier violations as ESLint errors
    'prettier/prettier': 'error',

    // Warn on console.log, allow .warn/.error
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // TypeScript — turn off base rule, use TS-aware one
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

    // Import grouping / ordering
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};
