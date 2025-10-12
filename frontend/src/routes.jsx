// frontend/src/routes.jsx (ВЕРСИЯ ДЛЯ ТЕСТА)
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Оставляем только самые необходимые импорты для теста
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const AboutPage = React.lazy(() => import('./pages/company/AboutPage'));

// Импорт компонента загрузки
import { LoadingSkeleton } from './components/ui/loading';

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        {/* 
          Для теста мы направляем главную страницу (/) на AboutPage.
          Это упростит проверку.
        */}
        <Route path="/" element={<AboutPage />} />
        <Route path="/company/about" element={<AboutPage />} />
        
        {/* Все остальные роуты временно отключены */}
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;