# One-on-One Log: Contact Management System

## Project Overview

One-on-One Log is a contact management system designed specifically for Engineering Managers, coaches, and consultants to keep track of their professional contacts and 1:1 conversations. The application allows users to store, view, edit, and organize contact information in a simple and intuitive interface that works well on both desktop and mobile devices.

## Target Users

- Engineering Managers tracking team members and professional connections
- Coaches and consultants managing client relationships
- Professionals who need to maintain detailed contact records

## First Version Features

### Contact List Page (Index)
- Displays all contacts in a tabular format with the following columns:
  - First Name
  - Last Name
  - Workplace
  - Email Address
  - Known From (how the user met this person)
  - Comments (brief notes)
  - Last Contact (manually entered date of last interaction)
  - Last Update (automatically tracked timestamp)
- Search functionality with a text field above the table
  - Filters the table in real-time as the user types
  - Searches across all contact fields
- Sortable columns
  - Clicking a column header sorts the table by that column (ascending)
  - Clicking again reverses the sort order (descending)
- Add new contact button
- Responsive design that adapts to mobile screens

### Contact Detail Page
- Accessed by clicking on any row in the contact list
- Displays all contact information in an editable form:
  - First Name
  - Last Name
  - Workplace
  - Email Address
  - Known From
  - Comments (more extensive than in the list view)
  - Last Contact Date (manual entry)
  - LinkedIn URL
  - Photo (optional)
  - Age
  - Phone Number
  - Position/Title
  - Address
  - Other relevant fields as needed
- Save button to update contact information
- Delete button to remove the contact
- Cancel button to return to the list view without saving changes
- Last Update field (automatically updated whenever the record is modified)
- Responsive design for mobile use

### Data Management
- Create, read, update, and delete (CRUD) operations for contacts
- Automatic timestamp tracking for record updates
- Search functionality across all fields

## Technical Requirements

### Architecture
- Node.js backend
- PostgreSQL database for data storage
- RESTful API for data operations
- Modern frontend framework (React, Vue.js, or similar)
- Responsive design using CSS frameworks (Bootstrap, Tailwind, etc.)

### Deployment
- Docker Compose configuration for easy deployment
- Self-contained application that can run locally or on a server
- Database migration scripts for initial setup

### Non-functional Requirements
- Responsive design that works well on desktop and mobile browsers
- Fast search and sort capabilities
- Clean, intuitive user interface
- Secure data storage
- Single-user application (no authentication required for first version)

## Future Enhancements (Not in First Version)
- User authentication and multi-user support
- Meeting notes and conversation history
- Reminder system for follow-up interactions
- Calendar integration
- Export/import functionality
- Advanced search and filtering options
- Tags or categories for contacts
- Analytics and reporting features

## Development Approach
- Iterative development with focus on core functionality first
- Mobile-first design approach to ensure responsiveness
- Emphasis on user experience and interface simplicity

This specification will be refined based on feedback and evolving requirements throughout the development process.
