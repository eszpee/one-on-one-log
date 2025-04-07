const contactRepository = require('../repositories/contactRepository');
const { NotFoundError, ValidationError } = require('../utils/errorHandler');

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

  /**
   * Create a new contact
   * @param {Object} contactData - The contact data to create
   * @returns {Promise<Object>} The created contact
   * @throws {Error} If validation fails
   */
  async createContact(contactData) {
    try {
      this._validateContactData(contactData);
      
      // Set lastUpdate field to now
      contactData.lastUpdate = new Date();
      
      return await contactRepository.create(contactData);
    } catch (error) {
      console.error('Error in ContactService.createContact:', error);
      throw error;
    }
  }

  /**
   * Update an existing contact
   * @param {number} id - The ID of the contact to update
   * @param {Object} contactData - The new contact data
   * @returns {Promise<Object>} The updated contact
   * @throws {Error} If validation fails or contact is not found
   */
  async updateContact(id, contactData) {
    try {
      // Basic validation of incoming data types
      for (const [key, value] of Object.entries(contactData)) {
        if (key === 'firstName' || key === 'lastName' || key === 'email' || 
            key === 'workplace' || key === 'knownFrom' || key === 'comments') {
          if (value !== null && value !== undefined && typeof value !== 'string') {
            throw new ValidationError(`Field ${key} must be a string`);
          }
        }
      }
      
      const updatedContact = await contactRepository.update(id, contactData);
      
      if (!updatedContact) {
        throw new NotFoundError(`Contact with ID ${id} not found`);
      }
      
      return updatedContact;
    } catch (error) {
      console.error(`Error in ContactService.updateContact(${id}):`, error);
      throw error;
    }
  }

  /**
   * Delete a contact
   * @param {number} id - The ID of the contact to delete
   * @returns {Promise<boolean>} True if deleted
   * @throws {Error} If contact is not found
   */
  async deleteContact(id) {
    try {
      const deleted = await contactRepository.delete(id);
      
      if (!deleted) {
        throw new NotFoundError(`Contact with ID ${id} not found`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error in ContactService.deleteContact(${id}):`, error);
      throw error;
    }
  }

  /**
   * Validate contact data for required fields and data types
   * @private
   * @param {Object} contactData - The contact data to validate
   * @throws {ValidationError} If validation fails
   */
  _validateContactData(contactData) {
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email'];
    for (const field of requiredFields) {
      if (!contactData[field]) {
        throw new ValidationError(`Field ${field} is required`);
      }
    }
    
    // Validate data types
    if (typeof contactData.firstName !== 'string' || 
        typeof contactData.lastName !== 'string' || 
        typeof contactData.email !== 'string') {
      throw new ValidationError('Name and email fields must be strings');
    }
    
    // Additional validations can be added here
  }
}

module.exports = new ContactService();
