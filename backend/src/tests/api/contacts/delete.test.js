const request = require('supertest');
const { app } = require('../../../index');
const { Contact } = require('../../../models');
const { sequelize } = require('../../../db');

describe('Contact API - DELETE Endpoint', () => {
  let testContact;

  // Set up test data before each test
  beforeEach(async () => {
    // Clear existing contacts and insert test data
    await Contact.destroy({ truncate: true, cascade: true });

    testContact = await Contact.create({
      firstName: 'TEST FirstName',
      lastName: 'TEST LastName',
      workplace: 'TEST Delete Company',
      email: 'TEST.delete@example.com',
      knownFrom: 'TEST Testing',
      comments: 'TEST This contact will be deleted',
      lastContactDate: new Date()
    });
  });

  // Clean up after all tests
  afterAll(async () => {
    await Contact.destroy({ truncate: true, cascade: true });
    await sequelize.close();
  });

  // DELETE /api/contacts/:id - Should delete an existing contact
  it('DELETE /api/contacts/:id should delete a contact', async () => {
    const response = await request(app)
      .delete(`/api/contacts/${testContact.id}`);

    // Expect a 200 OK response
    expect(response.status).toBe(200);
    
    // Expect a success message
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toContain('deleted successfully');
    
    // Verify the contact was actually deleted from the database
    const deletedContact = await Contact.findByPk(testContact.id);
    expect(deletedContact).toBeNull();
  });

  // DELETE /api/contacts/:id - Should return 404 for non-existent contact
  it('DELETE /api/contacts/:id should return 404 for non-existent contact', async () => {
    const nonExistentId = 9999;

    const response = await request(app)
      .delete(`/api/contacts/${nonExistentId}`);

    // Expect a 404 Not Found response
    expect(response.status).toBe(404);
    
    // Expect an error message
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('not found');
  });

  // DELETE /api/contacts/:id - Should validate ID is a number
  it('DELETE /api/contacts/:id should validate ID is a number', async () => {
    const invalidId = 'notanumber';

    const response = await request(app)
      .delete(`/api/contacts/${invalidId}`);

    // Expect a 400 Bad Request response
    expect(response.status).toBe(400);
    
    // Expect an error message
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('must be a number');
  });
});
