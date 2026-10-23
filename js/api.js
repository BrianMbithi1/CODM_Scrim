import { BASE_URL } from './config.js';
import { getToken } from './auth.js';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, method = 'GET', body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new ApiError(`Request failed (${res.status})`, res.status);
  return method === 'DELETE' ? null : res.json();
}

export const getMatches = (userId) =>
  request(`/matches?userId=${userId}&_sort=date&_order=desc`);
export const createMatch = (match) => request('/matches', 'POST', match);
export const replaceMatch = (id, match) => request(`/matches/${id}`, 'PUT', match);
export const updateMatch = (id, changes) => request(`/matches/${id}`, 'PATCH', changes);
export const deleteMatch = (id) => request(`/matches/${id}`, 'DELETE');