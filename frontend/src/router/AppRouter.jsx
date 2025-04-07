import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ContactListPage from '../pages/ContactListPage';
import ContactDetailPage from '../pages/ContactDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ContactListPage />} />
        <Route path="/contacts/new" element={<ContactDetailPage />} />
        <Route path="/contacts/:id" element={<ContactDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRouter;
