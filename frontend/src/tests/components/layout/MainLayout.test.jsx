import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from '../../../components/layout/MainLayout';

describe('MainLayout', () => {
  it('renders the header with application title', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByText('One-on-One Log')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header element
  });

  it('renders the footer with copyright information', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer element
    expect(screen.getByText(/© \d{4}/)).toBeInTheDocument(); // Copyright with year
  });

  it('renders the children content', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div data-testid="test-content">Test content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies the main content layout', () => {
    render(
      <BrowserRouter>
        <MainLayout>
          <div>Test content</div>
        </MainLayout>
      </BrowserRouter>
    );
    
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    // We can check for specific classes if needed
    expect(mainElement).toHaveClass('container');
  });
});
