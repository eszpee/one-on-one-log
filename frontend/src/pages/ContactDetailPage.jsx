import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import contactService from '../services/contactService';

const ContactDetailPage = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        setLoading(true);
        const contactData = await contactService.getContactById(parseInt(id, 10));
        setContact(contactData);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch contact details');
        setContact(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div data-testid="contact-detail-loading" className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading contact details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="contact-detail-error" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="text-center p-10">
        <p>Contact not found</p>
        <Link to="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to List
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="contact-detail-page" className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{contact.firstName} {contact.lastName}</h1>
          <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Back to List
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Workplace:</label>
              <p className="py-2 px-3 bg-gray-100 rounded">{contact.workplace}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <p className="py-2 px-3 bg-gray-100 rounded">{contact.email}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Known From:</label>
              <p className="py-2 px-3 bg-gray-100 rounded">{contact.knownFrom}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Last Contact Date:</label>
              <p className="py-2 px-3 bg-gray-100 rounded">{formatDate(contact.lastContactDate)}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Comments:</label>
              <p className="py-2 px-3 bg-gray-100 rounded min-h-[100px] whitespace-pre-wrap">{contact.comments}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Last Updated:</label>
              <p className="py-2 px-3 bg-gray-100 rounded">{new Date(contact.lastUpdate).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;
