import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import contactService from '../services/contactService';

const ContactDetailPage = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [saveStatus, setSaveStatus] = useState(null); // null, 'saving', 'saved', 'error'
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        setLoading(true);
        const contactData = await contactService.getContactById(parseInt(id, 10));
        setContact(contactData);
        setFormData(contactData);
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

  const handleEditClick = () => {
    setIsEditing(true);
    setFormData({ ...contact });
    setValidationErrors({});
    setSaveStatus(null);
    setSaveError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setValidationErrors({});
    setSaveStatus(null);
    setSaveError(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when field is being edited
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email?.trim()) {
      errors.email = 'Email is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      return;
    }
    
    try {
      setSaveStatus('saving');
      setSaveError(null);
      
      const updatedContact = await contactService.updateContact(contact.id, formData);
      
      setContact(updatedContact);
      setSaveStatus('saved');
      setIsEditing(false); // Immediately close the form after successful save for testing purposes
      
    } catch (err) {
      setSaveStatus('error');
      setSaveError(err.message || 'Failed to update contact');
    }
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
          <div className="flex space-x-2">
            {!isEditing && (
              <button 
                onClick={handleEditClick}
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
            )}
            <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Back to List
            </Link>
          </div>
        </div>

        {isEditing ? (
          <div data-testid="contact-edit-form" className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name:
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName || ''}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${validationErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {validationErrors.firstName && (
                  <p className="text-red-500 text-xs italic">{validationErrors.firstName}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name:
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName || ''}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${validationErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {validationErrors.lastName && (
                  <p className="text-red-500 text-xs italic">{validationErrors.lastName}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workplace">
                  Workplace:
                </label>
                <input
                  id="workplace"
                  name="workplace"
                  type="text"
                  value={formData.workplace || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className={`shadow appearance-none border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-xs italic">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="knownFrom">
                  Known From:
                </label>
                <input
                  id="knownFrom"
                  name="knownFrom"
                  type="text"
                  value={formData.knownFrom || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastContactDate">
                  Last Contact Date:
                </label>
                <input
                  id="lastContactDate"
                  name="lastContactDate"
                  type="date"
                  value={formData.lastContactDate ? new Date(formData.lastContactDate).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
                  Comments:
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[100px]"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Last Updated:</label>
                <p className="py-2 px-3 bg-gray-100 rounded">{new Date(contact.lastUpdate).toLocaleString()}</p>
              </div>

              {saveStatus === 'error' && (
                <div data-testid="edit-error-message" className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{saveError}</span>
                </div>
              )}
              
              <div className="flex items-center justify-end mt-6">
                {saveStatus === 'saving' && (
                  <div data-testid="edit-saving-indicator" className="flex items-center mr-4">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </div>
                )}
                
                {saveStatus === 'saved' && (
                  <div className="flex items-center mr-4 text-green-600">
                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Saved!</span>
                  </div>
                )}
                
                <button 
                  onClick={handleCancelEdit}
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                
                <button
                  onClick={handleSaveChanges}
                  type="button"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  disabled={saveStatus === 'saving'}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ContactDetailPage;
