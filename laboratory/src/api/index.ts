import { Api } from './Api';

import axios from 'axios';

// Функция для получения CSRF-токена из кукисов
function getCookie(name: string): string | null {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// Настройка Axios для отправки CSRF-токена с каждым запросом
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;

export const api = new Api({
    baseURL: 'http://localhost:3000/api/',
});