import { v4 as uuidv4 } from 'uuid';

// Сохраненные токены
const validTokens = new Set();

// Генерация CSRF токена
const generateCSRFToken = () => {
  return uuidv4();
};

// Получение CSRF токена
export const getCsrfToken = () => {
  const token = generateCSRFToken();
  validTokens.add(token);
  return token;
};

// Валидация CSRF токена
export const validateCsrfToken = (token) => {
  if (validTokens.has(token)) {
    validTokens.delete(token); // Одноразовое использование
    return true;
  }
  return false;
};

// Добавление CSRF токена к запросу
export const addCSRFToken = (config = {}) => {
  const token = getCsrfToken();
  document.cookie = `csrf_token=${token}; path=/; secure; samesite=strict`;
  return {
    ...config,
    headers: {
      ...config.headers,
      'X-CSRF-Token': token,
    },
  };
};

// Удаление устаревших токенов
setInterval(() => {
  validTokens.clear();
}, 60 * 60 * 1000); // Очистка каждый час