// src/utils/apiClient.js

import { jwtDecode } from 'jwt-decode';
import { getSession, signIn } from 'next-auth/react';

const API_BASE_URL = 'http://localhost:8000';

export const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ refresh: refreshToken }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log('Data received:', data);
      return data;
    } else {
      throw new Error('Failed to refresh access token');
    }
  } catch (error) {
    console.error('Error refreshing access token', error);
    throw new Error('Failed to refresh access token');
  }
};

const fetchWithAuth = async (url, options = {}) => {
  console.log('Fetching session...');
  const session = await getSession();
  console.log('Session:', session);

  if (!session) {
    console.error('No session found, signing in...');
    signIn();
    throw new Error('Not authenticated');
  }

  let token = session.accessToken;
  console.log('Using token:', token);

  const decodedToken = jwtDecode(token);
  console.log('Decoded token:', decodedToken);

  if (Date.now() >= decodedToken.exp * 1000) {
    console.log('Token expired, refreshing...');
    try {
      const data = await refreshAccessToken(session.refreshToken);
      session.accessToken = data.access;
      token = data.access;
      console.log('Token refreshed:', token);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      signIn();
      throw error;
    }
  }

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    credentials: 'include',
  };

  console.log(`Sending request to ${url} with token`, token);
  const response = await fetch(url, options);
  console.log('API response:', response);

  if (!response.ok) {
    console.error('Failed to fetch:', response.status, response.statusText);
    throw new Error('Network response was not ok');
  }

  const jsonData = await response.json();
  console.log('Parsed JSON Data:', jsonData);
  return jsonData;
};

export const apiClient = {
  get: (url, options) =>
    fetchWithAuth(`${API_BASE_URL}${url}`, { ...options, method: 'GET' }),
  post: (url, body, options) =>
    fetchWithAuth(`${API_BASE_URL}${url}`, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
  put: (url, body, options) =>
    fetchWithAuth(`${API_BASE_URL}${url}`, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    }),
  delete: (url, options) =>
    fetchWithAuth(`${API_BASE_URL}${url}`, { ...options, method: 'DELETE' }),
};

export default apiClient;
