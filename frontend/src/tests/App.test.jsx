import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import axios from 'axios';

// Mock axios
vi.mock('axios');

describe('App Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it('renders the loading state initially', () => {
    // Mock the axios.get to return a pending promise (won't resolve during this test)
    axios.get.mockImplementation(() => new Promise(() => {}));
    
    render(<App />);
    
    // Check if the title is rendered
    expect(screen.getByText('One-on-One Log')).toBeInTheDocument();
    
    // Check if loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders API message when API call succeeds', async () => {
    // Mock the axios.get to return a successful response
    axios.get.mockResolvedValue({
      data: { message: 'Hello from One-on-One Log API!' }
    });
    
    render(<App />);
    
    // Check if the API message appears (it's async, so we need to wait)
    await waitFor(() => {
      expect(screen.getByText('Hello from One-on-One Log API!')).toBeInTheDocument();
    });
  });

  it('shows error message when API call fails', async () => {
    // Mock the axios.get to reject
    axios.get.mockRejectedValue(new Error('API Error'));
    
    render(<App />);
    
    // Check if the error message appears
    await waitFor(() => {
      expect(screen.getByText(/Failed to connect to the API/)).toBeInTheDocument();
    });
  });
});
