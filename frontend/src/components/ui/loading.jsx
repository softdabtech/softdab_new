import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Компонент обертки для lazy loading
export const LazyLoad = ({ children, fallback = <LoadingSkeleton /> }) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
};

// Skeleton лоадер для форм
export const FormSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <Skeleton height={20} width={100} />
        <Skeleton height={40} className="mt-1" />
      </div>
      <div>
        <Skeleton height={20} width={120} />
        <Skeleton height={40} className="mt-1" />
      </div>
      <div>
        <Skeleton height={20} width={80} />
        <Skeleton height={40} className="mt-1" />
      </div>
      <div>
        <Skeleton height={20} width={100} />
        <Skeleton height={100} className="mt-1" />
      </div>
      <Skeleton height={40} />
    </motion.div>
  );
};

// Базовый skeleton лоадер
export const LoadingSkeleton = ({ rows = 3 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {Array(rows).fill(0).map((_, i) => (
        <Skeleton key={i} height={20} />
      ))}
    </motion.div>
  );
};

// Skeleton лоадер для карточек
export const CardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 border rounded-lg shadow-sm"
    >
      <Skeleton height={24} width={200} />
      <div className="mt-4 space-y-2">
        <Skeleton count={3} />
      </div>
    </motion.div>
  );
};

// Компонент анимированного появления
export const FadeIn = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
};