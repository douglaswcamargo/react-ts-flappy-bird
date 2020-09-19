module.exports = {
  extends: ['standard-with-typescript', 'eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  overrides: [
    {
      files: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.jsx'
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx'],
      },
    ],
    "react/prop-types": "off",
    'import/prefer-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off'
  },
}
