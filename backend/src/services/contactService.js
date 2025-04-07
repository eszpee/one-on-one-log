const contactRepository = require('../repositories/contactRepository');
const { NotFoundError } = require('../utils/errorHandler');

/**
 * Service class for Contact business logic
 * Handles operations and transformations related to contacts
 */
class ContactService {
  /**
   * Get all contacts
   * @returns {Promise<Array>} Array of contact objects
   */
  async getAllContacts() {
    try {
      return await contactRepository.findAll();
    } catch (error) {
      console.error('Error in ContactService.getAllContacts:', error);
      throw error;
    }
  }

  /**
   * Get a contact by its ID
   * @param {number} id - The contact ID to find
   * @returns {Promise<Object>} The contact object
   * @throws {Error} If contact is not found
   */
  async getContactById(id) {
    try {
      const contact = await contactRepository.findById(id);
      
      if (!contact) {
        throw new NotFoundError(`Contact with ID ${id} not found`);
      }
      
      return contact;
    } catch (error) {
      console.error(`Error in ContactService.getContactById(${id}):`, error);
      throw error;
    }
  }
}

module.exports = new ContactService();
