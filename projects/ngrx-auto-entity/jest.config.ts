module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/../../setup-jest.ts', 'jest-extended/all'],
  globalSetup: 'jest-preset-angular/global-setup',
  testPathIgnorePatterns: ['src/test.ts']
};
