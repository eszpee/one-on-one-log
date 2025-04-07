import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="flex flex-col min-h-screen">
      <header role="banner" className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">One-on-One Log</Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">Contacts</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main role="main" className="container mx-auto px-4 py-6 flex-grow">
        {children}
      </main>
      
      <footer role="contentinfo" className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          <p>© {currentYear} One-on-One Log. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
