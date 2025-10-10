import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Функция для получения начального значения
  const initialize = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  // Состояние
  const [value, setValue] = useState(initialize);

  // Эффект для синхронизации значения
  useEffect(() => {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      // Событие для синхронизации между вкладками
      window.dispatchEvent(new Event('storage'));
    } catch {
      console.warn(`Could not save ${key} to localStorage`);
    }
  }, [key, value]);

  return [value, setValue];
};