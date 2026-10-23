import { jest } from '@jest/globals';
import { login, register, logout, getToken, getUser, isLoggedIn } from '../js/auth.js';

const reply = (ok, body) =>
  jest.fn(() => Promise.resolve({ ok, json: () => Promise.resolve(body) }));

beforeEach(() => localStorage.clear());

test('login stores token and user', async () => {
  global.fetch = reply(true, { accessToken: 'abc', user: { id: 1, ign: 'B' } });
  await login('a@b.co', 'secret1');
  expect(getToken()).toBe('abc');
  expect(getUser().ign).toBe('B');
  expect(isLoggedIn()).toBe(true);
});

test('register posts to /register', async () => {
  global.fetch = reply(true, { accessToken: 't', user: { id: 2 } });
  await register({ email: 'a@b.co', password: 'secret1' });
  expect(global.fetch.mock.calls[0][0]).toContain('/register');
});

test('failed login throws the server message', async () => {
  global.fetch = reply(false, 'Incorrect password');
  await expect(login('a@b.co', 'bad')).rejects.toThrow('Incorrect password');
});

test('logout clears storage', () => {
  localStorage.setItem('scrim_token', 'x');
  logout();
  expect(isLoggedIn()).toBe(false);
  expect(getUser()).toBeNull();
});