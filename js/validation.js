export function validateMatch(m) {
  const errors = [];
  if (!m.opponent || !m.opponent.trim()) errors.push('Opponent is required.');
  if (!m.map || !m.map.trim()) errors.push('Map is required.');
  if (!m.date) errors.push('Date is required.');
  if (m.status === 'played') {
    for (const key of ['scoreFor', 'scoreAgainst']) {
      if (!Number.isInteger(m[key]) || m[key] < 0) errors.push('Scores must be whole numbers of 0 or more.');
    }
  }
  return [...new Set(errors)];
}

const emailOk = (e) => /^\S+@\S+\.\S+$/.test(e || '');

export function validateLogin({ email, password }) {
  const errors = [];
  if (!emailOk(email)) errors.push('Enter a valid email.');
  if (!password) errors.push('Password is required.');
  return errors;
}

export function validateRegistration(d) {
  const errors = validateLogin(d);
  if (!d.ign || !d.ign.trim()) errors.push('In-game name is required.');
  if (d.password && d.password.length < 6) errors.push('Password must be at least 6 characters.');
  if (!['player', 'team'].includes(d.accountType)) errors.push('Choose player or team.');
  return errors;
}