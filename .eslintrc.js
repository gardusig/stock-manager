module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    "@typescript-eslint",
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  root: true,
  env: {
    'node': true,
    'jest': true,
  },
  rules: {
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'never',
    ],
    'no-console': 'warn',
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
    'camelcase': [
      'error',
      {
        'properties': 'never',
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
      },
    ],
    'object-curly-spacing': [
      'error',
      'always',
    ],
    'no-trailing-spaces': 'error',
    'eol-last': [
      'error',
      'always',
    ],
    'no-mixed-spaces-and-tabs': 'error',
    'no-underscore-dangle': 'error',
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    ".eslintrc.js",
  ]
};
