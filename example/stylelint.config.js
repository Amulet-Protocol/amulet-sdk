module.exports = {
  extends: [
    'stylelint-config-standard-scss',
  ],
  rules: {
    'alpha-value-notation': 'number',
    'at-rule-empty-line-before': null,
    'color-hex-length': 'long',
    'rule-empty-line-before': null,
    'selector-class-pattern': [/^[a-zA-Z0-9_]+$/, { resolveNestedSelectors: true }],
  },
};
