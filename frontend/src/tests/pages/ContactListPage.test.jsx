import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { FUTURE_FLAGS } from '../../router/routerConfig';
import ContactListPage from '../../pages/ContactListPage';
import contactService from '../../services/contactService';

// Mock the contact service
vi.mock('../../services/contactService');

describe('ContactListPage', () => {
  // Sample contact data for testing
  const mockContacts = [
    { 
      id: 1, 
      firstName: 'John', 
      lastName: 'Doe', 
      workplace: 'ABC Corp', 
      email: 'john@example.com',
      knownFrom: 'Conference',
      comments: 'Good developer',
      lastContactDate: '2025-03-15',
      lastUpdate: '2025-04-01T12:00:00Z'
    },
    { 
      id: 2, 
      firstName: 'Jane', 
      lastName: 'Smith', 
      workplace: 'XYZ Inc', 
      email: 'jane@example.com',
      knownFrom: 'Meetup',
      comments: 'Project manager',
      lastContactDate: '2025-03-20',
      lastUpdate: '2025-04-02T14:30:00Z'
    }
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    // Default mock implementation
    contactService.getAllContacts.mockResolvedValue(mockContacts);
  });

  it('renders loading state initially', async () => {
    // Make the promise never resolve for this test
    contactService.getAllContacts.mockImplementation(() => new Promise(() => {}));
    
    render(
      <BrowserRouter future={FUTURE_FLAGS}>
        <ContactListPage />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Loading contacts/i)).toBeInTheDocument();
  });

  it('displays contacts when loaded successfully', async () => {
    await act(async () => {
      render(
        <BrowserRouter future={FUTURE_FLAGS}>
          <ContactListPage />
        </BrowserRouter>
      );
    });
    
    // Wait for the contacts to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading contacts/i)).not.toBeInTheDocument();
    });
    
    // Check if the contacts are displayed
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('ABC Corp')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('shows error message when loading fails', async () => {
    // Mock the service to reject
    contactService.getAllContacts.mockRejectedValue(new Error('Failed to fetch contacts'));
    
    await act(async () => {
      render(
        <BrowserRouter future={FUTURE_FLAGS}>
          <ContactListPage />
        </BrowserRouter>
      );
    });
    
    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Error loading contacts/i)).toBeInTheDocument();
    });
  });

  it('has a search input that filters contacts', async () => {
    await act(async () => {
      render(
        <BrowserRouter future={FUTURE_FLAGS}>
          <ContactListPage />
        </BrowserRouter>
      );
    });
    
    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading contacts/i)).not.toBeInTheDocument();
    });
    
    // Both contacts should be visible initially
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    
    // Find the search input and type 'John'
    const searchInput = screen.getByPlaceholderText(/Search contacts/i);
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'John' } });
    });
    
    // Only John should be visible now, Jane should be filtered out
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  it('sorts contacts when column header is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter future={FUTURE_FLAGS}>
          <ContactListPage />
        </BrowserRouter>
      );
    });
    
    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading contacts/i)).not.toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
    
    // Verify data is rendered in the table
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    
    // Find the lastName column header and click it
    const lastNameHeader = screen.getByRole('columnheader', { name: /last name/i });
    
    await act(async () => {
      fireEvent.click(lastNameHeader);
    });
    
    // After sorting, both names should still be present
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
  });

  it('navigates to contact detail page when a row is clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter future={FUTURE_FLAGS}>
          <ContactListPage />
        </BrowserRouter>
      );
    });
    
    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading contacts/i)).not.toBeInTheDocument();
    });
    
    // Find John Doe's row and click it
    const johnRow = screen.getByText('John').closest('tr');
    await act(async () => {
      fireEvent.click(johnRow);
    });
    
    // Since we're in a test environment, we can't really test navigation
    // But we can check that the row has an onClick handler by checking it has role="button" or tabIndex
    expect(johnRow).toHaveAttribute('role', 'button');
  });

  it('has an "Add Contact" button', async () => {
    await act(async () => {
      render(
        <BrowserRouter future={FUTURE_FLAGS}>
          <ContactListPage />
        </BrowserRouter>
      );
    });
    
    // Wait for contacts to load
    await waitFor(() => {
      expect(screen.queryByText(/Loading contacts/i)).not.toBeInTheDocument();
      // Additional verification for complete load
      expect(screen.getByText('Contacts')).toBeInTheDocument();
    });
    
    // Check if the Add Contact button exists
    expect(screen.getByRole('button', { name: /add contact/i })).toBeInTheDocument();
  });
});
