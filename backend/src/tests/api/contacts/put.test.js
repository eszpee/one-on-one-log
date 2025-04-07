const request = require('supertest');
const { app } = require('../../../index');
const { Contact } = require('../../../models');
const { sequelize } = require('../../../db');

describe('Contact API - PUT Endpoint', () => {
  let testContact;

  // Set up test data
  beforeAll(async () => {
    // Clear existing contacts and insert test data
    await Contact.destroy({ truncate: true, cascade: true });

    testContact = await Contact.create({
      firstName: 'Update',
      lastName: 'Test',
      workplace: 'Update Company',
      email: 'update@example.com',
      knownFrom: 'Testing',
      comments: 'This contact will be updated',
      lastContactDate: new Date()
    });
  });

  // Clean up after tests
  afterAll(async () => {
    await Contact.destroy({ truncate: true, cascade: true });
    await sequelize.close();
  });

  // PUT /api/contacts/:id - Should update an existing contact
  it('PUT /api/contacts/:id should update a contact', async () => {
    const updatedData = {
      firstName: 'Updated',
      lastName: 'Contact',
      workplace: 'New Workplace',
      email: 'updated@example.com',
      comments: 'This contact has been updated'
    };

    const response = await request(app)
      .put(`/api/contacts/${testContact.id}`)
      .send(updatedData);

    // Expect a 200 OK response
    expect(response.status).toBe(200);
    
    // Expect the response to have a data property with the updated contact
    expect(response.body).toHaveProperty('data');
    
    // Expect the updated fields to match what we sent
    expect(response.body.data.firstName).toBe(updatedData.firstName);
    expect(response.body.data.lastName).toBe(updatedData.lastName);
    expect(response.body.data.workplace).toBe(updatedData.workplace);
    expect(response.body.data.email).toBe(updatedData.email);
    expect(response.body.data.comments).toBe(updatedData.comments);
    
    // Fields not included in the update should remain unchanged
    expect(response.body.data.knownFrom).toBe(testContact.knownFrom);
    
    // lastUpdate should be updated
    const updatedDate = new Date(response.body.data.lastUpdate);
    const originalDate = new Date(testContact.lastUpdate);
    expect(updatedDate.getTime()).toBeGreaterThan(originalDate.getTime());
    
    // Verify the contact was actually updated in the database
    const updatedContact = await Contact.findByPk(testContact.id);
    expect(updatedContact.firstName).toBe(updatedData.firstName);
    expect(updatedContact.lastName).toBe(updatedData.lastName);
  });

  // PUT /api/contacts/:id - Should return 404 for non-existent contact
  it('PUT /api/contacts/:id should return 404 for non-existent contact', async () => {
    const nonExistentId = 9999;
    const updateData = {
      firstName: 'NonExistent',
      lastName: 'Contact'
    };

    const response = await request(app)
      .put(`/api/contacts/${nonExistentId}`)
      .send(updateData);

    // Expect a 404 Not Found response
    expect(response.status).toBe(404);
    
    // Expect an error message
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('not found');
  });

  // PUT /api/contacts/:id - Should validate data types
  it('PUT /api/contacts/:id should validate field types', async () => {
    const invalidData = {
      firstName: 123, // Should be a string
      lastName: 'Valid'
    };

    const response = await request(app)
      .put(`/api/contacts/${testContact.id}`)
      .send(invalidData);

    // Expect a 400 Bad Request response
    expect(response.status).toBe(400);
    
    // Expect an error message
    expect(response.body).toHaveProperty('error');
  });
});
