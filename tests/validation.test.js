import { validateMatch, validateLogin, validateRegistration } from '../js/validation.js';

const good = {
  opponent: 'Team X',
  map: 'Standoff',
  date: '2026-10-10',
  status: 'played',
  scoreFor: 5,
  scoreAgainst: 3,
};

test('valid match has no errors', () => {
  expect(validateMatch(good)).toEqual([]);
});

test('missing fields are reported', () => {
  expect(validateMatch({ ...good, opponent: ' ', map: '', date: '' })).toHaveLength(3);
});

test('invalid scores are reported once', () => {
  expect(validateMatch({ ...good, scoreFor: NaN, scoreAgainst: -1 })).toHaveLength(1);
});

test('scheduled matches skip score checks', () => {
  expect(validateMatch({ ...good, status: 'scheduled', scoreFor: NaN })).toEqual([]);
});

test('login validation', () => {
  expect(validateLogin({ email: 'a@b.co', password: 'x' })).toEqual([]);
  expect(validateLogin({ email: 'bad', password: '' })).toHaveLength(2);
});

test('registration validation', () => {
  const ok = { email: 'a@b.co', password: 'secret1', ign: 'Brian', accountType: 'player' };
  expect(validateRegistration(ok)).toEqual([]);
  expect(validateRegistration({ ...ok, password: '123', ign: '', accountType: 'x' })).toHaveLength(3);
});