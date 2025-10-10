import { useCachedData } from './cache';
import { addCSRFToken } from './csrf';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Базовая функция для API запросов с обработкой ошибок и CSRF
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = API_URL + endpoint;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    }
  };

  // Добавляем CSRF токен для небезопасных методов
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method)) {
    Object.assign(config, addCSRFToken(config));
  }

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Something went wrong',
      }));
      throw new Error(error.message || 'Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

/**
 * API хуки с кэшированием для GET запросов
 */
export const useGet = (endpoint, { ttl, deps = [] } = {}) => {
  const fetchData = () => apiRequest(endpoint);
  return useCachedData(endpoint, fetchData, ttl);
};

/**
 * API хуки для POST запросов
 */
export const usePost = (endpoint) => {
  return async (data) => {
    return apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
};

/**
 * API хуки для PUT запросов
 */
export const usePut = (endpoint) => {
  return async (data) => {
    return apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };
};

/**
 * API хуки для DELETE запросов
 */
export const useDelete = (endpoint) => {
  return async () => {
    return apiRequest(endpoint, {
      method: 'DELETE',
    });
  };
};