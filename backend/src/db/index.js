const { Sequelize } = require('sequelize');
const config = require('./config/database.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Log database connection parameters for debugging (excluding password)
const loggableConfig = {
  database: dbConfig.database || process.env.POSTGRES_DB,
  username: dbConfig.username || process.env.POSTGRES_USER,
  host: dbConfig.host || process.env.DB_HOST,
  port: dbConfig.port || process.env.DB_PORT,
  dialect: dbConfig.dialect
};
console.log('Database connection parameters:', loggableConfig);

let sequelize;

try {
  if (dbConfig.use_env_variable) {
    sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
  } else {
    sequelize = new Sequelize(
      dbConfig.database || process.env.POSTGRES_DB, 
      dbConfig.username || process.env.POSTGRES_USER, 
      dbConfig.password || process.env.POSTGRES_PASSWORD, 
      {
        host: dbConfig.host || process.env.DB_HOST,
        port: dbConfig.port || process.env.DB_PORT,
        dialect: dbConfig.dialect,
        dialectOptions: dbConfig.dialectOptions,
        define: dbConfig.define,
        logging: dbConfig.logging,
        retry: {
          max: 3,
          timeout: 30000
        }
      }
    );
  }
} catch (error) {
  console.error('Error initializing Sequelize:', error);
}

// Function to test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  Sequelize,
};
