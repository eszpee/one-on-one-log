const request = require('supertest');
const { app } = require('../../../index');
const { Contact } = require('../../../models');
const { sequelize } = require('../../../db');

describe('Contact API - GET Endpoints', () => {
  let testContacts;

  // Set up test data
  beforeAll(async () => {
    // Clear existing contacts and insert test data
    await Contact.destroy({ truncate: true, cascade: true });

    testContacts = await Contact.bulkCreate([
      {
        firstName: 'Test',
        lastName: 'User',
        workplace: 'Test Company',
        email: 'test@example.com',
        knownFrom: 'Testing',
        comments: 'This is a test contact',
        lastContactDate: new Date()
      },
      {
        firstName: 'Another',
        lastName: 'Person',
        workplace: 'Another Company',
        email: 'another@example.com',
        knownFrom: 'Meeting',
        comments: 'This is another test contact',
        lastContactDate: new Date()
      }
    ]);
  });

  // Clean up after tests
  afterAll(async () => {
    await Contact.destroy({ truncate: true, cascade: true });
    await sequelize.close();
  });

  // GET /api/contacts - Should retrieve all contacts
  it('GET /api/contacts should return all contacts', async () => {
    const response = await request(app).get('/api/contacts');

    // Expect a 200 response
    expect(response.status).toBe(200);
    
    // Expect the response to have a data property containing an array
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    
    // Expect the array to have the correct number of contacts
    expect(response.body.data.length).toBe(testContacts.length);
    
    // Expect the contacts to have all required fields
    const firstContact = response.body.data[0];
    expect(firstContact).toHaveProperty('id');
    expect(firstContact).toHaveProperty('firstName');
    expect(firstContact).toHaveProperty('lastName');
    expect(firstContact).toHaveProperty('workplace');
    expect(firstContact).toHaveProperty('email');
    expect(firstContact).toHaveProperty('knownFrom');
    expect(firstContact).toHaveProperty('comments');
    expect(firstContact).toHaveProperty('lastContactDate');
    expect(firstContact).toHaveProperty('lastUpdate');
  });

  // GET /api/contacts/:id - Should retrieve a specific contact
  it('GET /api/contacts/:id should return a specific contact', async () => {
    const testContact = testContacts[0];
    const response = await request(app).get(`/api/contacts/${testContact.id}`);

    // Expect a 200 response
    expect(response.status).toBe(200);
    
    // Expect the response to have a data property with the contact
    expect(response.body).toHaveProperty('data');
    
    // Expect the contact to have the correct ID and properties
    expect(response.body.data.id).toBe(testContact.id);
    expect(response.body.data.firstName).toBe(testContact.firstName);
    expect(response.body.data.lastName).toBe(testContact.lastName);
    expect(response.body.data.workplace).toBe(testContact.workplace);
    expect(response.body.data.email).toBe(testContact.email);
    expect(response.body.data.knownFrom).toBe(testContact.knownFrom);
    expect(response.body.data.comments).toBe(testContact.comments);
  });

  // GET /api/contacts/:id - Should return 404 for non-existent contact
  it('GET /api/contacts/:id should return 404 for non-existent contact', async () => {
    // Use a non-existent ID
    const nonExistentId = 9999;
    const response = await request(app).get(`/api/contacts/${nonExistentId}`);

    // Expect a 404 response
    expect(response.status).toBe(404);
    
    // Expect an error message
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('not found');
  });
});
