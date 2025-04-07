import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AppRouter from '../../router/AppRouter';

// Mock the layout and page components
vi.mock('../../components/layout/MainLayout', () => ({
  default: ({ children }) => <div data-testid="main-layout">{children}</div>
}));

vi.mock('../../pages/ContactListPage', () => ({
  default: () => <div data-testid="contact-list-page">Contact List Page</div>
}));

vi.mock('../../pages/ContactDetailPage', () => ({
  default: () => <div data-testid="contact-detail-page">Contact Detail Page</div>
}));

vi.mock('../../pages/NotFoundPage', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>
}));

describe('AppRouter', () => {
  it('renders the contact list page at the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByTestId('contact-list-page')).toBeInTheDocument();
  });

  it('renders the contact detail page at the /contacts/:id path', () => {
    render(
      <MemoryRouter initialEntries={['/contacts/1']}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByTestId('contact-detail-page')).toBeInTheDocument();
  });

  it('renders the not found page for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <AppRouter />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('main-layout')).toBeInTheDocument();
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
