module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.ts', 'jest-extended/all'],
  globalSetup: 'jest-preset-angular/global-setup',
  testPathIgnorePatterns: ['src/test.ts'],
  moduleNameMapper: {
    '^@briebug/ngrx-auto-entity$': '<rootDir>/src/public_api.ts',
    '^@briebug/ngrx-auto-entity-service$': '<rootDir>/../ngrx-auto-entity-service/src/public_api.ts'
  }
};
