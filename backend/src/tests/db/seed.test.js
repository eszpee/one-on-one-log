const { sequelize } = require('../../db');
const Contact = require('../../models/contact');

describe('Seed Data', () => {
  // Close the database connection after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  it('should load the sample contacts correctly', async () => {
    // Query the database for contacts
    const contacts = await Contact.findAll();
    
    // We expect to have at least 5 sample contacts from the seed
    expect(contacts.length).toBeGreaterThanOrEqual(5);
    
    // Verify the sample contacts include the expected names
    const firstNames = contacts.map(contact => contact.firstName);
    expect(firstNames).toContain('John');
    expect(firstNames).toContain('Jane');
    expect(firstNames).toContain('Alice');
    expect(firstNames).toContain('Bob');
    expect(firstNames).toContain('Sarah');
    
    // Verify each contact has all required fields
    contacts.forEach(contact => {
      expect(contact).toHaveProperty('firstName');
      expect(contact).toHaveProperty('lastName');
      expect(contact).toHaveProperty('workplace');
      expect(contact).toHaveProperty('email');
      expect(contact).toHaveProperty('knownFrom');
      expect(contact).toHaveProperty('comments');
      expect(contact).toHaveProperty('lastContactDate');
      expect(contact).toHaveProperty('lastUpdate');
    });
  });
});
