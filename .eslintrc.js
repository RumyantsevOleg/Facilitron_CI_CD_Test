// eslint-disable-next-line import/no-commonjs
module.exports = {
   parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
   },
   env: {
      node: true,
      es6: true,
      mocha: true,
      browser: true,
   },
   extends: ['eslint:recommended'],

   plugins: ['import', 'prettier', 'node', 'mocha'],

   rules: {
      'no-console': 'warn',
      'no-var': 'error',
      'import/extensions': ['error', 'ignorePackages'],
      'prettier/prettier': 'off',
      'no-unused-vars': 'warn',
      'import/no-commonjs': 'error',
      'comma-dangle': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      'no-useless-escape': 'warn',
   },
}
