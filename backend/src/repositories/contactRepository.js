const { Contact } = require('../models');

/**
 * Repository class for Contact data access
 * Handles all database operations related to contacts
 */
class ContactRepository {
  /**
   * Find all contacts in the database
   * @returns {Promise<Array>} Array of contact objects
   */
  async findAll() {
    try {
      return await Contact.findAll();
    } catch (error) {
      console.error('Error in ContactRepository.findAll:', error);
      throw error;
    }
  }

  /**
   * Find a contact by its ID
   * @param {number} id - The contact ID to find
   * @returns {Promise<Object|null>} The contact object or null if not found
   */
  async findById(id) {
    try {
      return await Contact.findByPk(id);
    } catch (error) {
      console.error(`Error in ContactRepository.findById(${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ContactRepository();
