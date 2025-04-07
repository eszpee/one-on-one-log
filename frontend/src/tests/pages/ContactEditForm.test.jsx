import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import ContactDetailPage from '../../pages/ContactDetailPage';
import contactService from '../../services/contactService';

// Mock the contact service
vi.mock('../../services/contactService');

describe('Contact Edit Functionality', () => {
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
    vi.resetAllMocks();
    // Default mock implementation for getContactById
    contactService.getContactById.mockResolvedValue(mockContact);
    
    // Default mock implementation for updateContact
    contactService.updateContact.mockResolvedValue({
      ...mockContact,
      lastUpdate: new Date().toISOString()
    });
  });

  test('should show edit form when edit button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Check that edit form is displayed
    expect(screen.getByTestId('contact-edit-form')).toBeInTheDocument();
    
    // Fields should be pre-filled with contact data
    expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
    expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
    expect(screen.getByLabelText(/workplace/i)).toHaveValue('Acme Inc');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john.doe@example.com');
  });

  test('should update contact when form is submitted', async () => {
    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Change field values
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByLabelText(/workplace/i), { target: { value: 'Google' } });
    
    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Check that updateContact was called with the right params
    await waitFor(() => {
      expect(contactService.updateContact).toHaveBeenCalledWith(1, {
        ...mockContact,
        firstName: 'Jane',
        lastName: 'Smith',
        workplace: 'Google'
      });
    });
    
    // Form should be hidden after successful save
    expect(screen.queryByTestId('contact-edit-form')).not.toBeInTheDocument();
    
    // Updated content should be displayed
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
  });

  test('should cancel editing when cancel button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Change a field value
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Changed' } });
    
    // Click cancel button
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    // Form should be hidden
    expect(screen.queryByTestId('contact-edit-form')).not.toBeInTheDocument();
    
    // Original data should still be displayed (not changed)
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(contactService.updateContact).not.toHaveBeenCalled();
  });

  test('should show error message when update fails', async () => {
    // Mock updateContact to simulate an error
    contactService.updateContact.mockRejectedValue(new Error('Failed to update contact'));

    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Change field value
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    
    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Check that error message is displayed
    await waitFor(() => {
      expect(screen.getByTestId('edit-error-message')).toBeInTheDocument();
      expect(screen.getByText(/failed to update contact/i)).toBeInTheDocument();
    });
    
    // Form should still be visible after failed save
    expect(screen.getByTestId('contact-edit-form')).toBeInTheDocument();
  });

  test('should indicate loading state during update', async () => {
    // Use a delayed response for updateContact
    contactService.updateContact.mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            ...mockContact,
            firstName: 'Jane',
            lastUpdate: new Date().toISOString()
          });
        }, 100);
      });
    });

    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Change field value
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
    
    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Should show loading indicator
    expect(screen.getByTestId('edit-saving-indicator')).toBeInTheDocument();
    
    // After the update completes, loading indicator should be gone
    await waitFor(() => {
      expect(screen.queryByTestId('edit-saving-indicator')).not.toBeInTheDocument();
    });
  });

  test('should validate required fields before submission', async () => {
    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <Routes>
          <Route path="/contacts/:id" element={<ContactDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('contact-detail-loading')).not.toBeInTheDocument();
    });

    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    // Clear required fields
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: '' } });
    
    // Submit the form
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Should show validation errors
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    
    // Service should not be called
    expect(contactService.updateContact).not.toHaveBeenCalled();
  });
});
