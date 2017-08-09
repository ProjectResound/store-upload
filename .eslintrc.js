module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 6
  },
  extends: [
    'prettier',
    'prettier/react'
  ],
  plugins: [
    'import',
    'prettier'
  ],
  'rules': {
    "prettier/prettier": [
      "error",
      {"singleQuote": false},
    ],
    "jsx-a11y/img-has-alt": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-no-bind": 0
  },
  globals: {
    "fetch": true,
    "window": true,
    "describe": true,
    "beforeEach": true,
    "afterEach": true,
    "it": true,
    "localStorage": true
  }
};