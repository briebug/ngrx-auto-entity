module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.ts', 'jest-extended/all'],
  testRunner: 'jest-jasmine2',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  testMatch: ['**/+(*.)+(spec|test|int-spec).+(ts)?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: ['html', 'text'],
  collectCoverageFrom: [
    '<rootDir>/src/lib/**/*.ts',
    '!<rootDir>/src/lib/**/*.module.ts',
    '!<rootDir>/src/lib/index.ts'
  ],
  transformIgnorePatterns: ['node_modules/(?!@ngrx)']
};
