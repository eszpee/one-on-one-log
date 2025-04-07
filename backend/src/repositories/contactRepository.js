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

  /**
   * Create a new contact
   * @param {Object} contactData - The contact data to create
   * @returns {Promise<Object>} The created contact object
   */
  async create(contactData) {
    try {
      return await Contact.create(contactData);
    } catch (error) {
      console.error('Error in ContactRepository.create:', error);
      throw error;
    }
  }

  /**
   * Update an existing contact
   * @param {number} id - The ID of the contact to update
   * @param {Object} contactData - The new contact data
   * @returns {Promise<Object|null>} The updated contact or null if not found
   */
  async update(id, contactData) {
    try {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return null;
      }
      
      // Update lastUpdate timestamp
      contactData.lastUpdate = new Date();
      
      await contact.update(contactData);
      return contact;
    } catch (error) {
      console.error(`Error in ContactRepository.update(${id}):`, error);
      throw error;
    }
  }

  /**
   * Delete a contact
   * @param {number} id - The ID of the contact to delete
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async delete(id) {
    try {
      const contact = await Contact.findByPk(id);
      if (!contact) {
        return false;
      }
      
      await contact.destroy();
      return true;
    } catch (error) {
      console.error(`Error in ContactRepository.delete(${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ContactRepository();
