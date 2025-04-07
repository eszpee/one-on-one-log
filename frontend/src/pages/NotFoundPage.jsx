import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div data-testid="not-found-page" className="text-center py-8">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        Return to Contact List
      </Link>
    </div>
  );
};

export default NotFoundPage;
