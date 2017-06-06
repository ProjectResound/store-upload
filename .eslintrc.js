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
  extends: 'airbnb',
  plugins: [
    'import'
  ],
  'rules': {
    "no-underscore-dangle": 0,
    "strict": 0,
    "global-require": 0,
    "import/imports-first": 0,
    "new-cap": 0,
    "comma-dangle": 0,
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
    "no-unused-vars": 1,
    "no-param-reassign": 0,
    "react/jsx-filename-extension": 0,
    "react/no-unknown-property": 0,
    "react/prefer-stateless-function": 0,
    "react/prop-types": 0,
    "react/no-multi-comp": 1,
    "no-useless-constructor": 1,
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