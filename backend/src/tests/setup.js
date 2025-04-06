// Set environment to test
process.env.NODE_ENV = 'test';

// Use a different port for testing to avoid conflicts
process.env.API_PORT = '3001';

// Set a longer timeout for tests that involve database operations
jest.setTimeout(10000);

// Create a clean environment for each test
beforeAll(() => {
  // Any global setup needed before all tests
  console.log('Starting tests in test environment');
});

afterAll(async () => {
  // Any cleanup needed after all tests
  console.log('All tests completed');
  
  // Give time for any database connections to properly close
  await new Promise(resolve => setTimeout(resolve, 500));
});

