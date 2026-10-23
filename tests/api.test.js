import { jest } from '@jest/globals';
import { getMatches, createMatch, replaceMatch, updateMatch, deleteMatch } from '../js/api.js';

beforeEach(() => {
  localStorage.setItem('scrim_token', 'tok');
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ id: 1 }) })
  );
});

const call = () => global.fetch.mock.calls[0];

test('GET sends token and user filter', async () => {
  await getMatches(7);
  expect(call()[0]).toContain('/matches?userId=7');
  expect(call()[1].headers.Authorization).toBe('Bearer tok');
});

test('POST, PUT, PATCH, DELETE use the right methods', async () => {
  await createMatch({ a: 1 });
  expect(call()[1].method).toBe('POST');

  global.fetch.mockClear();
  await replaceMatch(1, {});
  expect(call()[1].method).toBe('PUT');

  global.fetch.mockClear();
  await updateMatch(1, {});
  expect(call()[1].method).toBe('PATCH');

  global.fetch.mockClear();
  expect(await deleteMatch(1)).toBeNull();
  expect(call()[1].method).toBe('DELETE');
});

test('errors carry the status', async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 401 }));
  await expect(getMatches(1)).rejects.toMatchObject({ status: 401 });
});