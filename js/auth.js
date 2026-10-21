import { BASE_URL } from './config.js';

const TOKEN_KEY = 'scrim_token';
const USER_KEY = 'scrim_user';

async function post(path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(typeof data === 'string' ? data : 'Request failed');
  return data;
}

function save({ accessToken, user }) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export const register = async (details) => save(await post('/register', details));
export const login = async (email, password) => save(await post('/login', { email, password }));
export const logout = () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); };
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY) || 'null');
export const isLoggedIn = () => Boolean(getToken());