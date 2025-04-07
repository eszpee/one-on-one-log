const express = require('express');
const contactService = require('../services/contactService');
const { sendSuccess, sendError } = require('../utils/apiResponse');
const { ValidationError, getStatusCode } = require('../utils/errorHandler');

const router = express.Router();

/**
 * GET /api/contacts
 * Get all contacts
 */
router.get('/', async (req, res) => {
  try {
    const contacts = await contactService.getAllContacts();
    sendSuccess(res, 'Contacts retrieved successfully', contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    sendError(res, 'Failed to retrieve contacts', error.message);
  }
});

/**
 * GET /api/contacts/:id
 * Get a specific contact by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      throw new ValidationError('Contact ID must be a number');
    }
    
    const contact = await contactService.getContactById(id);
    sendSuccess(res, 'Contact retrieved successfully', contact);
  } catch (error) {
    console.error(`Error retrieving contact with ID ${req.params.id}:`, error);
    
    const statusCode = getStatusCode(error);
    sendError(res, 'Failed to retrieve contact', error.message, statusCode);
  }
});

module.exports = router;
