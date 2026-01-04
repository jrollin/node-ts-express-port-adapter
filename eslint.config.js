import js from '@eslint/js'
import tsparser from '@typescript-eslint/parser'
import ts from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import vitest from 'eslint-plugin-vitest'

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**']
  },
  js.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/**/*.spec.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Express: 'readonly',
        NodeJS: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        beforeAll: 'readonly',
        afterEach: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier: prettier,
      vitest: vitest
    },
    rules: {
      ...ts.configs.recommended.rules,
      'prettier/prettier': 2
    }
  }
]
