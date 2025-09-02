module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'tailwindcss', 'simple-import-sort'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'warn',
    'tailwindcss/no-contradicting-classname': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    'react/no-unknown-property': 'warn',
    'no-console': [
      'warn',
      {
        allow: ['info', 'error'],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 1. Side effect imports at the start.
          ['^\\u0000'],
          // 2. `react` and packages.
          ['^react$', '^@?\\w'],
          // 3. Absolute imports and other imports such as Vue-style `@/foo`.
          ['^@', '^'],
          // 4. Relative imports from the same folder.
          ['^\\./'],
          // 5. Style module imports always come last.
          ['^.+\\.(module.css|module.scss)$'],
          // 6. Media imports.
          ['^.+\\.(gif|png|svg|jpg)$'],
        ],
      },
    ],
  },
};
