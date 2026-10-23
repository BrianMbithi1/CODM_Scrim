import { resultOf } from './stats.js';

const $ = (id) => document.getElementById(id);

export function setStatus(message, isError = false) {
  const el = $('status');
  el.textContent = message;
  el.classList.toggle('error', isError);
}

function button(label, action, id, cls = '') {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.dataset.action = action;
  b.dataset.id = id;
  if (cls) b.className = cls;
  return b;
}

export function renderMatches(matches) {
  const list = $('matches');
  list.replaceChildren();
  if (!matches.length) {
    const li = document.createElement('li');
    li.textContent = 'No matches yet. Log your first scrim above.';
    list.append(li);
    return;
  }
  matches.forEach((m) => {
    const li = document.createElement('li');
    li.className = resultOf(m) || '';
    const info = document.createElement('div');
    const score = m.status === 'played' ? `${m.scoreFor}-${m.scoreAgainst}` : 'Scheduled';
    info.textContent = `${m.date} | vs ${m.opponent} | ${m.mode} on ${m.map} | ${score}`;
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.append(
      button(m.status === 'played' ? 'Mark scheduled' : 'Mark played', 'toggle', m.id, 'secondary'),
      button('Edit', 'edit', m.id, 'secondary'),
      button('Delete', 'delete', m.id),
    );
    li.append(info, actions);
    list.append(li);
  });
}

export function renderStats(byMode, byMap, overall) {
  const box = $('stats');
  box.replaceChildren();
  const p = document.createElement('p');
  p.textContent = `Overall win rate: ${overall}%`;
  box.append(p);
  [['Mode', byMode], ['Map', byMap]].forEach(([label, rows]) => {
    const table = document.createElement('table');
    const head = table.createTHead().insertRow();
    [label, 'Played', 'Win rate'].forEach((t) => {
      const th = document.createElement('th');
      th.textContent = t;
      head.append(th);
    });
    rows.forEach((r) => {
      const tr = table.insertRow();
      [r.name, r.played, `${r.winRate}%`].forEach((v) => { tr.insertCell().textContent = v; });
    });
    box.append(table);
  });
}

export function readForm() {
  const f = $('match-form');
  const num = (v) => (v === '' ? NaN : Number(v));
  return {
    opponent: f.opponent.value.trim(),
    mode: f.mode.value,
    map: f.map.value.trim(),
    scoreFor: num(f.scoreFor.value),
    scoreAgainst: num(f.scoreAgainst.value),
    date: f.date.value,
    status: f.status.value,
  };
}

export function fillForm(m) {
  const f = $('match-form');
  ['opponent', 'mode', 'map', 'scoreFor', 'scoreAgainst', 'date', 'status'].forEach((k) => {
    f[k].value = m[k] ?? '';
  });
  $('save').textContent = 'Update match';
  $('cancel').hidden = false;
}

export function resetForm() {
  $('match-form').reset();
  $('save').textContent = 'Save match';
  $('cancel').hidden = true;
}

export function fillModeFilter(modes) {
  const sel = $('f-mode');
  modes.forEach((m) => sel.append(new Option(m, m)));
}