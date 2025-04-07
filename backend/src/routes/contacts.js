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

/**
 * POST /api/contacts
 * Create a new contact
 */
router.post('/', async (req, res) => {
  try {
    const newContact = await contactService.createContact(req.body);
    sendSuccess(res, 'Contact created successfully', newContact, 201);
  } catch (error) {
    console.error('Error creating contact:', error);
    
    const statusCode = getStatusCode(error);
    sendError(res, 'Failed to create contact', error.message, statusCode);
  }
});

/**
 * PUT /api/contacts/:id
 * Update a specific contact
 */
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      throw new ValidationError('Contact ID must be a number');
    }
    
    const updatedContact = await contactService.updateContact(id, req.body);
    sendSuccess(res, 'Contact updated successfully', updatedContact);
  } catch (error) {
    console.error(`Error updating contact with ID ${req.params.id}:`, error);
    
    const statusCode = getStatusCode(error);
    sendError(res, 'Failed to update contact', error.message, statusCode);
  }
});

/**
 * DELETE /api/contacts/:id
 * Delete a specific contact
 */
router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      throw new ValidationError('Contact ID must be a number');
    }
    
    await contactService.deleteContact(id);
    sendSuccess(res, 'Contact deleted successfully');
  } catch (error) {
    console.error(`Error deleting contact with ID ${req.params.id}:`, error);
    
    const statusCode = getStatusCode(error);
    sendError(res, 'Failed to delete contact', error.message, statusCode);
  }
});

module.exports = router;
