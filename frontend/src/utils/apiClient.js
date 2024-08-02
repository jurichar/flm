// src/utils/apiClient.js

import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8000';

export const refreshAccessToken = async (refreshToken) => {
  const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    console.error(
      'Failed to refresh access token:',
      response.status,
      response.statusText,
    );
    throw new Error('Failed to refresh access token');
  }

  return await response.json();
};

const fetchWithAuth = async (url, token, options = {}) => {
  console.log('fetchWithAuth', url, token, options);
  if (!token) {
    throw new Error('Authorization token is required');
  }

  let currentToken = token;
  const decodedToken = jwtDecode(token);
  if (Date.now() >= decodedToken.exp * 1000) {
    const refreshedTokenData = await refreshAccessToken(
      decodedToken.refreshToken,
    );
    currentToken = refreshedTokenData.access;
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${currentToken}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    console.error('Failed to fetch:', response.status, response.statusText);
    throw new Error('Network response was not ok');
  }

  return response.status !== 204 ? await response.json() : null;
};

export const apiClient = {
  get: (url, token, options = {}) =>
    fetchWithAuth(url, token, {
      ...options,
      credentials: 'include',
      method: 'GET',
    }),
  post: (url, body, token, options = {}) =>
    fetchWithAuth(url, token, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    }),
  put: (url, body, token, options = {}) =>
    fetchWithAuth(url, token, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    }),
  delete: (url, token, options = {}) =>
    fetchWithAuth(url, token, {
      ...options,
      credentials: 'include',
      method: 'DELETE',
    }),
};

export default apiClient;
