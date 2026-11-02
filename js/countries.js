// Public API: REST Countries (no key needed), with a fallback list if it is unreachable
const URL = 'https://restcountries.com/v3.1/all?fields=name,flags,cca2';

const FALLBACK = [
  'Kenya', 'Nigeria', 'South Africa', 'Ghana', 'Uganda', 'Tanzania',
  'United States', 'United Kingdom', 'Canada', 'India',
].map((name) => ({ name, flag: '', code: '' }));

export async function getCountries() {
  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error('Could not load countries');
    const data = await res.json();
    return data
      .map((c) => ({ name: c.name.common, flag: c.flags.png, code: c.cca2 }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return FALLBACK;
  }
}