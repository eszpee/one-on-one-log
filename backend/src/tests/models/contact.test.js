const { sequelize } = require('../../db');
const Contact = require('../../models/contact');

describe('Contact Model', () => {
  // Close the database connection after all tests
  afterAll(async () => {
    await sequelize.close();
  });

  // Before running tests, sync the model with the database
  beforeAll(async () => {
    // Force sync to ensure we have a clean table
    await Contact.sync({ force: true });
  });

  // Test case for creating a contact with minimal required fields
  it('should create a contact with all required fields', async () => {
    // Create a sample contact
    const contactData = {
      firstName: 'John',
      lastName: 'Doe',
      workplace: 'Acme Inc.',
      email: 'john.doe@example.com',
      knownFrom: 'Conference',
      comments: 'Met at TechConf 2023',
      lastContactDate: new Date(2023, 9, 15) // October 15, 2023
    };

    const contact = await Contact.create(contactData);
    
    // Expect the created contact to have all the properties we provided
    expect(contact).toHaveProperty('id');
    expect(contact.firstName).toBe(contactData.firstName);
    expect(contact.lastName).toBe(contactData.lastName);
    expect(contact.workplace).toBe(contactData.workplace);
    expect(contact.email).toBe(contactData.email);
    expect(contact.knownFrom).toBe(contactData.knownFrom);
    expect(contact.comments).toBe(contactData.comments);
    
    // Convert dates to strings for comparison since Date objects won't be exactly equal
    const contactDate = new Date(contact.lastContactDate).toISOString().split('T')[0];
    const inputDate = new Date(contactData.lastContactDate).toISOString().split('T')[0];
    expect(contactDate).toBe(inputDate);
    
    // Check that lastUpdate was automatically set (should be a Date object)
    expect(contact.lastUpdate).toBeInstanceOf(Date);
  });


  // Test case for validation - required fields
  it('should not create a contact without required fields', async () => {
    const incompleteContact = {
      firstName: 'Bob', 
      // Missing lastName and other required fields
    };

    // The create should be rejected due to validation
    await expect(Contact.create(incompleteContact)).rejects.toThrow();
  });

  // Test for automatically updating lastUpdate field
  it('should update lastUpdate when a contact is modified', async () => {
    // Create a contact
    const contact = await Contact.create({
      firstName: 'Alice',
      lastName: 'Johnson',
      workplace: 'Tech Company',
      email: 'alice.j@example.com',
      knownFrom: 'Work',
      comments: 'Former colleague',
      lastContactDate: new Date()
    });
    
    // Store the original lastUpdate
    const originalUpdate = new Date(contact.lastUpdate);
    
    // Wait a moment to ensure the timestamps will be different
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Update the contact
    contact.comments = 'Updated comments';
    await contact.save();
    
    // The lastUpdate should be more recent now
    const newUpdate = new Date(contact.lastUpdate);
    expect(newUpdate.getTime()).toBeGreaterThan(originalUpdate.getTime());
  });
});
