const request = require('supertest');
const { app } = require('../../../index');
const { Contact } = require('../../../models');
const { sequelize } = require('../../../db');

describe('Contact API - POST Endpoint', () => {
  // Clean up before and after tests
  beforeAll(async () => {
    await Contact.destroy({ truncate: true, cascade: true });
  });

  afterAll(async () => {
    await Contact.destroy({ truncate: true, cascade: true });
    await sequelize.close();
  });

  // POST /api/contacts - Should create a new contact
  it('POST /api/contacts should create a new contact', async () => {
    const newContact = {
      firstName: 'TEST FirstName',
      lastName: 'TEST LastName',
      workplace: 'TEST New Company',
      email: 'TEST.new@example.com',
      knownFrom: 'TEST Testing',
      comments: 'TEST This is a new test contact',
      lastContactDate: new Date().toISOString()
    };

    const response = await request(app)
      .post('/api/contacts')
      .send(newContact);

    // Expect a 201 Created response
    expect(response.status).toBe(201);
    
    // Expect the response to have a data property with the created contact
    expect(response.body).toHaveProperty('data');
    
    // Expect the created contact to have an ID
    expect(response.body.data).toHaveProperty('id');
    
    // Expect all submitted fields to be saved correctly
    expect(response.body.data.firstName).toBe(newContact.firstName);
    expect(response.body.data.lastName).toBe(newContact.lastName);
    expect(response.body.data.workplace).toBe(newContact.workplace);
    expect(response.body.data.email).toBe(newContact.email);
    expect(response.body.data.knownFrom).toBe(newContact.knownFrom);
    expect(response.body.data.comments).toBe(newContact.comments);
    
    // Expect automatic fields to be set
    expect(response.body.data).toHaveProperty('lastUpdate');
    
    // Verify that the contact was actually saved to the database
    const savedContact = await Contact.findByPk(response.body.data.id);
    expect(savedContact).not.toBeNull();
    expect(savedContact.firstName).toBe(newContact.firstName);
  });

  // POST /api/contacts - Should validate required fields
  it('POST /api/contacts should return 400 when required fields are missing', async () => {
    const invalidContact = {
      // Missing required firstName and lastName
      workplace: 'Test Company',
      email: 'test@example.com'
    };

    const response = await request(app)
      .post('/api/contacts')
      .send(invalidContact);

    // Expect a 400 Bad Request response
    expect(response.status).toBe(400);
    
    // Expect an error message mentioning the missing fields
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('required');
  });
});
