// frontend/src/pages/HomePage.jsx (ТЕСТИРУЕМ Helmet)
import React from 'react';
import { Helmet } from 'react-helmet-async'; // <-- ВОЗВРАЩАЕМ ЭТОТ ИМПОРТ

const PAGE_TITLE = 'SoftDAB | Testing Helmet';

const HomePage = () => {
  return (
    <main className="min-h-screen" style={{ padding: '100px', textAlign: 'center' }}>
      <Helmet>
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <h1 style={{ fontSize: '48px', color: 'black' }}>
        Testing Helmet...
      </h1>
      <p style={{ color: 'black', marginTop: '20px' }}>
        If you see this, Helmet is NOT the problem.
      </p>
    </main>
  );
};

export default HomePage;