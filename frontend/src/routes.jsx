// frontend/src/routes.jsx (ТЕСТИРУЕМ HOMEPAGE)
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Включаем HomePage
const HomePage = React.lazy(() => import('./pages/HomePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const AboutPage = React.lazy(() => import('./pages/company/AboutPage'));

// Импорт компонента загрузки
import { LoadingSkeleton } from './components/ui/loading';

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        {/* Возвращаем HomePage на главную */}
        <Route path="/" element={<HomePage />} />
        
        {/* Оставляем рабочую страницу About для контроля */}
        <Route path="/company/about" element={<AboutPage />} />
        
        {/* Все остальные роуты пока выключены */}
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;