// Настройки cookie по умолчанию
const DEFAULT_OPTIONS = {
  path: '/',
  secure: true,
  sameSite: 'strict'
};

// Установка cookie
export const setCookie = (name, value, options = {}) => {
  options = {
    ...DEFAULT_OPTIONS,
    ...options
  };

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === 'number') {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 1000);
      options.expires = date;
    }
    cookie += `;expires=${options.expires.toUTCString()}`;
  }

  if (options.path) cookie += `;path=${options.path}`;
  if (options.domain) cookie += `;domain=${options.domain}`;
  if (options.secure) cookie += ';secure';
  if (options.sameSite) cookie += `;samesite=${options.sameSite}`;

  document.cookie = cookie;
};

// Получение cookie
export const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
};

// Удаление cookie
export const deleteCookie = (name, options = {}) => {
  setCookie(name, '', {
    ...options,
    expires: -1
  });
};

// Очистка всех cookie
export const clearAllCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    deleteCookie(name.trim());
  }
};

// Проверка согласия на cookie
export const checkCookieConsent = () => {
  return getCookie('cookie-consent') === 'all';
};