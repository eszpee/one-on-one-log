import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import ContactDetailPage from '../../pages/ContactDetailPage';
import contactService from '../../services/contactService';

// Mock the contact service
vi.mock('../../services/contactService');

describe('ContactDetailPage', () => {
  const mockContact = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    workplace: 'Acme Inc',
    email: 'john.doe@example.com',
    knownFrom: 'Conference',
    comments: 'Some comments about John',
    lastContactDate: '2023-01-15T00:00:00.000Z',
    lastUpdate: '2023-01-20T10:30:00.000Z'
  };

  beforeEach(() => {
    // Reset mock implementation before each test
    vi.resetAllMocks();
  });

  test('should render loading state initially', () => {
    // Mock the getContactById to return a promise that doesn't resolve immediately
    contactService.getContactById.mockReturnValue(new Promise(() => {}));

    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Should show loading indicator
    expect(screen.getByTestId('contact-detail-loading')).toBeInTheDocument();
  });

  test('should render contact details when data is loaded', async () => {
    // Mock the getContactById to return the mock contact
    contactService.getContactById.mockResolvedValue(mockContact);

    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for data to load
    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Verify contact service was called with correct ID
    expect(contactService.getContactById).toHaveBeenCalledWith(1);

    // Check if all contact fields are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Conference')).toBeInTheDocument();
    expect(screen.getByText('Some comments about John')).toBeInTheDocument();
    
    // Date formatting should be human-readable
    const contactDate = new Date(mockContact.lastContactDate).toLocaleDateString();
    expect(screen.getByText(contactDate)).toBeInTheDocument();
    
    // Should have a link to return to the list
    expect(screen.getByRole('link', { name: /back to list/i })).toBeInTheDocument();
  });

  test('should render error message when API call fails', async () => {
    // Mock the getContactById to return an error
    contactService.getContactById.mockRejectedValue(new Error('Failed to fetch contact'));

    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Should show error message
    expect(screen.getByTestId('contact-detail-error')).toBeInTheDocument();
    expect(screen.getByText(/failed to fetch contact/i)).toBeInTheDocument();
  });
});
