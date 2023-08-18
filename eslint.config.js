const eslintJs = require('@eslint/js');
const eslintPluginImport = require('eslint-plugin-import');
const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser');

module.exports = [
  eslintJs.configs.recommended,
  { // Common configuration for both JavaScript and TypeScript.
    files: [
      '**/*.js',
      '**/*.ts',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
    },
    plugins: {
      import: eslintPluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...eslintPluginImport.configs.typescript.rules,
      'array-bracket-spacing': ['error', 'never'],
      'array-callback-return': ['error', { checkForEach: true }],
      'arrow-parens': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'brace-style': ['error', '1tbs'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'consistent-return': 'error',
      'curly': ['error', 'all'],
      'eol-last': ['error', 'always'],
      'eqeqeq': ['error', 'always', { null: 'ignore' }], // Always use "===" unless comparing nullish values.
      'func-call-spacing': 'error',
      'indent': ['error', 2],
      'jsx-quotes': ['error', 'prefer-double'], // Prefer double quotes in JSX attributes.
      'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
      'keyword-spacing': ['error', { before: true, after: true }],
      'no-console': 'error',
      'no-debugger': 'error',
      'no-floating-decimal': 'error',
      'no-implicit-coercion': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-multi-spaces': 'error',
      'no-param-reassign': 'error',
      'no-shadow': 'error',
      'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
      'no-unused-vars': ['error', { vars: 'all', args: 'none' }], // No unused variables except in function parameters.
      'no-var': 'error',
      'object-curly-newline': ['error', { multiline: true, consistent: true, minProperties: 0 }],
      'object-curly-spacing': ['error', 'always'],
      'operator-linebreak': ['error', 'before'],
      'padded-blocks': ['error', 'never'],
      'quotes': ['error', 'single', { avoidEscape: true }], // Always use single quotes for string literals unless avoiding escape.
      'quote-props': ['error', 'consistent-as-needed'],
      'require-await': 'off',
      'semi': ['error', 'always'], // Always add semicolon at the end of every statement.
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-cycle': 'error', // Comment this to reduce linting time.
      'import/order': ['error', {
        groups: ['type', 'builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [{
          pattern: '*css',
          patternOptions: { matchBase: true },
          group: 'object',
          position: 'after',
        }],
        warnOnUnassignedImports: true,
      }],
    },
  },
  { // Configuration for TypeScript only.
    files: [
      '**/*.ts',
    ],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        process: true,
      },
      parser: typescriptEslintParser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs['strict-type-checked'].rules,
      ...typescriptEslint.configs['stylistic-type-checked'].rules,
      'brace-style': 'off', // Disable base rule for @typescript-eslint/brace-style.
      'comma-dangle': 'off', // Disable base rule for @typescript-eslint/comma-dangle
      'comma-spacing': 'off', // Disable base rule for @typescript-eslint/comma-spacing.
      'func-call-spacing': 'off', // Disable base rule for @typescript-eslint/func-call-spacing.
      'indent': 'off', // Disable base rule for @typescript-eslint/indent.
      'keyword-spacing': 'off', // Disable base rule for @typescript-eslint/keyword-spacing.
      'no-shadow': 'off', // Disable base rule for @typescript-eslint/no-shadow.
      'no-unused-vars': 'off', // Disable base rule for @typescript-eslint/no-unused-vars.
      'padding-line-between-statements': 'off', // Disable base rule for @typescript-eslint/padding-line-between-statements.
      'require-await': 'off', // Disable base rule for @typescript-eslint/require-await.
      'semi': 'off', // Disable base rule for @typescript-eslint/semi.
      'space-before-blocks': 'off', // Disable base rule for @typescript-eslint/space-before-blocks.
      'space-before-function-paren': 'off', // Disable base rule for @typescript-eslint/space-before-function-paren.
      'space-infix-ops': 'off', // Disable base rule for @typescript-eslint/space-infix-ops.
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/brace-style': ['error', '1tbs'],
      '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
      '@typescript-eslint/comma-spacing': 'error',
      '@typescript-eslint/consistent-indexed-object-style': ['error', 'index-signature'],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/func-call-spacing': 'error',
      '@typescript-eslint/indent': ['error', 2],
      '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],
      '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' }, singleline: { delimiter: 'comma' } }],
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'none' }],
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', {
        allowBoolean: true,
        allowNumber: true,
        allowNullish: true,
        allowAny: false,
        allowRegExp: false,
      }],
      '@typescript-eslint/semi': ['error', 'always'],
      '@typescript-eslint/space-before-blocks': ['error', 'always'],
      '@typescript-eslint/space-before-function-paren': ['error', { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
      '@typescript-eslint/space-infix-ops': 'error',
      '@typescript-eslint/strict-boolean-expressions': ['error', {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      }],
      '@typescript-eslint/type-annotation-spacing': 'error',
    },
  },
  { // Configuration for configuration files.
    files: [
      'eslint.config.js',
      'webpack.config.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },
  { // Configuration specific to this repo.
    files: [
      '**/*.ts',
    ],
    languageOptions: {
      globals: {
        Buffer: true,
      },
    },
  },
  {
    files: [
      'test/**/*.ts',
    ],
    languageOptions: {
      globals: globals.mocha,
      parserOptions: {
        project: [
          './tsconfig.test.json',
        ],
      },
    },
  },
];
