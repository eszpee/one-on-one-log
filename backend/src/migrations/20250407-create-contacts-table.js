'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      workplace: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      known_from: {
        type: Sequelize.STRING,
        allowNull: false
      },
      comments: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      last_contact_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      last_update: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Add an index on email for faster lookups
    await queryInterface.addIndex('contacts', ['email']);
    
    // Add indexes on names for faster searching and sorting
    await queryInterface.addIndex('contacts', ['last_name', 'first_name']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contacts');
  }
};
