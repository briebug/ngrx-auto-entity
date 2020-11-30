module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts', 'jest-extended'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/src/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [
        require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')
      ],
      diagnostics: false
    }
  },
  testMatch: ['**/+(*.)+(spec|test).+(ts)?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/'
  ],
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.module.ts',
    '!src/main.ts',
    '!src/polyfills.ts',
    '!src/environments/*.ts',
    'projects/ngrx-auto-entity/src/lib/**/*.ts',
    '!projects/ngrx-auto-entity/src/lib/**/*.module.ts',
    '!projects/ngrx-auto-entity/src/lib/index.ts',
    '!<rootDir>/setup-jest.ts',
    '!<rootDir>/jestGlobalMocks.ts'
  ],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  transformIgnorePatterns: ['node_modules/(?!@ngrx)']
};
