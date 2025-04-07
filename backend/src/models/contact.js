const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

/**
 * Contact model representing a professional contact
 * Note: Field content validation is intentionally minimal to provide flexibility to users
 */
const Contact = sequelize.define('Contact', {
  // Basic identifying information
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  workplace: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  knownFrom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  lastContactDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lastUpdate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  // Use snake_case in the database but camelCase in the application
  underscored: true,
  
  // Define custom hooks to ensure lastUpdate is set on update
  hooks: {
    beforeUpdate: (contact) => {
      contact.lastUpdate = new Date();
    }
  },
  
  // Customize table name to be snake_case
  tableName: 'contacts',
});

module.exports = Contact;
