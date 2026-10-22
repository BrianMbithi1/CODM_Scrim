import { winRate, statsBy, filterMatches, resultOf } from '../js/stats.js';

const m = (mode, map, a, b, status = 'played') => ({ mode, map, scoreFor: a, scoreAgainst: b, status });
const data = [
  m('Hardpoint', 'Standoff', 250, 200),
  m('Hardpoint', 'Crash', 100, 250),
  m('Control', 'Standoff', 3, 1),
  m('Control', 'Crash', 0, 0, 'scheduled'),
];

test('resultOf returns win, loss or null', () => {
  expect(resultOf(data[0])).toBe('win');
  expect(resultOf(data[1])).toBe('loss');
  expect(resultOf(data[3])).toBeNull();
});

test('winRate ignores scheduled matches', () => {
  expect(winRate(data)).toBe(67);
});

test('winRate is 0 with no matches', () => {
  expect(winRate([])).toBe(0);
});

test('statsBy groups by key', () => {
  expect(statsBy(data, 'mode')).toEqual([
    { name: 'Hardpoint', played: 2, winRate: 50 },
    { name: 'Control', played: 1, winRate: 100 },
  ]);
});

test('filterMatches filters by mode and result', () => {
  expect(filterMatches(data, { mode: 'Hardpoint' })).toHaveLength(2);
  expect(filterMatches(data, { result: 'win' })).toHaveLength(2);
  expect(filterMatches(data)).toHaveLength(4);
});