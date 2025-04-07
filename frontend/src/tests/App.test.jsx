import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock the router
vi.mock('../router/AppRouter', () => ({
  default: () => <div data-testid="app-router">App Router Content</div>
}));

// Import the router config for mocking
vi.mock('../router/routerConfig', () => ({
  FUTURE_FLAGS: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children, future }) => (
    <div data-testid="browser-router" data-future={JSON.stringify(future)}>{children}</div>
  )
}));

describe('App Component', () => {
  it('renders the app router within browser router', () => {
    render(<App />);
    
    // Check if BrowserRouter is rendered
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    
    // Check if AppRouter is rendered inside BrowserRouter
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });
});
