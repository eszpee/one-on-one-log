module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/tests/**',
    '!**/node_modules/**',
  ],
  coverageReporters: ['text', 'lcov'],
  verbose: true,
  setupFilesAfterEnv: ['./src/tests/setup.js']
};
