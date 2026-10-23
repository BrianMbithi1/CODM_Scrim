// Public API: REST Countries (no key needed)
const URL = 'https://restcountries.com/v3.1/all?fields=name,flags,cca2';

export async function getCountries() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error('Could not load countries');
  const data = await res.json();
  return data
    .map((c) => ({ name: c.name.common, flag: c.flags.png, code: c.cca2 }))
    .sort((a, b) => a.name.localeCompare(b.name));
}