module.exports = {
  root: true, // Avoid looking for ESLint configuration in the parent folders.
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'array-callback-return': ['error', { checkForEach: true }],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'brace-style': 'off', // Disable base rule for @typescript-eslint/brace-style.
    'comma-dangle': 'off', // Disable base rule for @typescript-eslint/comma-dangle
    'comma-spacing': 'off', // Disable base rule for @typescript-eslint/comma-spacing.
    'consistent-return': 'error',
    'curly': ['error', 'all'],
    'eol-last': ['error', 'always'],
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'func-call-spacing': 'off', // Disable base rule for @typescript-eslint/func-call-spacing.
    'indent': 'off', // Disable base rule for @typescript-eslint/indent.
    'jsx-quotes': ['error', 'prefer-double'], // Prefer double quotes in JSX attributes.
    'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],
    'keyword-spacing': 'off', // Disable base rule for @typescript-eslint/keyword-spacing.
    'no-console': 'off',
    'no-debugger': 'error',
    'no-duplicate-imports': 'off', // Disable base rule for @typescript-eslint/no-duplicate-imports.
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-multi-spaces': 'error',
    'no-param-reassign': 'error',
    'no-shadow': 'off', // Disable base rule for @typescript-eslint/no-shadow.
    'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
    'no-unused-vars': 'off', // Disable base rule for @typescript-eslint/no-unused-vars.
    'no-var': 'error',
    'object-curly-newline': ['error', { multiline: true, consistent: true, minProperties: 0 }],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': ['error', 'before'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': 'off', // Disable base rule for @typescript-eslint/padding-line-between-statements.
    'quotes': ['error', 'single', { avoidEscape: true }], // Always use single quotes for string literals unless avoiding escape.
    'quote-props': ['error', 'consistent-as-needed'],
    'require-await': 'off', // Disable base rule for @typescript-eslint/require-await.
    'semi': 'off', // Disable base rule for @typescript-eslint/semi.
    'space-before-blocks': 'off', // Disable base rule for @typescript-eslint/space-before-blocks.
    'space-before-function-paren': 'off', // Disable base rule for @typescript-eslint/space-before-function-paren.
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'off', // Disable base rule for @typescript-eslint/space-infix-ops.
    'import/first': 'error',
    'import/newline-after-import': 'error',
    // 'import/no-cycle': 'error', // Comment this to reduce linting time.
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
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', propElementValues: 'always', children: 'never' }],
    'react/jsx-curly-newline': ['error', { singleline: 'consistent', multiline: 'consistent' }],
    'react/jsx-curly-spacing': ['error', { when: 'never', children: false }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-props-per-line': ['error', { maximum: { single: 100, multi: 1 } }],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-tag-spacing': ['error', {
      afterOpening: 'never',
      closingSlash: 'never',
      beforeClosing: 'proportional-always',
      beforeSelfClosing: 'always',
    }],
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore',
    }],
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/brace-style': ['error', '1tbs'],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'], // Always add comma at the end of a line if possible.
    '@typescript-eslint/comma-spacing': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/func-call-spacing': 'error',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/keyword-spacing': ['error', { before: true, after: true }],
    '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'semi' }, singleline: { delimiter: 'comma' } }],
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
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
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
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
    '@typescript-eslint/semi': ['error', 'always'], // Always add semicolon at the end of every statement.
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
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    'react': {
      version: 'detect',
    },
  },
  overrides: [{
    files: ['*.ts', '*.tsx'],
    parserOptions: {
      project: [
        'tsconfig.json',
      ],
    },
  }],
};
