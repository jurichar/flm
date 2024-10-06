module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/tsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  settings: { react: { version: 'detect' } },
  rules: {
<<<<<<< HEAD:frontend_/.eslintrc.cjs
    'react/tsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
=======
    'react/jsx-no-target-blank': 'off',
>>>>>>> react:frontend/.eslintrc.cjs
    'react/prefer-stateless-function': 'error',
    'react/button-has-type': 'error',
    'react/no-unused-prop-types': 'error',
    'react/tsx-pascal-case': 'error',
    'react/tsx-no-script-url': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-danger-with-children': 'error',
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    'react/tsx-fragments': 'error',
    'react/destructuring-assignment': [
      'error',
      'always',
      { destructureInSignature: 'always' },
    ],
    'react/tsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function' },
    ],
    'react/tsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/tsx-no-useless-fragment': 'warn',
    'react/tsx-curly-brace-presence': 'warn',
    'react/no-typos': 'warn',
    'react/display-name': 'warn',
    'react/self-closing-comp': 'warn',
    'react/tsx-sort-props': 'warn',
    'react/react-in-tsx-scope': 'off',
    'react/tsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
  },
};
