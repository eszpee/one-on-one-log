import React from 'react';
import { useParams } from 'react-router-dom';

const ContactDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div data-testid="contact-detail-page">
      <h1>Contact Detail</h1>
      <p>Viewing details for contact ID: {id}</p>
    </div>
  );
};

export default ContactDetailPage;
