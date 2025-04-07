'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();
    
    // Sample contacts for development and testing
    await queryInterface.bulkInsert('contacts', [
      {
        first_name: 'John',
        last_name: 'Doe',
        workplace: 'Acme Inc.',
        email: 'john.doe@example.com',
        known_from: 'Conference',
        comments: 'Met at TechConf 2023. Interested in frontend development.',
        last_contact_date: new Date(2023, 11, 15), // December 15, 2023
        last_update: now,
        created_at: now,
        updated_at: now
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        workplace: 'Tech Solutions',
        email: 'jane.smith@example.com',
        known_from: 'Former Colleague',
        comments: 'Worked together at Dev Corp from 2019-2021. Expert in backend systems.',
        last_contact_date: new Date(2024, 1, 20), // February 20, 2024
        last_update: now,
        created_at: now,
        updated_at: now
      },
      {
        first_name: 'Alice',
        last_name: 'Johnson',
        workplace: 'InnovateTech',
        email: 'alice.j@example.com',
        known_from: 'Meetup',
        comments: 'Local JavaScript meetup organizer. Great public speaker.',
        last_contact_date: new Date(2024, 0, 10), // January 10, 2024
        last_update: now,
        created_at: now,
        updated_at: now
      },
      {
        first_name: 'Bob',
        last_name: 'Brown',
        workplace: 'Cloud Systems',
        email: 'bob.b@example.com',
        known_from: 'Industry Event',
        comments: 'Cloud architecture specialist. Interested in mentoring junior developers.',
        last_contact_date: new Date(2024, 2, 5), // March 5, 2024
        last_update: now,
        created_at: now,
        updated_at: now
      },
      {
        first_name: 'Sarah',
        last_name: 'Lee',
        workplace: 'Digital Agency',
        email: 'sarah.lee@example.com',
        known_from: 'Client',
        comments: 'Former client, now a good professional contact. Expertise in UX design.',
        last_contact_date: new Date(2023, 9, 30), // October 30, 2023
        last_update: now,
        created_at: now,
        updated_at: now
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {});
  }
};
