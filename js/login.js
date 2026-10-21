import { login, register, isLoggedIn } from './auth.js';
import { validateLogin, validateRegistration } from './validation.js';
import { getCountries } from './countries.js';

if (isLoggedIn()) location.replace('index.html');

const el = (id) => document.getElementById(id);
const status = (msg, isError = true) => { el('status').textContent = msg; el('status').classList.toggle('error', isError); };

async function loadCountries() {
  try {
    const countries = await getCountries();
    countries.forEach((c) => el('r-country').append(new Option(c.name, c.name)));
    el('r-country').dataset.flags = JSON.stringify(Object.fromEntries(countries.map((c) => [c.name, c.flag])));
  } catch { status('Countries could not be loaded. You can still register.'); }
}

el('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const creds = { email: el('l-email').value.trim(), password: el('l-password').value };
  const errors = validateLogin(creds);
  if (errors.length) return status(errors.join(' '));
  try { status('Logging in...', false); await login(creds.email, creds.password); location.replace('index.html'); }
  catch (err) { status(err.message); }
});

el('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const country = el('r-country').value;
  const flags = JSON.parse(el('r-country').dataset.flags || '{}');
  const details = {
    email: el('r-email').value.trim(), password: el('r-password').value,
    ign: el('r-ign').value, accountType: el('r-type').value,
    country, flag: flags[country] || '',
  };
  const errors = validateRegistration(details);
  if (errors.length) return status(errors.join(' '));
  try { status('Creating account...', false); await register(details); location.replace('index.html'); }
  catch (err) { status(err.message); }
});

loadCountries();