import axios from 'axios';

const API_URL = '/api/contacts';

/**
 * Service for handling contact API requests
 */
const contactService = {
  /**
   * Get all contacts
   * @returns {Promise<Array>} Array of contacts
   */
  async getAllContacts() {
    try {
      const response = await axios.get(API_URL);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  /**
   * Get a contact by ID
   * @param {number} id Contact ID
   * @returns {Promise<Object>} Contact data
   */
  async getContactById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching contact ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new contact
   * @param {Object} contactData Contact data to create
   * @returns {Promise<Object>} Created contact
   */
  async createContact(contactData) {
    try {
      const response = await axios.post(API_URL, contactData);
      return response.data.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  /**
   * Update an existing contact
   * @param {number} id Contact ID
   * @param {Object} contactData Updated contact data
   * @returns {Promise<Object>} Updated contact
   */
  async updateContact(id, contactData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, contactData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating contact ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a contact
   * @param {number} id Contact ID
   * @returns {Promise<string>} Success message
   */
  async deleteContact(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data.message;
    } catch (error) {
      console.error(`Error deleting contact ${id}:`, error);
      throw error;
    }
  }
};

export default contactService;
