import { isLoggedIn, getUser, logout } from './auth.js';
import { getMatches, createMatch, replaceMatch, updateMatch, deleteMatch } from './api.js';
import { validateMatch } from './validation.js';
import { statsBy, winRate, filterMatches } from './stats.js';
import * as ui from './ui.js';

if (!isLoggedIn()) location.replace('login.html');

const user = getUser();
let matches = [];
let editingId = null;
const el = (id) => document.getElementById(id);

function handleError(err) {
  if (err.status === 401) {
    logout();
    location.replace('login.html');
    return;
  }
  ui.setStatus(err.message || 'Something went wrong. Try again.', true);
}

function render() {
  const filtered = filterMatches(matches, { mode: el('f-mode').value, result: el('f-result').value });
  ui.renderMatches(filtered);
  ui.renderStats(statsBy(matches, 'mode'), statsBy(matches, 'map'), winRate(matches));
}

async function load() {
  ui.setStatus('Loading matches...');
  try {
    matches = await getMatches(user.id);
    ui.setStatus('');
    render();
  } catch (err) {
    handleError(err);
  }
}

el('match-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = ui.readForm();
  const errors = validateMatch(data);
  if (errors.length) return ui.setStatus(errors.join(' '), true);
  if (data.status === 'scheduled') {
    data.scoreFor = 0;
    data.scoreAgainst = 0;
  }
  const body = { ...data, userId: user.id };
  try {
    ui.setStatus('Saving...');
    if (editingId) await replaceMatch(editingId, body);
    else await createMatch(body);
    editingId = null;
    ui.resetForm();
    await load();
    ui.setStatus('Match saved.');
  } catch (err) {
    handleError(err);
  }
});

el('cancel').addEventListener('click', () => {
  editingId = null;
  ui.resetForm();
});
el('f-mode').addEventListener('change', render);
el('f-result').addEventListener('change', render);
el('logout').addEventListener('click', () => {
  logout();
  location.replace('login.html');
});

el('matches').addEventListener('click', async (e) => {
  const { action, id } = e.target.dataset;
  if (!action) return;
  const match = matches.find((m) => String(m.id) === id);
  try {
    if (action === 'edit') {
      editingId = match.id;
      ui.fillForm(match);
    }
    if (action === 'toggle') {
      await updateMatch(id, { status: match.status === 'played' ? 'scheduled' : 'played' });
      await load();
    }
    if (action === 'delete' && confirm('Delete this match?')) {
      await deleteMatch(id);
      await load();
      ui.setStatus('Match deleted.');
    }
  } catch (err) {
    handleError(err);
  }
});

if (user) {
  el('user-info').textContent = `${user.ign} (${user.accountType}${user.country ? ', ' + user.country : ''})`;
  ui.fillModeFilter(['Hardpoint', 'Search & Destroy', 'Control', 'Domination']);
  load();
}