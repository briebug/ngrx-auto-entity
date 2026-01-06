import nx from '@nx/eslint-plugin';
import jestExtended from 'eslint-plugin-jest-extended';
import tsdocPlugin from 'eslint-plugin-tsdoc';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  { plugins: { 'tsdoc': tsdocPlugin } },
  jestExtended.configs['flat/recommended'],
  {
    ignores: ['**/dist']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*']
            }
          ]
        }
      ]
    }
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs}']
        }
      ]
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser')
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {
      '@typescript-eslint/no-inferrable-types': [
        'error',
        {
          ignoreParameters: true
        }
      ]
    }
  }
];
