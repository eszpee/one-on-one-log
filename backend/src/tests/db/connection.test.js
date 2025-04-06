const { testConnection, sequelize } = require('../../db');

// Close the database connection after all tests
afterAll(async () => {
  try {
    await sequelize.close();
    console.log('Database connection closed after tests');
  } catch (err) {
    console.error('Error closing database connection:', err);
  }
});

describe('Database Connection', () => {
  // RED: Write a test that expects database connection to succeed
  it('should connect to the database successfully', async () => {
    // GREEN: Test the database connection
    const connected = await testConnection();
    
    // Assert that the connection was successful
    expect(connected).toBe(true);
  });

  it('should have the correct database name', async () => {
    // Query the database to get its name
    const [result] = await sequelize.query('SELECT current_database() as db_name;');
    const dbName = result[0].db_name;
    
    // The database name should match our expected name
    expect(dbName).toEqual(process.env.POSTGRES_DB || 'one_on_one_log_dev');
  });
});
