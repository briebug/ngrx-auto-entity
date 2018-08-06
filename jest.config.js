module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/setup-jest.ts',
  testMatch: ['**/+(*.)+(spec|test).+(ts)?(x)'],
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
  moduleNameMapper: {
    '^ngrx-auto-entity/(.*)': '<rootDir>/projects/ngrx-auto-entity/$1',
    '^state/(.*)': '<rootDir>/src/app/state/$1',
    '^core/(.*)': '<rootDir>/src/app/core/$1',
    '^models/(.*)': '<rootDir>/src/app/models/$1'
  },
  modulePathIgnorePatterns: ['<rootDir>/dist']
};
