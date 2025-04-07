import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import contactService from '../services/contactService';

const ContactListPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'lastName',
    direction: 'asc'
  });
  
  const navigate = useNavigate();

  // Fetch contacts on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await contactService.getAllContacts();
        setContacts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to fetch contacts');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering to contacts
  const filteredSortedContacts = useMemo(() => {
    let filteredContacts = [...contacts];
    
    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredContacts = filteredContacts.filter(contact => {
        return (
          (contact.firstName && contact.firstName.toLowerCase().includes(searchTermLower)) ||
          (contact.lastName && contact.lastName.toLowerCase().includes(searchTermLower)) ||
          (contact.email && contact.email.toLowerCase().includes(searchTermLower)) ||
          (contact.workplace && contact.workplace.toLowerCase().includes(searchTermLower)) ||
          (contact.knownFrom && contact.knownFrom.toLowerCase().includes(searchTermLower)) ||
          (contact.comments && contact.comments.toLowerCase().includes(searchTermLower))
        );
      });
    }
    
    // Apply sorting
    if (sortConfig.key) {
      filteredContacts.sort((a, b) => {
        if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
        if (!a[sortConfig.key]) return 1;
        if (!b[sortConfig.key]) return -1;
        
        const aValue = typeof a[sortConfig.key] === 'string' 
          ? a[sortConfig.key].toLowerCase() 
          : a[sortConfig.key];
        const bValue = typeof b[sortConfig.key] === 'string' 
          ? b[sortConfig.key].toLowerCase() 
          : b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return filteredContacts;
  }, [contacts, searchTerm, sortConfig]);

  // Handle row click to navigate to contact detail
  const handleRowClick = (id) => {
    navigate(`/contacts/${id}`);
  };

  // Handle "Add Contact" button click
  const handleAddContact = () => {
    navigate('/contacts/new');
  };

  // Render sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // If loading, show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading contacts...</p>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p>Error loading contacts: {error}</p>
      </div>
    );
  }

  return (
    <div data-testid="contact-list-page" className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contacts</h1>
        <button
          onClick={handleAddContact}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Contact
        </button>
      </div>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('firstName')}
                role="columnheader"
                scope="col"
              >
                First Name {getSortIndicator('firstName')}
              </th>
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('lastName')}
                role="columnheader"
                scope="col"
              >
                Last Name {getSortIndicator('lastName')}
              </th>
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('workplace')}
                role="columnheader"
                scope="col"
              >
                Workplace {getSortIndicator('workplace')}
              </th>
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('email')}
                role="columnheader"
                scope="col"
              >
                Email Address {getSortIndicator('email')}
              </th>
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('knownFrom')}
                role="columnheader"
                scope="col"
              >
                Known From {getSortIndicator('knownFrom')}
              </th>
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('comments')}
                role="columnheader"
                scope="col"
              >
                Comments {getSortIndicator('comments')}
              </th>
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('lastContactDate')}
                role="columnheader"
                scope="col"
              >
                Last Contact {getSortIndicator('lastContactDate')}
              </th>
              <th 
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => requestSort('lastUpdate')}
                role="columnheader"
                scope="col"
              >
                Last Update {getSortIndicator('lastUpdate')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSortedContacts.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-4 px-4 text-center">
                  No contacts found. Please add a contact or modify your search.
                </td>
              </tr>
            ) : (
              filteredSortedContacts.map(contact => (
                <tr 
                  key={contact.id} 
                  onClick={() => handleRowClick(contact.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  <td className="py-2 px-4 border-b">{contact.firstName}</td>
                  <td className="py-2 px-4 border-b">{contact.lastName}</td>
                  <td className="py-2 px-4 border-b">{contact.workplace}</td>
                  <td className="py-2 px-4 border-b">{contact.email}</td>
                  <td className="py-2 px-4 border-b">{contact.knownFrom}</td>
                  <td className="py-2 px-4 border-b">
                    {contact.comments && contact.comments.length > 50
                      ? `${contact.comments.substring(0, 50)}...`
                      : contact.comments}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {contact.lastContactDate && new Date(contact.lastContactDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {contact.lastUpdate && new Date(contact.lastUpdate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactListPage;
