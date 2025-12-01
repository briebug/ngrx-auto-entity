module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.ts', 'jest-extended/all'],
  globalSetup: 'jest-preset-angular/global-setup',
  testPathIgnorePatterns: ['src/test.ts'],
  moduleNameMapper: {
    '^@briebug/ngrx-auto-entity$': '<rootDir>/../ngrx-auto-entity/src/public_api.ts'
  }
};
