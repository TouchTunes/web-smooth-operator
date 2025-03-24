/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client'],

  // Base config
  extends: ['eslint:recommended'],

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
        'import/resolver': {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import', 'eslint-plugin-prettier'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      rules: {
        ...require('eslint-plugin-react-hooks').configs.recommended.rules,
        'template-curly-spacing': 'error',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        'prettier/prettier': 'warn',
        'import/order': [
          'warn',
          {
            groups: [
              ['builtin', 'external'],
              ['internal', 'parent', 'sibling', 'index'],
              ['type'],
            ],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
            pathGroups: [
              {
                pattern: '@{components}/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin', 'type'],
          },
        ],
        'sort-imports': [
          'warn',
          {
            ignoreDeclarationSort: true,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            ignoreCase: false,
            allowSeparatedGroups: true,
          },
        ],
        'no-restricted-imports': [
          'warn',
          {
            patterns: ['../*'],
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false,
          },
        ],
        'import/no-duplicates': 'warn',
      },
    },

    // Node
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
