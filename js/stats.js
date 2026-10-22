export const resultOf = (m) =>
  m.status !== 'played' ? null : m.scoreFor > m.scoreAgainst ? 'win' : 'loss';

export function winRate(matches) {
  const played = matches.filter((m) => m.status === 'played');
  if (!played.length) return 0;
  const wins = played.filter((m) => resultOf(m) === 'win').length;
  return Math.round((wins / played.length) * 100);
}

export function statsBy(matches, key) {
  const groups = {};
  matches.filter((m) => m.status === 'played').forEach((m) => {
    (groups[m[key]] ||= []).push(m);
  });
  return Object.entries(groups).map(([name, list]) => ({
    name,
    played: list.length,
    winRate: winRate(list),
  }));
}

export function filterMatches(matches, { mode = '', result = '' } = {}) {
  return matches.filter(
    (m) => (!mode || m.mode === mode) && (!result || resultOf(m) === result)
  );
}